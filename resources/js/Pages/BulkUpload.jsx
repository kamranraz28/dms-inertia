import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";

export default function BulkUpload({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        csv_file: null,
        type: "",
    });

    const [fileName, setFileName] = useState("");

    const options = [
        { value: "stock", label: "Stock Upload" },
        { value: "prisale", label: "Primary Sale Upload" },
        { value: "secsale", label: "Secondary Sale Upload" },
        { value: "tersale", label: "Tertiary Sale Upload" },
        { value: "retailer", label: "Retailer Upload" },
        { value: "dealer", label: "Dealer Upload" },
        { value: "mapping", label: "Dealer-Retailer Mapping" },
        // Add more options as needed
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("csv_file", file);
        setFileName(file?.name || "");
    };

    const handleTypeChange = (selected) => {
        setData("type", selected?.value || "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("bulk.upload"));
    };

    return (
        <Master auth={auth} title="Bulk Upload">
            <Head title="Bulk Upload" />

            <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Bulk Upload via CSV
                    </h2>

                    <div className="text-right">
                        <a
                            href="/template.zip"
                            download
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md shadow"
                        >
                            Download CSV Templates
                        </a>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* CSV Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload CSV File
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm"
                            />
                            {fileName && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Selected: {fileName}
                                </p>
                            )}
                            {errors.csv_file && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.csv_file}
                                </p>
                            )}
                        </div>

                        {/* Type Select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Select Upload Type
                            </label>
                            <Select
                                options={options}
                                onChange={handleTypeChange}
                                placeholder="Choose upload type..."
                                isClearable
                            />
                            {errors.type && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.type}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="text-right">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md shadow"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Master>
    );
}
