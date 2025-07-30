import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link } from "@inertiajs/react";
import { PackageSearch } from "lucide-react";
import { useState } from "react";

// Status Labels and Styles
const STATUS_MAP = {
    0: "Pending",
    1: "Waiting",
    2: "Approved",
    5: "Declined",
};

const STATUS_STYLES = {
    0: "bg-sky-100 text-yellow-800",
    1: "bg-yellow-100 text-green-800",
    2: "bg-green-100 text-red-800",
    5: "bg-red-100 text-red-800",
};

export default function ReturnProducts({ returnProducts = [], auth }) {
    const [filterStatus, setFilterStatus] = useState("");

    // Filter by status only
    const filteredReturnProducts =
        filterStatus === ""
            ? returnProducts
            : returnProducts.filter(
                  (item) => String(item.status) === filterStatus
              );

    const columns = [
        {
            name: "Product Model",
            selector: (row) => row.stock?.product?.model ?? "—",
            sortable: true,
            minWidth: "300px",
        },
        {
            name: "IMEI-1",
            selector: (row) => row.stock?.imei1 ?? "—",
            sortable: true,
            minWidth: "150px",
        },
        {
            name: "IMEI-2",
            selector: (row) => row.stock?.imei2 ?? "—",
            sortable: true,
            minWidth: "150px",
        },
        {
            name: "Remarks",
            selector: (row) => row.remarks ?? "—",
            sortable: true,
            minWidth: "250px",
        },
        {
            name: "Return Request Time",
            selector: (row) => new Date(row.created_at).toLocaleString(),
            sortable: true,
            minWidth: "200px",
        },
        {
            name: "Status",
            selector: (row) => STATUS_MAP[row.status] ?? "Unknown",
            sortable: true,
            minWidth: "140px",
            cell: (row) => (
                <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        STATUS_STYLES[row.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                >
                    {STATUS_MAP[row.status] ?? "Unknown"}
                </span>
            ),
        },
    ];

    return (
        <Master auth={auth} title="Return Products">
            <Head title="Return Products" />

            <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <PackageSearch
                                className="text-indigo-600"
                                size={32}
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Return Products
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    List of return requests submitted by dealers
                                    or retailers
                                </p>
                            </div>
                        </div>

                        <Link
                            href={route("returns.request.create")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
                        >
                            + Create Return Request
                        </Link>
                    </div>

                    {/* Status Filter */}
                    <div className="mb-6">
                        <label
                            htmlFor="statusFilter"
                            className="block text-gray-700 mb-2 font-semibold"
                        >
                            Filter by Status:
                        </label>
                        <select
                            id="statusFilter"
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

                    {/* Table */}
                    <AppDataTable
                        columns={columns}
                        data={filteredReturnProducts}
                        noDataComponent={
                            <div className="text-center py-6 text-gray-500">
                                No return product records found.
                            </div>
                        }
                    />
                </div>
            </div>
        </Master>
    );
}
