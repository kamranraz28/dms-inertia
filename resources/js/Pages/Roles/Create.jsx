import InputError from "@/Components/InputError";
import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftCircle, ShieldPlus } from "lucide-react";

export default function Create({ auth, permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        permissions: [],
    });

    const handlePermissionChange = (id) => {
        if (data.permissions.includes(id)) {
            setData(
                "permissions",
                data.permissions.filter((pid) => pid !== id)
            );
        } else {
            setData("permissions", [...data.permissions, id]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("roles.store"));
    };

    return (
        <Master auth={auth} title="Create Role">
            <Head title="Create New Role" />

            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldPlus className="text-indigo-600" size={32} />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Create New Role
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Assign permissions to this role
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Assign Permissions
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {permissions.map((permission) => (
                                    <label
                                        key={permission.id}
                                        className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 border rounded-md p-2 hover:bg-gray-100"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.permissions.includes(
                                                permission.id
                                            )}
                                            onChange={() =>
                                                handlePermissionChange(
                                                    permission.id
                                                )
                                            }
                                        />
                                        {permission.name}
                                    </label>
                                ))}
                            </div>
                            <InputError
                                message={errors.permissions}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Link
                                href="/roles"
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600"
                            >
                                <ArrowLeftCircle size={18} />
                                Back to Roles
                            </Link>

                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
                                disabled={processing}
                            >
                                Create Role
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Master>
    );
}
