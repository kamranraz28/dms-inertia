import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import { PackageSearch } from "lucide-react";
import { useState } from "react";
import Select from "react-select";

export default function PrimarySalesReport({ primarySales = [], dealers = [], auth }) {
  const [selectedDealer, setSelectedDealer] = useState(null); // will hold an object from react-select
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Normalize created_at date for comparison
  const isWithinDateRange = (createdAtStr) => {
    if (!fromDate && !toDate) return true;

    const createdDate = createdAtStr.slice(0, 10); // Extract 'YYYY-MM-DD'

    return (
      (!fromDate || createdDate >= fromDate) &&
      (!toDate || createdDate <= toDate)
    );
  };

  // Filter data based on selected dealer and date range
  const filteredSales = primarySales.filter((sale) => {
    const matchDealer =
      !selectedDealer || sale.user?.id == selectedDealer.value;

    const matchDate =
      !sale.created_at || isWithinDateRange(sale.created_at);

    return matchDealer && matchDate;
  });

  // Prepare options for react-select
  const dealerOptions = dealers.map((dealer) => ({
    value: dealer.id,
    label: dealer.name,
  }));

  const columns = [
    {
      name: "Product Model",
      selector: (row) => row.stock?.product?.model ?? "—",
      sortable: true,
      minWidth: "200px",
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
      name: "Dealer Name",
      selector: (row) => row.user?.name ?? "—",
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Dealer ID",
      selector: (row) => row.user?.office_id ?? "—",
      sortable: true,
      minWidth: "140px",
    },
    {
      name: "Selling Date",
      selector: (row) =>
        row.created_at
          ? new Date(row.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
      sortable: true,
      minWidth: "160px",
    },
  ];

  return (
    <Master auth={auth} title="Primary Sales Report">
      <Head title="Primary Sales Report" />

      <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <PackageSearch className="text-indigo-600" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Primary Sales Report
                </h2>
                <p className="text-gray-500 text-sm">
                  Filter by dealer and date to view sales records
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Dealer Filter */}
            <div>
              <label
                htmlFor="dealerFilter"
                className="block text-gray-700 mb-2 font-semibold"
              >
                Filter by Dealer:
              </label>
              <Select
                id="dealerFilter"
                options={dealerOptions}
                value={selectedDealer}
                onChange={setSelectedDealer}
                isClearable
                placeholder="-- All Dealers --"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* From Date */}
            <div>
              <label
                htmlFor="fromDate"
                className="block text-gray-700 mb-2 font-semibold"
              >
                From Date:
              </label>
              <input
                type="date"
                id="fromDate"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            {/* To Date */}
            <div>
              <label
                htmlFor="toDate"
                className="block text-gray-700 mb-2 font-semibold"
              >
                To Date:
              </label>
              <input
                type="date"
                id="toDate"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <AppDataTable
            columns={columns}
            data={filteredSales}
            title="Primary Sales Report"
            noDataComponent={
              <div className="text-center py-6 text-gray-500">
                No primary sales found for selected filters.
              </div>
            }
          />
        </div>
      </div>
    </Master>
  );
}
