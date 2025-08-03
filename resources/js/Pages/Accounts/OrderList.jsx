import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import { ClipboardList } from "lucide-react";
import { useState } from "react";

const STATUS_MAP = {
    1: "Waiting",
    2: "In Progress",
    3: "Processing",
    4: "Waiting to Delivery",
    5: "Completed",
    7: "Canceled",
};

export default function OrdersIndex({ orders = [], auth }) {
    const { post, processing } = useForm();
    const [filterStatus, setFilterStatus] = useState("");

    const handleApprove = (id) => post(route("orders.approve", id));
    const handleDecline = (id) => post(route("orders.decline", id));

    const filteredOrders =
        filterStatus === ""
            ? orders
            : orders.filter((order) => String(order.status) === filterStatus);

    const columns = [
        {
            name: "ID",
            selector: (row) => `#${row.id}`,
            sortable: true,
        },
        {
            name: "Customer",
            selector: (row) => row.user?.name ?? "—",
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => (
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-indigo-100 text-indigo-700">
                    {STATUS_MAP[row.status] ?? "Pending"}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Order Date",
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            name: "View Details",
            selector: (row) => (
                <a
                    href={route("orders.show", row.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    View Details
                </a>
            ),
        },
        {
            name: "Action",
            selector: (row) =>
                row.status === 1 && (
                    <div className="flex flex-nowrap gap-2">
                        <button
                            disabled={processing}
                            onClick={() => handleApprove(row.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm shadow-sm whitespace-nowrap"
                        >
                            Approve
                        </button>
                        <button
                            disabled={processing}
                            onClick={() => handleDecline(row.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm shadow-sm whitespace-nowrap"
                        >
                            Decline
                        </button>
                    </div>
                ),
            minWidth: "200px",
        },
    ];

    return (
        <Master auth={auth} title="Orders">
            <Head title="Orders" />

            <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <ClipboardList className="text-indigo-600" size={32} />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    All Orders
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    List of all orders in the system
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Filter dropdown */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-semibold">
                            Filter by Status:
                        </label>
                        <select
                            className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">-- All Statuses --</option>
                            {Object.entries(STATUS_MAP).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* AppDataTable with filtered data */}
                    <AppDataTable
                        columns={columns}
                        data={filteredOrders}
                        searchPlaceholder="Search orders..."
                        exportFilename="Orders"
                    />
                </div>
            </div>
        </Master>
    );
}
