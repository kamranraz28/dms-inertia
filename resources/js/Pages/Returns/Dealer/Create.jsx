import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { ClipboardList, PlusCircle, Trash2 } from "lucide-react";
import { useRef } from "react";

function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

export default function CreateReturnProducts({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        imeis: [{ imei: "", message: "", status: "" }],
        remarks: "",
    });

    const debounceRefs = useRef({});

    function addImeiRow() {
        setData("imeis", [
            ...data.imeis,
            { imei: "", message: "", status: "" },
        ]);
    }

    function removeImeiRow(index) {
        const newImeis = data.imeis.filter((_, i) => i !== index);
        setData(
            "imeis",
            newImeis.length ? newImeis : [{ imei: "", message: "", status: "" }]
        );
    }

    async function validateImei(index, imeiValue) {
        const newImeis = [...data.imeis];
        newImeis[index].imei = imeiValue;
        newImeis[index].message = "";
        newImeis[index].status = "";
        setData("imeis", newImeis);

        if (!imeiValue.trim()) return;

        try {
            const response = await axios.post(
                route("returnProducts.checkImei"),
                {
                    imei: imeiValue,
                }
            );

            const { valid, product_model, error } = response.data;

            if (valid) {
                newImeis[index].status = "available";
                newImeis[index].message = `Product Model: ${product_model}`;
            } else {
                newImeis[index].status = "error";
                newImeis[index].message = `❌ ${error}`;
            }

            setData("imeis", newImeis);
        } catch (e) {
            newImeis[index].message = "❌ Server error occurred.";
            newImeis[index].status = "error";
            setData("imeis", newImeis);
        }
    }

    function handleImeiChange(index, value) {
        const newImeis = [...data.imeis];
        newImeis[index].imei = value;
        newImeis[index].message = "";
        newImeis[index].status = "";
        setData("imeis", newImeis);

        if (!debounceRefs.current[index]) {
            debounceRefs.current[index] = debounce(validateImei, 1);
        }

        debounceRefs.current[index](index, value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const hasEmptyImei = data.imeis.some((item) => item.imei.trim() === "");
        const hasInvalidImei = data.imeis.some(
            (item) => item.imei.trim() !== "" && item.status !== "available"
        );

        if (hasEmptyImei || hasInvalidImei) {
            alert("Please ensure all IMEIs are filled and valid.");
            return;
        }

        post(route("returnProducts.store"), {
            onSuccess: () => reset("imeis", "remarks"),
        });
    }

    const isSubmitDisabled =
        processing ||
        data.imeis.some(
            (item) =>
                item.imei.trim() === "" || item.status !== "available"
        );

    return (
        <Master auth={auth} title="Create Return Product">
            <Head title="Create Return Product" />
            <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="text-indigo-600" size={32} />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Create Return Product
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">
                                IMEI Numbers <span className="text-red-600">*</span>
                            </label>
                            {data.imeis.map((item, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            placeholder="Enter IMEI"
                                            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            value={item.imei}
                                            onChange={(e) =>
                                                handleImeiChange(index, e.target.value)
                                            }
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
                                    {item.imei.trim() === "" && (
                                        <p className="text-sm text-red-600 mt-1">
                                            IMEI is required.
                                        </p>
                                    )}
                                    {item.message && (
                                        <p
                                            className={`mt-1 text-sm ${
                                                item.status === "available"
                                                    ? "text-green-600"
                                                    : "text-red-600"
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
                            <label className="block text-gray-700 font-semibold mb-1">
                                Remarks
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows={3}
                                value={data.remarks}
                                onChange={(e) =>
                                    setData("remarks", e.target.value)
                                }
                                placeholder="Enter any remarks (optional)"
                            ></textarea>
                            {errors.remarks && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.remarks}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitDisabled}
                                className={`px-6 py-2 rounded-lg shadow transition duration-150 ${
                                    isSubmitDisabled
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                }`}
                            >
                                Submit Return
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Master>
    );
}
