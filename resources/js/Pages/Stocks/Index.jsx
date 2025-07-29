import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link } from "@inertiajs/react";
import { PackageSearch } from "lucide-react";
import { useState } from "react";

const STATUS_MAP = {
  0: "In Stock",
  1: "Primary Sold",
  2: "Secondary Sold",
  3: "Tertiary Sold",
};

const STATUS_STYLES = {
  0: "bg-blue-100 text-blue-700",
  1: "bg-green-100 text-green-700",
  2: "bg-yellow-100 text-yellow-700",
  3: "bg-red-100 text-red-700",
};

export default function StocksIndex({ stocks = [], auth }) {
  const [filterStatus, setFilterStatus] = useState("");

  const filteredStocks =
    filterStatus === ""
      ? stocks
      : stocks.filter((stock) => String(stock.status) === filterStatus);

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product?.model ?? "—",
      sortable: true,
      minWidth: "300px",
    },
    {
      name: "IMEI-1",
      selector: (row) => row.imei1 ?? "—",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "IMEI-2",
      selector: (row) => row.imei2 ?? "—",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Warranty",
      selector: (row) => row.warranty ?? "—",
      sortable: true,
      minWidth: "120px",
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
    <Master auth={auth} title="Stocks">
      <Head title="Stocks" />

      <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <PackageSearch className="text-indigo-600" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Stocks</h2>
                <p className="text-gray-500 text-sm">
                  Inventory list of all stock products
                </p>
              </div>
            </div>

            <Link
              href={route("stocks.create")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
            >
              + Create Stock
            </Link>
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
            data={filteredStocks}
            noDataComponent={
              <div className="text-center py-6 text-gray-500">
                No stock records found.
              </div>
            }
          />
        </div>
      </div>
    </Master>
  );
}
