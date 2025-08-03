import Master from "@/Layouts/Master";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    BarChart3,
    Box,
    Boxes,
    HandCoins,
    Layers,
    LayoutGrid,
    PackageCheck,
    RotateCcw,
    ShoppingBag,
    ShoppingCart,
    Truck,
    Users,
    Warehouse,
} from "lucide-react";

import {
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const COLORS = ["#4f46e5", "#06b6d4", "#f43f5e"];

export default function Dashboard({
    auth,
    users,
    brands,
    categories,
    primarySales,
    secondarySales,
    tertiarySales,
    orders,
    products,
    totalStock,
    totalCurrentStock,
    distributorCurrentStock,
    retailerCurrentStock,
    totalDealerPurchase,
    totalRetailerPurchase,
    totalReturn,
}) {
    const flowData = [
        {
            title: "Users",
            value: users.length,
            icon: <Users className="text-white" />,
            color: "bg-indigo-600",
            permission: "dashboard_user_data",
        },
        {
            title: "Brands",
            value: brands.length,
            icon: <Layers className="text-white" />,
            color: "bg-fuchsia-600",
            permission: "dashboard_brand_data",
        },
        {
            title: "Categories",
            value: categories.length,
            icon: <LayoutGrid className="text-white" />,
            color: "bg-amber-500",
            permission: "dashboard_category_data",
        },
        {
            title: "Products",
            value: products.length,
            icon: <PackageCheck className="text-white" />,
            color: "bg-green-600",
            permission: "dashboard_product_data",
        },
        {
            title: "Orders",
            value: orders.length,
            icon: <ShoppingCart className="text-white" />,
            color: "bg-purple-700",
            permission: "dashboard_order_data",
        },
        {
            title: "Total Purchase",
            value: totalDealerPurchase,
            icon: <ShoppingBag className="text-white" />,
            color: "bg-sky-700",
            permission: "dashboard_dealer_purchase",
        },
        {
            title: "Total Purchase",
            value: totalRetailerPurchase,
            icon: <HandCoins className="text-white" />,
            color: "bg-cyan-600",
            permission: "dashboard_retailer_purchase",
        },
        {
            title: "Primary Sales",
            value: primarySales.length,
            icon: <BarChart3 className="text-white" />,
            color: "bg-blue-600",
            permission: "dashboard_primary_sales",
        },
        {
            title: "Secondary Sales",
            value: secondarySales.length,
            icon: <LineChart className="text-white" />,
            color: "bg-pink-600",
            permission: "dashboard_secondary_sales",
        },
        {
            title: "Tertiary Sales",
            value: tertiarySales.length,
            icon: <PieChart className="text-white" />,
            color: "bg-orange-600",
            permission: "dashboard_tertiary_sales",
        },
        {
            title: "Total Stock",
            value: totalStock,
            icon: <Boxes className="text-white" />,
            color: "bg-lime-600",
            permission: "dashboard_total_stock",
        },
        {
            title: "Available Stock",
            value: totalCurrentStock,
            icon: <Warehouse className="text-white" />,
            color: "bg-emerald-800",
            permission: "dashboard_available_stock",
        },
        {
            title: "Available Stock",
            value: distributorCurrentStock,
            icon: <Box className="text-white" />,
            color: "bg-teal-600",
            permission: "dashboard_dealer_stock",
        },
        {
            title: "Available Stock",
            value: retailerCurrentStock,
            icon: <Truck className="text-white" />,
            color: "bg-violet-600",
            permission: "dashboard_retailer_stock",
        },
        {
            title: "Product Return Request",
            value: totalReturn,
            icon: <RotateCcw className="text-white" />,
            color: "bg-violet-900",
            permission: "dashboard_total_return",
        },
    ];

    const pieData = [
        { name: "Primary", value: primarySales.length },
        { name: "Secondary", value: secondarySales.length },
        { name: "Tertiary", value: tertiarySales.length },
    ];

    const lineChartData = [
        { name: "Primary", sales: primarySales.length },
        { name: "Secondary", sales: secondarySales.length },
        { name: "Tertiary", sales: tertiarySales.length },
    ];

    return (
        <Master auth={auth} title="Dashboard">
            <Head title="Dashboard" />
            <div className="space-y-10">
                {/* Animated Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                    {flowData
                        .filter(
                            (item) =>
                                !item.permission ||
                                auth.permissions.includes(item.permission)
                        )
                        .map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.04 }}
                                className={`rounded-xl p-5 transition-all duration-300 text-white shadow-2xl bg-gradient-to-br ${item.color} relative overflow-hidden backdrop-blur-sm border border-white/20`}
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 blur-2xl rotate-45 rounded-full -mt-8 -mr-8" />
                                <div className="flex items-center gap-4 z-10 relative">
                                    <div className="p-3 rounded-full bg-white/20 text-white text-xl shadow-md hover:scale-110 transition">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {item.value}
                                        </div>
                                        <div className="text-sm">
                                            {item.title}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>

                {/* Chart Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {auth.permissions.includes("dashboard_sales_overview") && (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="col-span-2 bg-white rounded-xl shadow-xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Sales Overview
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke="#334155" />
                                    <YAxis stroke="#334155" />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </motion.div>
                    )}

                    {auth.permissions.includes(
                        "dashboard_distribution_ratio"
                    ) && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-xl shadow-xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Distribution Ratio
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={4}
                                        dataKey="value"
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(
                                                0
                                            )}%`
                                        }
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </motion.div>
                    )}
                </div>
            </div>
        </Master>
    );
}
