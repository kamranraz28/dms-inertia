import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import { PackageSearch } from "lucide-react";
import { useState } from "react";
import Select from "react-select";

export default function SecondarySalesReport({ secondarySales = [], dealers = [], retailers = [], auth }) {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const isWithinDateRange = (createdAtStr) => {
    if (!fromDate && !toDate) return true;
    const createdDate = createdAtStr.slice(0, 10);
    return (
      (!fromDate || createdDate >= fromDate) &&
      (!toDate || createdDate <= toDate)
    );
  };

  const filteredSales = secondarySales.filter((sale) => {
    const matchDealer =
      !selectedDealer || sale.dealer?.id == selectedDealer.value;
    const matchRetailer =
      !selectedRetailer || sale.retailer?.id == selectedRetailer.value;
    const matchDate =
      !sale.created_at || isWithinDateRange(sale.created_at);
    return matchDealer && matchRetailer && matchDate;
  });

  const dealerOptions = dealers.map((dealer) => ({
    value: dealer.id,
    label: dealer.name,
  }));

  const retailerOptions = retailers.map((retailer) => ({
    value: retailer.id,
    label: retailer.name,
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
      selector: (row) => row.dealer?.name ?? "—",
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Dealer ID",
      selector: (row) => row.dealer?.office_id ?? "—",
      sortable: true,
      minWidth: "140px",
    },
    {
      name: "Retailer Name",
      selector: (row) => row.retailer?.name ?? "—",
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Retailer ID",
      selector: (row) => row.retailer?.office_id ?? "—",
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
    <Master auth={auth} title="Secondary Sales Report">
      <Head title="Secondary Sales Report" />

      <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <PackageSearch className="text-indigo-600" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Secondary Sales Report
                </h2>
                <p className="text-gray-500 text-sm">
                  Filter by dealer and date to view sales records
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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

            {/* Retailer Filter */}

            <div>
              <label
                htmlFor="retailerFilter"
                className="block text-gray-700 mb-2 font-semibold"
              >
                Filter by Retailer:
              </label>
              <Select
                id="retailerFilter"
                options={retailerOptions}
                value={selectedRetailer}
                onChange={setSelectedRetailer}
                isClearable
                placeholder="-- All Retailers --"
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
            title="Secondary Sales Report"
            noDataComponent={
              <div className="text-center py-6 text-gray-500">
                No secondary sales found for selected filters.
              </div>
            }
          />
        </div>
      </div>
    </Master>
  );
}
