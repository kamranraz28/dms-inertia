import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Verify({ auth }) {
    const [imei, setImei] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setResult(null);
        setLoading(true);

        try {
            const res = await axios.post(route("products.verify.check"), { imei });
            setResult(res.data);
        } catch (err) {
            setResult({ verified: false });
        }

        setLoading(false);
    };

    return (
        <Master auth={auth} title="Verify IMEI">
            <Head title="Verify IMEI" />

            <div className="bg-gray-100 flex justify-center px-4 pt-10 pb-16 min-h-[70vh]">
                <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full border border-gray-200">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Verify IMEI</h2>
                    <form onSubmit={handleVerify} className="space-y-6">
                        <input
                            type="text"
                            value={imei}
                            onChange={(e) => setImei(e.target.value)}
                            placeholder="Enter IMEI..."
                            className="w-full px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition text-lg font-semibold"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </button>
                    </form>

                    {result && (
                        <div className="mt-8">
                            {result.verified ? (
                                <div className="bg-green-100 border border-green-400 text-green-800 p-5 rounded space-y-2 text-lg">
                                    <p><strong>Product:</strong> {result.product.name}</p>
                                    <p><strong>Model:</strong> {result.product.model}</p>
                                    <p><strong>Color:</strong> {result.product.color}</p>
                                    <p><strong>Price:</strong> {result.product.dp}</p>
                                    <p><strong>Brand:</strong> {result.product.brand}</p>
                                    <p><strong>Category:</strong> {result.product.category}</p>
                                    <p><strong>Stocked at:</strong> {result.product.stocked_at}</p>
                                </div>
                            ) : (
                                <div className="bg-red-100 border border-red-400 text-red-700 p-5 rounded text-lg">
                                    Product not verified. Invalid IMEI.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Master>
    );
}
