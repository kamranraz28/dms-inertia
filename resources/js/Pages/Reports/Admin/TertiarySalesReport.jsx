import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import { PackageSearch } from "lucide-react";
import { useState } from "react";

export default function TertiarySalesReport({ tertiarySales = [], auth }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredSales = tertiarySales.filter((sale) => {
    const createdAt = new Date(sale.created_at).setHours(0, 0, 0, 0);
    const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
    const to = toDate ? new Date(toDate).setHours(0, 0, 0, 0) : null;

    const matchDate =
      (!from || createdAt >= from) &&
      (!to || createdAt <= to);

    return matchDate;
  });

  const columns = [
    {
      name: "Product Model",
      selector: (row) => row.stock?.product?.model ?? "—",
      sortable: true,
      minWidth: "250px",
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
      name: "Customer Name",
      selector: (row) => row.name ?? "—",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Customer Phone",
      selector: (row) => row.phone ?? "—",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Selling Date",
      selector: (row) => row.created_at?.split("T")[0] ?? "—",
      sortable: true,
      minWidth: "150px",
    },
  ];

  return (
    <Master auth={auth} title="Tertiary Sales Report">
      <Head title="Tertiary Sales Report" />

      <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <PackageSearch className="text-indigo-600" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Tertiary Sales Report</h2>
              <p className="text-gray-500 text-sm">Final sales to customers with IMEI trace</p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">From Date:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">To Date:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* Table */}
          <AppDataTable
            columns={columns}
            data={filteredSales}
            noDataComponent={
              <div className="text-center py-6 text-gray-500">
                No tertiary sales found for selected filters.
              </div>
            }
          />
        </div>
      </div>
    </Master>
  );
}
