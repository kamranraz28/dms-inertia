import Master from "@/Layouts/Master";
import { Head, Link } from "@inertiajs/react";
import { Mail, UserCircle } from "lucide-react";

export default function Profile({ auth, status }) {
    const user = auth.user;

    return (
        <Master auth={auth} title="Profile">
            <Head title="My Profile" />

            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-4 mb-6">
                        {user?.photo ? (
                            <img
                                src={`/storage/profile-photos/${user.photo}`}
                                alt="avatar"
                                className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"
                            />
                        ) : (
                            <UserCircle className="text-indigo-500" size={48} />
                        )}

                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">
                                My Profile
                            </h2>
                            <p className="text-gray-500">
                                View your account details
                            </p>
                        </div>
                    </div>

                    {/* Stylish Status Message */}
                    {status && (
                        <div className="mb-6 rounded-md bg-green-100 border border-green-300 text-green-800 px-4 py-3 text-sm font-medium shadow-sm">
                            {status}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Full Name
                            </label>
                            <p className="text-gray-900 font-semibold">
                                {user.name}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email Address
                            </label>
                            <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                <Mail size={16} className="text-indigo-500" />
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-right">
                        <Link
                            href="/profile/edit"
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
        </Master>
    );
}
