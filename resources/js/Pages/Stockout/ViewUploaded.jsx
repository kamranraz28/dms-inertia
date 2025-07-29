import Master from "@/Layouts/Master";
import { Head, Link } from "@inertiajs/react";

export default function ViewUploaded({ detail, imeis, auth }) {
    return (
        <Master auth={auth} title={`Uploaded IMEIs for Order #${detail.order_id}`}>
            <Head title={`Uploaded IMEIs - Order #${detail.order_id}`} />

            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    {/* Header info */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-2">
                            Uploaded IMEIs for Order #{detail.order_id}
                        </h1>
                        <p className="text-gray-700">
                            <strong>Product Model:</strong> {detail.product?.model ?? "—"}
                        </p>
                        <p className="text-gray-700">
                            <strong>Order Date:</strong> {new Date(detail.order.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">
                            <strong>Customer:</strong> {detail.order.user?.name ?? "—"}
                        </p>
                    </div>

                    {/* IMEI Table */}
                    {imeis.length === 0 ? (
                        <p className="text-gray-500 text-center py-6">No IMEIs uploaded yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-3 text-left">#</th>
                                        <th className="px-6 py-3 text-left">IMEI 1</th>
                                        <th className="px-6 py-3 text-left">IMEI 2</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 text-sm">
                                    {imeis.map((imei, index) => (
                                        <tr
                                            key={imei.id}
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                        >
                                            <td className="px-6 py-4 font-medium">{index + 1}</td>
                                            <td className="px-6 py-4">{imei.stock?.imei1 ?? "—"}</td>
                                            <td className="px-6 py-4">{imei.stock?.imei2 ?? "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Back link */}
                    <div className="mt-6">
                        <Link
                            href={route("stockout.index")}
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            ← Back to Stockout List
                        </Link>
                    </div>
                </div>
            </div>
        </Master>
    );
}
