import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { UserCog } from "lucide-react";

export default function EditUser({ auth, user, roles }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    office_id: user.office_id || "",
    roles: user.roles.map((r) => r.name),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("users.update", user.id));
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    const updatedRoles = checked
      ? [...data.roles, value]
      : data.roles.filter((role) => role !== value);
    setData("roles", updatedRoles);
  };

  return (
    <Master auth={auth} title="Edit User">
      <Head title="Edit User" />

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <UserCog className="text-indigo-600" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
              <p className="text-gray-500 text-sm">Update user details and roles</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Office ID</label>
              <input
                type="text"
                value={data.office_id}
                onChange={(e) => setData("office_id", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.office_id && <p className="text-red-500 text-sm mt-1">{errors.office_id}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Roles</label>
              <div className="flex flex-wrap gap-3">
                {roles.map((role) => (
                  <label key={role.id} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={role.name}
                      checked={data.roles.includes(role.name)}
                      onChange={handleRoleChange}
                      className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{role.name}</span>
                  </label>
                ))}
              </div>
              {errors.roles && <p className="text-red-500 text-sm mt-1">{errors.roles}</p>}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Link
                href={route("users.index")}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                ← Back to User List
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition duration-150"
              >
                {processing ? "Saving..." : "Update User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Master>
  );
}
