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
                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {flowData
                        .filter((item) => {
                            return (
                                !item.permission ||
                                auth.permissions.includes(item.permission)
                            );
                        })
                        .map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className={`rounded-2xl shadow-xl p-5 flex items-center gap-4 ${item.color}`}
                            >
                                <div className="p-3 rounded-full bg-white/20">
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="text-white text-xl font-bold">
                                        {item.value}
                                    </div>
                                    <div className="text-white text-sm">
                                        {item.title}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {auth.permissions.includes("dashboard_sales_overview") && (
                        <div className="col-span-2 bg-white rounded-2xl shadow p-5">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                Sales Overview
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={lineChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                    {auth.permissions.includes(
                        "dashboard_distribution_ratio"
                    ) && (
                        <div className="bg-white rounded-2xl shadow p-5">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                Distribution Ratio
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={3}
                                        dataKey="value"
                                        label
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
                        </div>
                    )}
                </div>
            </div>
        </Master>
    );
}
