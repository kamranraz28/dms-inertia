import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useState } from "react";

export default function StockoutUpload({ detail, auth }) {
    // Guard: If detail is missing, show loading (avoid crash)
    if (!detail) {
        return <div>Loading...</div>;
    }

    // Initialize form state with empty IMEI fields
    const { data, setData, post, processing, errors } = useForm({
        imeis: Array(detail.quantity).fill(""),
    });

    const [imeiStatusMessages, setImeiStatusMessages] = useState(
        Array(detail.quantity).fill(null)
    );

    // Debounced function to check IMEI status from server
    const checkImeiDebounced = debounce(async (imei, index) => {
        if (!imei) {
            setImeiStatusMessages(msgs => {
                const newMsgs = [...msgs];
                newMsgs[index] = null;
                return newMsgs;
            });
            return;
        }

        try {
            const response = await fetch(route("stock.check-imei") + `?imei=${encodeURIComponent(imei)}`);
            const result = await response.json();

            setImeiStatusMessages(msgs => {
                const newMsgs = [...msgs];
                if (result.status === "available") {
                    newMsgs[index] = (
                        <span className="text-green-600">{result.message}</span>
                    );
                } else if (result.status === "sold") {
                    newMsgs[index] = (
                        <span className="text-red-600">{result.message}</span>
                    );
                } else {
                    newMsgs[index] = (
                        <span className="text-orange-600">{result.message}</span>
                    );
                }
                return newMsgs;
            });
        } catch (error) {
            setImeiStatusMessages(msgs => {
                const newMsgs = [...msgs];
                newMsgs[index] = <span className="text-red-600">Error checking IMEI</span>;
                return newMsgs;
            });
        }
    }, 500); // 500ms debounce

    // Update input and trigger IMEI check
    function handleInputChange(index, value) {
        const newImeis = [...data.imeis];
        newImeis[index] = value;
        setData("imeis", newImeis);

        checkImeiDebounced(value, index);
    }

    // Submit form data
    function submit(e) {
        e.preventDefault();
        post(route("stockout.upload.store", detail.id));
    }

    return (
        <Master auth={auth} title="Upload IMEIs">
            <Head title="Upload IMEIs" />

            <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">

                    <h1 className="text-2xl font-bold mb-4">Upload IMEIs</h1>

                    <div className="mb-6">
                        <p><strong>Order Number:</strong> #{detail.order.id}</p>
                        <p><strong>Product:</strong> {detail.product?.model ?? "—"}</p>
                        <p><strong>Quantity:</strong> {detail.quantity}</p>
                    </div>

                    <form onSubmit={submit}>
                        {data.imeis.map((imei, index) => (
                            <div key={index} className="mb-6">
                                <label className="block font-semibold mb-1">
                                    Serial Number {index + 1}
                                </label>
                                <input
                                    type="text"
                                    value={imei}
                                    onChange={e => handleInputChange(index, e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter IMEI"
                                    required
                                />
                                <div className="mt-1">
                                    {imeiStatusMessages[index]}
                                </div>
                                {errors[`imeis.${index}`] && (
                                    <div className="text-red-600 text-sm mt-1">
                                        {errors[`imeis.${index}`]}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
                        >
                            Submit IMEIs
                        </button>
                    </form>
                </div>
            </div>
        </Master>
    );
}
