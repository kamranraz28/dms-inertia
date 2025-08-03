import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { Pencil, PlusCircle, ShieldCheck, Trash2 } from "lucide-react";

export default function PermissionIndex({ auth, permissions }) {
  const { delete: destroy, processing } = useForm();

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this permission?")) {
      destroy(route("permissions.destroy", id));
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Actions",
      right: true,
      cell: (row) => (
        <div className="flex justify-end items-center gap-2">
          <Link
            href={`/permissions/${row.id}/edit`}
            className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1.5 text-sm rounded-lg font-medium transition"
          >
            <Pencil size={14} /> Edit
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            disabled={processing}
            className="inline-flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 text-sm rounded-lg font-medium transition"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Master auth={auth} title="Permissions">
      <Head title="Permissions" />

      <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-800">Permissions</h1>
          </div>

          <Link
            href="/permissions/create"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <PlusCircle size={18} /> Create Permission
          </Link>
        </div>

        <AppDataTable
          columns={columns}
          data={permissions}
          title="Permission List"
        />
      </div>
    </Master>
  );
}
