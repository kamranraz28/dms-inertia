import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import { Boxes } from "lucide-react";
import { useState } from "react";

export default function MyStocks({ stocks = [], auth }) {
  const [filterStatus, setFilterStatus] = useState("");

  // Filter logic: status 2 = In Stock, others = Out of Stock
  const filteredStocks =
    filterStatus === ""
      ? stocks
      : stocks.filter((s) =>
          filterStatus === "in" ? s.stock?.status === 2 : s.stock?.status !== 2
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
      name: "Status",
      selector: (row) => (row.stock?.status === 2 ? "In Stock" : "Out of Stock"),
      sortable: true,
      minWidth: "130px",
      cell: (row) => (
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
            row.stock?.status === 2
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.stock?.status === 2 ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
  ];

  return (
    <Master auth={auth} title="My Stocks">
      <Head title="My Stocks" />

      <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Boxes className="text-indigo-600" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">My Stocks</h2>
              <p className="text-gray-500 text-sm">IMEI inventory assigned to you</p>
            </div>
          </div>

          {/* Filter */}
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
              <option value="">-- All Stocks --</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          {/* Table */}
          <AppDataTable
            columns={columns}
            data={filteredStocks}
            noDataComponent={
              <div className="text-center py-6 text-gray-500">No stocks found.</div>
            }
          />
        </div>
      </div>
    </Master>
  );
}
