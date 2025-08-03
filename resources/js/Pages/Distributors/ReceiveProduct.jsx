import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function ReceiveProduct({ products = [], auth }) {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    Inertia.post(route("distributor.receive.confirm"), {
      selected,
    });
  };

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={selected.length === products.length}
          onChange={toggleSelectAll}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selected.includes(row.id)}
          onChange={() => toggleSelect(row.id)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      ),
      width: "80px",
      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: "IMEI 1",
      selector: (row) => row.stock?.imei1 ?? "—",
      sortable: true,
      minWidth: "140px",
    },
    {
      name: "IMEI 2",
      selector: (row) => row.stock?.imei2 ?? "—",
      sortable: true,
      minWidth: "140px",
    },
    {
      name: "Product Model",
      selector: (row) => row.stock?.product?.model ?? "—",
      sortable: true,
      minWidth: "300px",
    },
    {
      name: "Delivery Time",
      selector: (row) => new Date(row.created_at).toLocaleString(),
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Status",
      selector: () => "Pending",
      cell: () => (
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">
          Pending
        </span>
      ),
      minWidth: "120px",
    },
  ];

  return (
    <Master auth={auth} title="Receive Products">
      <Head title="Pending Receive Products" />

      <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Pending Receive Products</h2>
            <p className="text-gray-500 text-sm mt-1">
              Select products from the list below to confirm receipt.
            </p>
          </div>

          {products.length === 0 ? (
            <p className="text-gray-500">No pending products to receive.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <AppDataTable
                columns={columns}
                data={products}
                noDataComponent={
                  <div className="text-center py-6 text-gray-500">No pending products found.</div>
                }
              />

              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
                >
                  Receive Selected
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Master>
  );
}
