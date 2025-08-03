import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { ClipboardList } from "lucide-react";
import { useState } from "react";

const STATUS_MAP = {
  0: "Pending",
  1: "Waiting",
  2: "In Progress",
  3: "Processing",
  4: "Waiting to Delivery",
  5: "Completed",
  7: "Canceled",
};

export default function OrdersIndex({ orders = [], auth }) {
  const { post, processing } = useForm();
  const [filterStatus, setFilterStatus] = useState("");

  function handleConfirm(id) {
    post(route("orders.confirm", id));
  }

  function handleDecline(id) {
    post(route("orders.decline", id));
  }

  // Filtered orders by status
  const filteredOrders =
    filterStatus === ""
      ? orders
      : orders.filter((order) => String(order.status) === filterStatus);

  const columns = [
    {
      name: "ID",
      selector: (row) => `#${row.id}`,
      sortable: true,
      minWidth: "80px",
      cell: (row) => <span className="font-medium">#{row.id}</span>,
    },
    {
      name: "Customer",
      selector: (row) => row.user?.name ?? "—",
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "Status",
      selector: (row) => STATUS_MAP[row.status] ?? "Pending",
      sortable: true,
      minWidth: "150px",
      cell: (row) => (
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-indigo-100 text-indigo-700">
          {STATUS_MAP[row.status] ?? "Pending"}
        </span>
      ),
    },
    {
      name: "Order Date",
      selector: (row) => row.created_at,
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "View Details",
      cell: (row) => (
        <Link
          href={route("orders.show", row.id)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          View Details
        </Link>
      ),
      minWidth: "140px",
      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: "Action",
      cell: (row) =>
        row.status === 0 ? (
          <button
            disabled={processing}
            onClick={() => handleConfirm(row.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow-sm text-sm transition"
          >
            Confirm Order
          </button>
        ) : (
          <span className="text-gray-400 italic">No actions</span>
        ),
      minWidth: "140px",
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <Master auth={auth} title="Orders">
      <Head title="Orders" />

      <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-indigo-600" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Orders</h2>
                <p className="text-gray-500 text-sm">
                  List of all orders in the system
                </p>
              </div>
            </div>

            <Link
              href={route("orders.create")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
            >
              + Create Order
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
            data={filteredOrders}
            noDataComponent={
              <div className="text-center py-6 text-gray-500">No orders found.</div>
            }
          />
        </div>
      </div>
    </Master>
  );
}
