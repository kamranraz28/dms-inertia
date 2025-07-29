import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";

export default function EditCategory({ category, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("categories.update", category.id));
    };

    return (
        <Master auth={auth} title="Edit Category">
            <Head title="Edit Category" />

            <div className="max-w-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Category</h2>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="block w-full rounded border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter category name"
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            {processing ? "Updating..." : "Update Category"}
                        </button>
                    </form>
                </div>
            </div>
        </Master>
    );
}
