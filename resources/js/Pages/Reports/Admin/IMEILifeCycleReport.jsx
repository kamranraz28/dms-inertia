import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { PackageSearch } from "lucide-react";
import { useState } from "react";

export default function ImeiLifeCycleReport({ auth }) {
    const [imei, setImei] = useState("");
    const [records, setRecords] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);

        try {
            const res = await axios.post(route("reports.imeiLifeCycleReportSearch"), { imei });
            setRecords(res.data.records || []);
            setProduct(res.data.product || null);
        } catch (error) {
            console.error("IMEI Life Cycle fetch error:", error);
            setRecords([]);
            setProduct(null);
        }

        setLoading(false);
    };

    const columns = [
        {
            name: "Stage",
            selector: (row) => row.stage,
            sortable: true,
            minWidth: "200px",
        },
        {
            name: "User Info",
            selector: (row) => row.user ?? "—",
            sortable: true,
        },
        {
            name: "User ID/ Phone",
            selector: (row) => row.location ?? "—",
            sortable: true,
            minWidth: "200px",
        },
        {
            name: "Date & Time",
            selector: (row) => row.date ?? "—",
            sortable: true,
            minWidth: "200px",
        },
        {
            name: "Remarks",
            selector: (row) => row.remarks ?? "—",
            sortable: true,
            minWidth: "200px",
        },
    ];

    return (
        <Master auth={auth} title="IMEI Life Cycle Report">
            <Head title="IMEI Life Cycle Report" />

            <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <PackageSearch className="text-indigo-600" size={32} />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">IMEI Life Cycle Report</h2>
                            <p className="text-gray-500 text-sm">Track all movement history of a product by IMEI</p>
                        </div>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="flex gap-4 mb-6">
                        <input
                            type="text"
                            value={imei}
                            onChange={(e) => setImei(e.target.value)}
                            placeholder="Enter IMEI..."
                            className="border border-gray-300 rounded px-4 py-2 w-full text-lg"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition text-lg"
                            disabled={loading}
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </form>

                    {/* Product Info */}
                    {product && (
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Product Summary</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-800 text-sm">
                                <div><strong>Model:</strong> {product.product_model}</div>
                                <div><strong>Brand:</strong> {product.brand}</div>
                                <div><strong>Category:</strong> {product.category}</div>
                                <div><strong>IMEI-1:</strong> {product.imei1}</div>
                                <div><strong>IMEI-2:</strong> {product.imei2}</div>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    {searched && (
                        <div className="mt-6">
                            <AppDataTable
                                columns={columns}
                                data={records}
                                noDataComponent={
                                    <div className="text-center py-6 text-gray-500">
                                        No life cycle records found for this IMEI.
                                    </div>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </Master>
    );
}
