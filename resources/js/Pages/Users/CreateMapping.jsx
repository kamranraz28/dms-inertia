import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import { ClipboardList } from "lucide-react";
import Select from "react-select";

export default function CreateMapping({ dealers = [], retailers = [], auth }) {
    const { data, setData, post, processing, errors } = useForm({
        dealer_id: null,
        retailer_id: null,
    });

    // Prepare options for react-select
    const dealerOptions = dealers.map(d => ({ value: d.id, label: d.name }));
    const retailerOptions = retailers.map(r => ({ value: r.id, label: r.name }));

    function handleSubmit(e) {
        e.preventDefault();
        post(route("mapping.store"));  // Make sure this route exists in your web.php & controller
    }

    return (
        <Master auth={auth} title="Create Dealer-Retailer Mapping">
            <Head title="Create Mapping" />

            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="text-indigo-600" size={32} />
                        <h2 className="text-2xl font-bold text-gray-800">Create Dealer-Retailer Mapping</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="dealer" className="block text-gray-700 font-semibold mb-1">
                                Select Dealer
                            </label>
                            <Select
                                id="dealer"
                                options={dealerOptions}
                                onChange={selected => setData("dealer_id", selected ? selected.value : null)}
                                placeholder="Choose a dealer..."
                                isClearable
                            />
                            {errors.dealer_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.dealer_id}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="retailer" className="block text-gray-700 font-semibold mb-1">
                                Select Retailer
                            </label>
                            <Select
                                id="retailer"
                                options={retailerOptions}
                                onChange={selected => setData("retailer_id", selected ? selected.value : null)}
                                placeholder="Choose a retailer..."
                                isClearable
                            />
                            {errors.retailer_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.retailer_id}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition duration-150"
                            >
                                Create Mapping
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Master>
    );
}
