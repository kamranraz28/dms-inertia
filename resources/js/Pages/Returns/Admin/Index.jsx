import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, router } from "@inertiajs/react";
import { PackageSearch } from "lucide-react";
import { useState } from "react";

// Status map and styles
const STATUS_MAP = {
    0: "Pending",
    1: "Waiting",
    2: "Approved",
    5: "Declined",
};

const STATUS_STYLES = {
    0: "bg-sky-100 text-yellow-800",
    1: "bg-yellow-100 text-green-800",
    2: "bg-green-100 text-green-800",
    5: "bg-red-100 text-red-800",
};

export default function ReturnProducts({ returnProducts = [], auth }) {
    const [filterStatus, setFilterStatus] = useState("");
    const [returnType, setReturnType] = useState("all");
    const [processing, setProcessing] = useState(false);

    // Filter logic
    const typeFiltered = returnProducts.filter((row) => {
        if (returnType === "primary") return row.type === 1;
        if (returnType === "secondary") return row.type === 2;
        return true;
    });

    const filteredReturnProducts =
        filterStatus === ""
            ? typeFiltered
            : typeFiltered.filter(
                  (item) => String(item.status) === filterStatus
              );

    // Approve/Decline logic
    const handleAction = (id, actionType) => {
        setProcessing(true);
        router.post(
            `/returns/${id}/${actionType}`,
            {},
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    // Table columns
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
            minWidth: "100px",
        },
        {
            name: "IMEI-2",
            selector: (row) => row.stock?.imei2 ?? "—",
            sortable: true,
            minWidth: "100px",
        },
        {
            name: "Dealer Name",
            selector: (row) => row.dealer?.name ?? "—",
            sortable: true,
            minWidth: "100px",
        },
    ];

    if (returnType !== "primary") {
        columns.push({
            name: "Retailer Name",
            selector: (row) => row.retailer?.name ?? "—",
            sortable: true,
            minWidth: "100px",
        });
    }

    columns.push(
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
        {
            name: "Actions",
            right: true,
            cell: (row) => (
                <div className="flex justify-end items-center gap-2">
                    <button
                        onClick={() => handleAction(row.id, "approve")}
                        disabled={processing}
                        className="inline-flex items-center gap-1 bg-green-500 text-white hover:bg-green-700 px-3 py-1.5 text-sm rounded-lg font-medium transition"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleAction(row.id, "decline")}
                        disabled={processing}
                        className="inline-flex items-center gap-1 bg-red-500 text-white hover:bg-red-700 px-3 py-1.5 text-sm rounded-lg font-medium transition"
                    >
                        Decline
                    </button>
                </div>
            ),
            minWidth: "200px"
        }
    );

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
                    </div>

                    {/* Type Toggle */}
                    <div className="mb-6 flex gap-4">
                        <button
                            onClick={() => setReturnType("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                                returnType === "all"
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            All Returns
                        </button>
                        <button
                            onClick={() => setReturnType("primary")}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                                returnType === "primary"
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            Primary Sales Return
                        </button>
                        <button
                            onClick={() => setReturnType("secondary")}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                                returnType === "secondary"
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            Secondary Sales Return
                        </button>
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

                    {/* Data Table */}
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
