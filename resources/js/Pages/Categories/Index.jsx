import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";

export default function CategoriesIndex({ categories, auth }) {
  const { delete: destroy, processing } = useForm();

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      destroy(route("categories.destroy", id));
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Actions",
      right: true,
      minWidth: "140px",
      cell: (row) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Link
            href={route("categories.edit", row.id)}
            className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1.5 text-sm rounded-lg font-medium transition flex-shrink-0"
          >
            <Pencil size={14} /> Edit
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            disabled={processing}
            className="inline-flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 text-sm rounded-lg font-medium transition flex-shrink-0"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Master auth={auth} title="Categories">
      <Head title="Categories Management" />

      <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Categories</h2>

            <Link
              href={route("categories.create")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
            >
              + Create Category
            </Link>
          </div>

          <AppDataTable columns={columns} data={categories} title="Manage Categories" />
        </div>
      </div>
    </Master>
  );
}
