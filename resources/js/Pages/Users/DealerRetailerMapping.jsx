import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";

export default function DealerRetailerMapping({ retailers = [], auth }) {
  const [selectedDealer, setSelectedDealer] = useState(null);

  // Unique dealer options for dropdown
  const dealerOptions = [
    ...new Map(
      retailers
        .filter((item) => item.dealer)
        .map((item) => [item.dealer.id, { value: item.dealer.id, label: item.dealer.name }])
    ).values(),
  ];

  // Filter retailers by selected dealer
  const filtered = selectedDealer
    ? retailers.filter((item) => item.dealer?.id === selectedDealer.value)
    : retailers;

  // Define columns for AppDataTable
  const columns = [
    {
      name: "Distributor Name",
      selector: (row) => row.dealer?.name || "—",
      sortable: true,
      cell: (row) => <span>{row.dealer?.name || "—"}</span>,
    },
    {
      name: "Retailer Name",
      selector: (row) => row.retailer?.name || "—",
      sortable: true,
      cell: (row) => <span>{row.retailer?.name || "—"}</span>,
    },
    {
      name: "Mapped At",
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => <span>{row.created_at}</span>,
    },
  ];

  return (
    <Master auth={auth} title="Dealer-Retailer Mapping">
      <Head title="Dealer-Retailer Mapping" />

      <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dealer-Retailer Mapping</h1>
              <p className="text-sm text-gray-500">List of all distributor-retailer mappings</p>
            </div>
            <Link
              href={route("dealer-retailer.create")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded shadow text-sm"
            >
              + Create Mapping
            </Link>
          </div>

          {/* Dealer Dropdown Filter */}
          <div className="mb-6 w-full sm:w-80">
            <label
              htmlFor="dealerFilter"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Filter by Distributor
            </label>
            <Select
              id="dealerFilter"
              options={dealerOptions}
              value={selectedDealer}
              onChange={setSelectedDealer}
              isClearable
              placeholder="Select distributor..."
            />
          </div>

          {/* Data Table */}
          {filtered.length === 0 ? (
            <p className="text-gray-500">No mappings found.</p>
          ) : (
            <AppDataTable columns={columns} data={filtered} title="Mappings" />
          )}
        </div>
      </div>
    </Master>
  );
}
