import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";

export default function ApplicationLogo({ logo, auth, status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    logo: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("settings.logo.upload"), {
      forceFormData: true,
      onSuccess: () => reset("logo"),
    });
  };

  return (
    <Master title="Application Logo" auth={auth}>
      <Head title="Application Logo" />
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-center">Upload Application Logo</h1>

        {logo ? (
          <div className="mb-6 text-center">
            <img
              src={`/storage/logo/${logo}`}
              alt="Current Logo"
              className="mx-auto h-24 object-contain rounded"
            />
            <p className="mt-2 text-gray-600">Current logo</p>
          </div>
        ) : (
          <p className="mb-6 text-center text-gray-500">No logo uploaded yet.</p>
        )}

        {status && (
  <div className="mb-6 rounded-md bg-green-100 border border-green-300 text-green-800 px-4 py-3 text-sm font-medium shadow-sm">
    {status}
  </div>
)}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData("logo", e.target.files[0])}
              className="block w-full border border-gray-300 rounded p-2 cursor-pointer"
              required
            />
            {errors.logo && <p className="text-red-600 text-sm mt-1">{errors.logo}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {processing ? "Uploading..." : "Upload Logo"}
          </button>
        </form>
      </div>
    </Master>
  );
}
