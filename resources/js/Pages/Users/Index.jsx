import AppDataTable from "@/Components/Table/AppDataTable";
import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { Pencil, Trash2, User } from "lucide-react";

export default function UsersIndex({ users, auth }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            destroy(route("users.destroy", id));
        }
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phone || "N/A",
            sortable: true,
        },
        {
            name: "Office ID",
            selector: (row) => row.office_id || "N/A",
            sortable: true,
            cell: (row) =>
                row.office_id ? (
                    <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold cursor-default">
                        {row.office_id}
                    </button>
                ) : (
                    <span className="text-gray-400 italic">N/A</span>
                ),
        },
        {
            name: "Roles",
            selector: (row) => row.roles.map((r) => r.name).join(", "),
            sortable: false,
            cell: (row) => (
                <div>
                    {row.roles.length > 0 ? (
                        row.roles.map((role) => (
                            <span
                                key={role.id}
                                className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold mr-2 px-2 py-1 rounded"
                            >
                                {role.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 italic">No roles</span>
                    )}
                </div>
            ),
        },
        {
            name: "Actions",
            right: true,
            cell: (row) => (
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <Link
                        href={`/users/${row.id}/edit`}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1.5 text-sm rounded-lg font-medium transition whitespace-nowrap"
                    >
                        <Pencil size={14} /> Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        disabled={processing}
                        className="inline-flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 text-sm rounded-lg font-medium transition whitespace-nowrap"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <Master auth={auth} title="Users">
            <Head title="Users Management" />

            <div className="max-w-6xl mx-auto mt-1 px-0 sm:px-6 lg:px-0">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <User className="text-indigo-600" size={32} />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Manage Users
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    View, create, and manage users
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/users/create"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
                        >
                            + Create User
                        </Link>
                    </div>

                    {/* Reusable styled table */}
                    <AppDataTable
                        columns={columns}
                        data={users}
                        title="Manage Users"
                    />
                </div>
            </div>
        </Master>
    );
}
