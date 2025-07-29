import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import { ClipboardList } from "lucide-react";
import Select from "react-select";

export default function CreateProduct({ brands, categories, auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    brand_id: null,
    cat_id: null,
    name: "",
    model: "",
    color: "",
    dp: "",
  });

  const brandOptions = brands.map((b) => ({
    value: b.id,
    label: b.name,
  }));

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  function submit(e) {
    e.preventDefault();
    post(route("products.store"), {
      onSuccess: () => reset(),
    });
  }

  return (
    <Master auth={auth} title="Create Product">
      <Head title="Create Product" />

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">Create Product</h2>
          </div>

          <form onSubmit={submit} className="space-y-6">
            {/* Brand */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Select Brand</label>
              <Select
                options={brandOptions}
                onChange={(selected) => setData("brand_id", selected ? selected.value : null)}
                value={brandOptions.find((b) => b.value === data.brand_id) || null}
                placeholder="Choose a brand..."
                isClearable
              />
              {errors.brand_id && (
                <p className="text-red-600 text-sm mt-1">{errors.brand_id}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Select Category</label>
              <Select
                options={categoryOptions}
                onChange={(selected) => setData("cat_id", selected ? selected.value : null)}
                value={categoryOptions.find((c) => c.value === data.cat_id) || null}
                placeholder="Choose a category..."
                isClearable
              />
              {errors.cat_id && (
                <p className="text-red-600 text-sm mt-1">{errors.cat_id}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Model */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Model</label>
              <input
                type="text"
                value={data.model}
                onChange={(e) => setData("model", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter model"
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-600">{errors.model}</p>
              )}
            </div>

            {/* Color */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Color</label>
              <input
                type="text"
                value={data.color}
                onChange={(e) => setData("color", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter color"
              />
              {errors.color && (
                <p className="mt-1 text-sm text-red-600">{errors.color}</p>
              )}
            </div>

            {/* DP (Price) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Price (DP)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={data.dp}
                onChange={(e) => setData("dp", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter price"
              />
              {errors.dp && (
                <p className="mt-1 text-sm text-red-600">{errors.dp}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {processing ? "Saving..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Master>
  );
}
