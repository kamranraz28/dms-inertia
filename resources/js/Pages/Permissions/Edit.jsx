import InputError from "@/Components/InputError";
import Master from "@/Layouts/Master";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

export default function Edit({ auth, permission }) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: permission.name || "",
  });

  useEffect(() => {
    return () => reset("name");
  }, []);

  const submit = (e) => {
    e.preventDefault();
    put(route("permissions.update", permission.id));
  };

  return (
    <Master auth={auth} title="Edit Permission">
      <Head title="Edit Permission" />

      <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" size={26} />
              <h1 className="text-2xl font-bold text-gray-800">Edit Permission</h1>
            </div>
            <Link
              href={route("permissions.index")}
              className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600"
            >
              <ArrowLeft size={16} /> Back to Permissions
            </Link>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Permission Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., delete-comments"
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
              >
                Update Permission
              </button>
            </div>
          </form>
        </div>
      </div>
    </Master>
  );
}
