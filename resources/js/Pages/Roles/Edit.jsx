import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { Save, ShieldCheck, X } from "lucide-react";

export default function RoleEdit({ auth, role, permissions }) {
  const { data, setData, put, processing, errors } = useForm({
    name: role.name || "",
    permissions: role.permissions ? role.permissions.map((p) => p.id) : [],
  });

  // Handle checkbox toggle for permissions
  const togglePermission = (id) => {
    if (data.permissions.includes(id)) {
      setData(
        "permissions",
        data.permissions.filter((permId) => permId !== id)
      );
    } else {
      setData("permissions", [...data.permissions, id]);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    put(route("roles.update", role.id));
  };

  return (
    <Master auth={auth} title={`Edit Role - ${role.name}`}>
      <Head title={`Edit Role - ${role.name}`} />

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-indigo-600" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Edit Role</h2>
              <p className="text-gray-500 text-sm">Update role details and permissions</p>
            </div>
          </div>

          <form onSubmit={submit}>
            {/* Role Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Role Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                }`}
                autoComplete="off"
              />
              {errors.name && <p className="text-red-600 mt-1 text-sm">{errors.name}</p>}
            </div>

            {/* Permissions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto border border-gray-300 rounded-lg p-4">
                {permissions.map((permission) => (
                  <label
                    key={permission.id}
                    className="inline-flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={data.permissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700 text-sm">{permission.name}</span>
                  </label>
                ))}
              </div>
              {errors.permissions && <p className="text-red-600 mt-1 text-sm">{errors.permissions}</p>}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4">
              <Link
                href="/roles"
                className="inline-flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium transition"
              >
                <X size={16} />
                Cancel
              </Link>

              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition disabled:opacity-50"
              >
                <Save size={16} />
                Update Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </Master>
  );
}
