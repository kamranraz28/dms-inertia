import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";

export default function CreateBrand({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("brands.store"), {
      onSuccess: () => reset(),
    });
  };

  return (
    <Master auth={auth} title="Create Brand">
      <Head title="Create Brand" />

      <div className="max-w-2xl mx-auto mt-10 px-4">
        <div className="bg-white shadow rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Brand</h2>
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Brand Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter brand name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
            >
              {processing ? "Saving..." : "Create Brand"}
            </button>
          </form>
        </div>
      </div>
    </Master>
  );
}
