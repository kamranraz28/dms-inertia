import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";

export default function ApplicationColor({ auth, settings, status }) {
  const { data, setData, post, processing, errors } = useForm({
    header_color: settings?.header_color || "#4f46e5",
    sidebar_color: settings?.sidebar_color || "#1e293b",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("settings.color.upload"));
  };

  return (
    <Master title="Application Color" auth={auth}>
      <Head title="Application Color" />
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-center">Update Application Colors</h1>

        {status && (
          <div className="mb-6 rounded-md bg-green-100 border border-green-300 text-green-800 px-4 py-3 text-sm font-medium shadow-sm">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="header_color" className="block text-sm font-medium text-gray-700 mb-1">
              Header Color
            </label>
            <input
              type="color"
              id="header_color"
              value={data.header_color}
              onChange={(e) => setData("header_color", e.target.value)}
              className="w-full h-12 rounded border border-gray-300 cursor-pointer"
            />
            {errors.header_color && (
              <p className="text-red-600 text-sm mt-1">{errors.header_color}</p>
            )}
          </div>

          <div>
            <label htmlFor="sidebar_color" className="block text-sm font-medium text-gray-700 mb-1">
              Sidebar Color
            </label>
            <input
              type="color"
              id="sidebar_color"
              value={data.sidebar_color}
              onChange={(e) => setData("sidebar_color", e.target.value)}
              className="w-full h-12 rounded border border-gray-300 cursor-pointer"
            />
            {errors.sidebar_color && (
              <p className="text-red-600 text-sm mt-1">{errors.sidebar_color}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {processing ? "Updating..." : "Update Colors"}
          </button>
        </form>
      </div>
    </Master>
  );
}
