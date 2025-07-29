import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import Select from "react-select";
import { ClipboardList } from "lucide-react";

export default function EditProduct({ product, brands = [], categories = [], auth }) {
  const { data, setData, put, processing, errors } = useForm({
    brand_id: product.brand_id || null,
    cat_id: product.cat_id || null,
    name: product.name || "",
    model: product.model || "",
    color: product.color || "",
    dp: product.dp || "",
  });

  const brandOptions = brands.map((b) => ({
    value: b.id,
    label: b.name,
  }));

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  function handleSubmit(e) {
    e.preventDefault();
    put(route("products.update", product.id));
  }

  return (
    <Master auth={auth} title="Edit Product">
      <Head title="Edit Product" />

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Brand */}
            <div>
              <label htmlFor="brand" className="block text-gray-700 font-semibold mb-1">
                Select Brand
              </label>
              <Select
                id="brand"
                options={brandOptions}
                value={brandOptions.find((b) => b.value === data.brand_id) || null}
                onChange={(selected) => setData("brand_id", selected ? selected.value : null)}
                placeholder="Choose a brand..."
                isClearable
              />
              {errors.brand_id && (
                <p className="mt-1 text-sm text-red-600">{errors.brand_id}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-gray-700 font-semibold mb-1">
                Select Category
              </label>
              <Select
                id="category"
                options={categoryOptions}
                value={categoryOptions.find((c) => c.value === data.cat_id) || null}
                onChange={(selected) => setData("cat_id", selected ? selected.value : null)}
                placeholder="Choose a category..."
                isClearable
              />
              {errors.cat_id && (
                <p className="mt-1 text-sm text-red-600">{errors.cat_id}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Product Name
              </label>
              <input
                id="name"
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
              <label htmlFor="model" className="block text-gray-700 font-semibold mb-1">
                Model
              </label>
              <input
                id="model"
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
              <label htmlFor="color" className="block text-gray-700 font-semibold mb-1">
                Color
              </label>
              <input
                id="color"
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

            {/* DP */}
            <div>
              <label htmlFor="dp" className="block text-gray-700 font-semibold mb-1">
                Price (DP)
              </label>
              <input
                id="dp"
                type="number"
                min="0"
                step="any"
                value={data.dp}
                onChange={(e) => setData("dp", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter price"
              />
              {errors.dp && (
                <p className="mt-1 text-sm text-red-600">{errors.dp}</p>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition duration-150"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Master>
  );
}
