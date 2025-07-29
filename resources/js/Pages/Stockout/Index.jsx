import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link } from "@inertiajs/react";
import { ClipboardList } from "lucide-react";

export default function StockoutIndex({ orders = [], auth }) {
    // Flatten all order details with parent order reference
    const flattenedDetails = orders.flatMap((order) =>
        order.details.map((detail) => ({
            id: detail.id,
            order,
            detail,
            uploadedCount:
                order.imeis?.filter((imei) => imei.stock?.product_id === detail.product_id).length || 0,
        }))
    );

    const columns = [
        {
            name: "Order ID",
            selector: (row) => `#${row.order.id}`,
            sortable: true,
        },
        {
            name: "Product Model",
            selector: (row) => row.detail.product?.model ?? "—",
            sortable: true,
        },
        {
            name: "Customer",
            selector: (row) => row.order.user?.name ?? "—",
            sortable: true,
        },
        {
            name: "Order Quantity",
            selector: (row) => row.detail.quantity,
        },
        {
            name: "Uploaded Quantity",
            selector: (row) => row.uploadedCount,
        },
        {
            name: "Order Remarks",
            selector: (row) => row.order.remarks ?? "—",
        },
        {
            name: "Action",
            selector: (row) =>
                row.order.status === 2 ? (
                    <Link
                        href={route("stockout.upload", row.detail.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow-sm text-sm whitespace-nowrap"
                    >
                        Upload IMEI
                    </Link>
                ) : (
                    <div className="flex gap-2 flex-wrap">
                        <Link
                            href={route("stockout.view", row.detail.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow-sm text-sm whitespace-nowrap"
                        >
                            View IMEI
                        </Link>
                        <Link
                            href={route("stockout.confirmDelivery", row.detail.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow-sm text-sm whitespace-nowrap"
                        >
                            Confirm Delivery
                        </Link>
                    </div>
                ),
            minWidth: "280px",
        },
    ];

    return (
        <Master auth={auth} title="Stockout">
            <Head title="Stockout" />

            <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <ClipboardList className="text-indigo-600" size={32} />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Stockout Details</h2>
                                <p className="text-gray-500 text-sm">List of all order details in the system</p>
                            </div>
                        </div>
                    </div>

                    <AppDataTable
                        columns={columns}
                        data={flattenedDetails}
                        searchPlaceholder="Search Stockout..."
                        exportFilename="Stockout-Orders"
                    />
                </div>
            </div>
        </Master>
    );
}
