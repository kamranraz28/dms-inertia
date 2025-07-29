import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { ClipboardList, PlusCircle, Trash2 } from "lucide-react";
import Select from "react-select";

export default function CreateSale({ retailers = [], auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        retailer_id: null,
        imeis: [{ imei: "", message: "", status: "" }],
    });

    // Prepare dropdown options for retailers
    const retailerOptions = retailers.map(r => ({
        value: r.id,
        label: r.name,
    }));

    // Add new empty IMEI row
    function addImeiRow() {
        setData("imeis", [...data.imeis, { imei: "", message: "", status: "" }]);
    }

    // Remove IMEI row by index
    function removeImeiRow(index) {
        const newImeis = data.imeis.filter((_, i) => i !== index);
        setData("imeis", newImeis.length ? newImeis : [{ imei: "", message: "", status: "" }]);
    }

    // Validate IMEI realtime by calling backend API
    async function validateImei(index, imeiValue) {
        // Update imei value in form data immediately
        const newImeis = [...data.imeis];
        newImeis[index].imei = imeiValue;
        newImeis[index].message = "";
        newImeis[index].status = "";
        setData("imeis", newImeis);

        if (imeiValue.length === 0) {
            // Clear message if input empty
            return;
        }

        try {
            const response = await axios.post(route("check-imei"), {
                imei: imeiValue,
                retailer_id: data.retailer_id,
            });

            // Response: { status: "available"|"not_found"|"not_available"|"not_in_your_stock", message: "...", product_model: "..." }
            const { status, message, product_model } = response.data;

            newImeis[index].status = status;
            if (status === "available") {
                newImeis[index].message = `${message} (Product Model: ${product_model})`;
            } else {
                newImeis[index].message = message;
            }
            setData("imeis", newImeis);
        } catch (error) {
            // Handle error gracefully
            newImeis[index].message = "Error checking IMEI.";
            newImeis[index].status = "error";
            setData("imeis", newImeis);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("distributors.sale.store"), {
            onSuccess: () => reset("imeis"),
        });
    }

    return (
        <Master auth={auth} title="Create Sale">
            <Head title="Create Sale" />

            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="text-indigo-600" size={32} />
                        <h2 className="text-2xl font-bold text-gray-800">Create Sale</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="retailer" className="block text-gray-700 font-semibold mb-1">
                                Select Retailer
                            </label>
                            <Select
                                id="retailer"
                                options={retailerOptions}
                                onChange={selected => setData("retailer_id", selected ? selected.value : null)}
                                placeholder="Choose a retailer..."
                                isClearable
                            />
                            {errors.retailer_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.retailer_id}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">IMEI Numbers</label>
                            {data.imeis.map((item, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            placeholder="Enter IMEI"
                                            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            value={item.imei}
                                            onChange={e => validateImei(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImeiRow(index)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Remove IMEI"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    {item.message && (
                                        <p
                                            className={`mt-1 text-sm ${
                                                item.status === "available"
                                                    ? "text-green-600"
                                                    : item.status === "not_found" ||
                                                      item.status === "not_available" ||
                                                      item.status === "not_in_your_stock"
                                                    ? "text-red-600"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {item.message}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addImeiRow}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                <PlusCircle size={18} />
                                Add IMEI
                            </button>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition duration-150"
                            >
                                Submit Sale
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Master>
    );
}
