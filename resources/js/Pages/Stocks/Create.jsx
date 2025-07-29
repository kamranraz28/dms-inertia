import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateStock({ products = [], auth }) {
    const [rows, setRows] = useState([{ imei1: "", imei2: "", warranty: "" }]);
    const { data, setData, post, processing, errors } = useForm({
        product_id: "",
        stocks: rows,
    });

    const addRow = () => {
        const updatedRows = [...data.stocks, { imei1: "", imei2: "", warranty: "" }];
        setData("stocks", updatedRows);
    };

    const removeRow = (index) => {
        const updatedRows = data.stocks.filter((_, i) => i !== index);
        setData("stocks", updatedRows);
    };

    const handleChange = (index, field, value) => {
        const updatedRows = data.stocks.map((row, i) =>
            i === index ? { ...row, [field]: value } : row
        );
        setData("stocks", updatedRows);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("stocks.store"));
    };

    return (
        <Master auth={auth} title="Create Stock">
            <Head title="Create Stock" />

            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Stock</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Product Model</label>
                            <select
                                value={data.product_id}
                                onChange={(e) => setData("product_id", e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">-- Select Model --</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.model}
                                    </option>
                                ))}
                            </select>
                            {errors.product_id && (
                                <div className="text-sm text-red-600 mt-1">{errors.product_id}</div>
                            )}
                        </div>

                        <div className="space-y-4">
                            {data.stocks.map((row, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border-b pb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">IMEI-1</label>
                                        <input
                                            type="text"
                                            value={row.imei1}
                                            onChange={(e) => handleChange(index, "imei1", e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">IMEI-2</label>
                                        <input
                                            type="text"
                                            value={row.imei2}
                                            onChange={(e) => handleChange(index, "imei2", e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Period</label>
                                        <input
                                            type="text"
                                            value={row.warranty}
                                            onChange={(e) => handleChange(index, "warranty", e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="e.g. 365 days"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeRow(index)}
                                                className="text-sm text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={addRow}
                                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded shadow-sm transition"
                            >
                                + Add More
                            </button>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
                            >
                                {processing ? "Saving..." : "Save Stocks"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Master>
    );
}
