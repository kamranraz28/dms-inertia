import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { Pencil, ShieldCheck, Trash2 } from "lucide-react";

export default function RoleIndex({ roles, auth }) {
  const { delete: destroy, processing } = useForm();

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this role?")) {
      destroy(route("roles.destroy", id));
    }
  };

  const columns = [
    {
      name: "Role Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Permissions",
      selector: row => row.permissions.map(p => p.name).join(", "),
      sortable: false,
      cell: row => (
        <div>
          {row.permissions.map(p => (
            <span
              key={p.id}
              className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold mr-2 px-2 py-1 rounded"
            >
              {p.name}
            </span>
          ))}
        </div>
      ),
      minWidth: "600px",
    },
    {
      name: "Actions",
      right: true,
      cell: row => (
        <div className="flex items-center gap-2">
          <Link
            href={`/roles/${row.id}/edit`}
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
      minWidth: "200px",
    },
  ];

  return (
    <Master auth={auth} title="Roles">
      <Head title="Roles Management" />

      <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-indigo-600" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Manage Roles</h2>
                <p className="text-gray-500 text-sm">View, create, and manage user roles</p>
              </div>
            </div>

            <Link
              href="/roles/create"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
            >
              + Create Role
            </Link>
          </div>

          {/* Replace table with reusable component */}
          <AppDataTable columns={columns} data={roles} title="Manage Roles" />
        </div>
      </div>
    </Master>
  );
}
