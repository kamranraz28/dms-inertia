import Master from "@/Layouts/Master";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

export default function TertiarySales({ auth }) {
    const { data, setData, post, processing, reset } = useForm({
        imei: "",
        customer_name: "",
        customer_phone: "",
        customer_address: "",
        remarks: "",
    });

    const [imeiStatus, setImeiStatus] = useState({ valid: false, message: "" });
    const [checking, setChecking] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);

        if (name === "imei") {
            if (value.length >= 1) {
                checkImei(value);
            } else {
                setImeiStatus({ valid: false, message: "" });
            }
        }
    };

    const checkImei = async (imei) => {
        setChecking(true);
        try {
            const res = await axios.post(route("retailers.checkImei"), { imei });
            setImeiStatus(res.data);
        } catch (err) {
            setImeiStatus({ valid: false, message: "Error validating IMEI" });
        }
        setChecking(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!imeiStatus.valid) return;

        post(route("tertiary.sales.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "✅ Success!",
                    text: "Tertiary sale has been submitted.",
                    icon: "success",
                    confirmButtonColor: "#4f46e5",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                reset();
                setImeiStatus({ valid: false, message: "" });
            },
        });
    };

    return (
        <Master auth={auth} title="Tertiary Sales">
            <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-xl">
                <h2 className="text-xl font-bold mb-4 text-indigo-700">
                    📱 Tertiary Sales Entry
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">IMEI</label>
                        <input
                            type="text"
                            name="imei"
                            value={data.imei}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
                            placeholder="Enter IMEI number"
                            required
                        />
                        <motion.p
                            className={`text-sm mt-1 ${
                                checking
                                    ? "text-gray-500"
                                    : imeiStatus.valid
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {checking ? "Checking..." : imeiStatus.message}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                name="customer_name"
                                value={data.customer_name}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">
                                Customer Phone
                            </label>
                            <input
                                type="text"
                                name="customer_phone"
                                value={data.customer_phone}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Customer Address
                        </label>
                        <textarea
                            name="customer_address"
                            value={data.customer_address}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Remarks
                        </label>
                        <textarea
                            name="remarks"
                            value={data.remarks}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={!imeiStatus.valid || processing}
                            className={`w-full py-2 rounded-md font-semibold text-white transition ${
                                imeiStatus.valid
                                    ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Active Warranty
                        </button>
                    </div>
                </form>
            </div>
        </Master>
    );
}
