import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import { PackageSearch } from "lucide-react";
import { useState } from "react";
import Select from "react-select";

export default function DealerImeiStockReport({ dealerStocks = [], dealers = [], products = [], auth }) {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Prepare options for react-select
  const dealerOptions = dealers.map((dealer) => ({
    value: dealer.id,
    label: dealer.name,
  }));

  const productOptions = products.map((product) => ({
    value: product.model,
    label: product.model,
  }));

  // Filtering the dealerStocks based on filters
  const filteredStocks = dealerStocks.filter((stock) => {
    const matchDealer = !selectedDealer || stock.user?.id == selectedDealer.value;
    const matchModel = !selectedModel || stock.stock?.product?.model === selectedModel.value;

    const createdAt = new Date(stock.created_at).setHours(0, 0, 0, 0);
    const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
    const to = toDate ? new Date(toDate).setHours(0, 0, 0, 0) : null;

    const matchDate = (!from || createdAt >= from) && (!to || createdAt <= to);

    return matchDealer && matchModel && matchDate;
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
      name: "Dealer Name",
      selector: (row) => row.user?.name ?? "—",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Dealer ID",
      selector: (row) => row.user?.office_id ?? "—",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Stock In Date",
      selector: (row) => row.created_at?.split("T")[0] ?? "—",
      sortable: true,
      minWidth: "150px",
    },
  ];

  return (
    <Master auth={auth} title="Dealer IMEI Stock Report">
      <Head title="Dealer IMEI Stock Report" />

      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <PackageSearch className="text-indigo-600" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dealer IMEI Stock Report</h2>
              <p className="text-gray-500 text-sm">IMEI stock available to dealers</p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Filter by Dealer:</label>
              <Select
                options={dealerOptions}
                value={selectedDealer}
                onChange={setSelectedDealer}
                isClearable
                placeholder="Select dealer..."
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Filter by Product Model:</label>
              <Select
                options={productOptions}
                value={selectedModel}
                onChange={setSelectedModel}
                isClearable
                placeholder="Select product model..."
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

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
            data={filteredStocks}
            noDataComponent={
              <div className="text-center py-6 text-gray-500">
                No dealer stock found for selected filter.
              </div>
            }
          />
        </div>
      </div>
    </Master>
  );
}
