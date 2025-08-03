import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { ShieldCheck, XCircle } from "lucide-react";
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

            <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex justify-center px-4 pt-12 pb-20 min-h-[80vh]">
                <div className="bg-white/80 backdrop-blur-md shadow-2xl border border-gray-200 p-10 rounded-3xl w-full max-w-3xl transition-all duration-300">
                    <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700 tracking-tight">
                        Check Product by IMEI
                    </h2>

                    <form onSubmit={handleVerify} className="space-y-6">
                        <input
                            type="text"
                            value={imei}
                            onChange={(e) => setImei(e.target.value)}
                            placeholder="Enter IMEI number"
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg placeholder-gray-400"
                            required
                        />
                        <button
                            type="submit"
                            className={`w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold shadow hover:bg-indigo-700 transition duration-200 ${
                                loading ? "cursor-not-allowed opacity-70" : ""
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify IMEI"}
                        </button>
                    </form>

                    {result && (
                        <div className="mt-10 transition-all duration-300">
                            {result.verified ? (
                                <div className="bg-green-50 border border-green-400 text-green-900 p-6 rounded-xl space-y-3 shadow-inner animate-fade-in">
                                    <div className="flex items-center gap-2 text-xl font-bold">
                                        <ShieldCheck size={22} className="text-green-600" />
                                        Product Verified
                                    </div>
                                    <hr className="border-green-300" />
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-[16px]">
                                        <li><strong>Product:</strong> {result.product.name}</li>
                                        <li><strong>Model:</strong> {result.product.model}</li>
                                        <li><strong>Color:</strong> {result.product.color}</li>
                                        <li><strong>Price:</strong> ৳ {result.product.dp}</li>
                                        <li><strong>Brand:</strong> {result.product.brand}</li>
                                        <li><strong>Category:</strong> {result.product.category}</li>
                                        <li><strong>Stocked At:</strong> {result.product.stocked_at}</li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="bg-red-50 border border-red-400 text-red-800 p-6 rounded-xl text-lg flex items-center gap-3 shadow-inner animate-fade-in">
                                    <XCircle size={22} className="text-red-600" />
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
