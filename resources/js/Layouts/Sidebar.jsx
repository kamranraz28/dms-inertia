import { Link, usePage } from "@inertiajs/react";
import {
    BadgeDollarSign,
    Boxes,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Handshake,
    Home,
    Inbox,
    Lock,
    PackageX,
    RotateCcw,
    Settings,
    ShieldCheck,
    ShoppingCart,
    UploadCloud,
    User
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Sidebar({ collapsed, onCollapseToggle, closeSidebar }) {
    const { url, props } = usePage();
    const user = props.auth.user;
    const logo = props.logo;
    const sidebar_color = props.sidebar_color || "#ffffff"; // fallback to white
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userConfigOpen, setUserConfigOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [systemConfigOpen, setSystemConfigOpen] = useState(false); // Add state for systemConfigOpen
    const dropdownRef = useRef();
    const permissions = props.auth.permissions || []; // Add this line

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const avatarUrl =
        user?.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
        )}&background=random`;
    const photoUrl = user?.photo
        ? `/storage/profile-photos/${user.photo}`
        : avatarUrl;
    const logoUrl = logo ? `/storage/logo/${logo}` : null;

    const navLinks = [{ label: "Dashboard", icon: Home, href: "/dashboard" }];
    const isSettingsRoute =
        url.startsWith("/settings/logo") || url.startsWith("/settings/color");

    return (
        <div
            className="flex flex-col h-full border-r border-gray-200 text-white"
            style={{ backgroundColor: sidebar_color }}
        >
            {/* Logo Header */}
            <div
                className={`flex items-center p-4 border-b ${
                    collapsed ? "justify-center" : "justify-start"
                }`}
            >
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt="App Logo"
                        className={`h-12 object-contain cursor-pointer mx-auto`} // h-10 = smaller height, mx-auto = horizontal center
                        onClick={() => (window.location.href = "/")}
                        title="Home"
                    />
                ) : (
                    <div
                        className={`text-xl font-bold text-white cursor-pointer select-none ${
                            collapsed ? "mx-auto" : ""
                        }`}
                        onClick={() => (window.location.href = "/")}
                        title="Home"
                    >
                        LOGO
                    </div>
                )}

                <button
                    onClick={onCollapseToggle}
                    className="ml-auto text-white hover:text-gray-100"
                    title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight size={20} />
                    ) : (
                        <ChevronLeft size={20} />
                    )}
                </button>
            </div>

            {/* Sidebar Content */}
            <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                {/* User dropdown */}
                <div ref={dropdownRef} className="relative px-3">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`flex items-center gap-3 w-full rounded-md px-3 py-2 transition-all cursor-pointer border ${
                            dropdownOpen
                                ? "border-white bg-white/10 text-white"
                                : "border-transparent text-white hover:bg-white/10"
                        }`}
                        title={collapsed ? user?.name || "User" : ""}
                    >
                        <img
                            src={photoUrl}
                            alt="User avatar"
                            className="w-10 h-10 rounded-full object-cover border-2 border-white flex-shrink-0"
                        />
                        {!collapsed && (
                            <span className="font-semibold">
                                {user?.name || "User"}
                            </span>
                        )}
                        {!collapsed &&
                            (dropdownOpen ? (
                                <ChevronUp size={16} />
                            ) : (
                                <ChevronDown size={16} />
                            ))}
                    </button>

                    {dropdownOpen && !collapsed && (
                        <div className="absolute left-0 mt-1 w-full bg-white text-gray-700 border border-gray-200 rounded-md shadow-lg z-10">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <User size={16} /> Profile
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                            >
                                <Lock size={16} /> Lock Screen
                            </Link>
                        </div>
                    )}
                </div>

                {/* Navigation Links */}
                {navLinks.map(({ label, icon: Icon, href }) => {
                    const isActive = url.startsWith(href);
                    return (
                        <Link
                            key={label}
                            href={href}
                            onClick={closeSidebar}
                            className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                                isActive
                                    ? "bg-white/20 text-white font-semibold"
                                    : "hover:bg-white/10 text-white"
                            }`}
                            title={collapsed ? label : ""}
                        >
                            <Icon size={18} />
                            <span
                                className={`${
                                    collapsed
                                        ? "opacity-0 w-0"
                                        : "opacity-100 w-auto"
                                } transition-all duration-300`}
                            >
                                {label}
                            </span>
                        </Link>
                    );
                })}

                {/* Settings Section */}
                {permissions.includes("system_settings") && (
                    <div>
                        <button
                            onClick={() => setSettingsOpen(!settingsOpen)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all ${
                                isSettingsRoute
                                    ? "bg-white/20 text-white font-semibold"
                                    : "hover:bg-white/10 text-white"
                            }`}
                            title={collapsed ? "Settings" : ""}
                        >
                            <div className="flex items-center gap-3">
                                <Settings size={18} />
                                {!collapsed && <span>Settings</span>}
                            </div>
                            {!collapsed &&
                                (settingsOpen ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                ))}
                        </button>

                        {!collapsed && settingsOpen && (
                            <div className="ml-8 mt-1 space-y-1">
                                <Link
                                    href="/settings/logo"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith("/settings/logo")
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Application Logo
                                </Link>
                                <Link
                                    href="/settings/color"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith("/settings/color")
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Application Color
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* User Config Section */}
                {permissions.includes("user_configuration") && (
                    <div>
                        <button
                            onClick={() => setUserConfigOpen(!userConfigOpen)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all ${
                                url.startsWith("/permissions") ||
                                url.startsWith("/roles") ||
                                url.startsWith("/users")
                                    ? "bg-white/20 text-white font-semibold"
                                    : "hover:bg-white/10 text-white"
                            }`}
                            title={collapsed ? "User Configuration" : ""}
                        >
                            <div className="flex items-center gap-3">
                                <Settings size={18} />
                                {!collapsed && <span>User Configuration</span>}
                            </div>
                            {!collapsed &&
                                (userConfigOpen ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                ))}
                        </button>

                        {!collapsed && userConfigOpen && (
                            <div className="ml-8 mt-1 space-y-1">
                                <Link
                                    href="/permissions"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith("/permissions")
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Permissions
                                </Link>
                                <Link
                                    href="/roles"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith("/roles")
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Roles
                                </Link>
                                <Link
                                    href="/users"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith("/users")
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Users
                                </Link>
                                <Link
                                    href="/dealer-retailer-mapping"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith(
                                            "/dealer-retailer-mapping"
                                        )
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Dealer-Retailer Mapping
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                {/* System Configuration Section */}
                {permissions.includes("system_configuration") && (
                    <div>
                        <button
                            onClick={() =>
                                setSystemConfigOpen(!systemConfigOpen)
                            }
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all ${
                                url.startsWith("/system-config")
                                    ? "bg-white/20 text-white font-semibold"
                                    : "hover:bg-white/10 text-white"
                            }`}
                            title={collapsed ? "System Configuration" : ""}
                        >
                            <div className="flex items-center gap-3">
                                <Settings size={18} />
                                {!collapsed && (
                                    <span>System Configuration</span>
                                )}
                            </div>
                            {!collapsed &&
                                (systemConfigOpen ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                ))}
                        </button>

                        {!collapsed && systemConfigOpen && (
                            <div className="ml-8 mt-1 space-y-1">
                                <Link
                                    href="/products"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith("/products")
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Product
                                </Link>
                                <Link
                                    href="/brands"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith("/brands")
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Brand
                                </Link>
                                <Link
                                    href="/categories"
                                    className={`block text-sm px-2 py-1 rounded-md ${
                                        url.startsWith("/categories")
                                            ? "text-white font-semibold"
                                            : "hover:bg-white/10 text-white"
                                    }`}
                                >
                                    Category
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                {/* Orders NavLink */}
                {permissions.includes("view_orders") && (
                    <Link
                        href="/orders"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/orders"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "Orders" : ""}
                    >
                        <ShoppingCart size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            Orders
                        </span>
                    </Link>
                )}
                {/* Orders NavLink */}
                {permissions.includes("view_orders_acc") && (
                    <Link
                        href="/order-list"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/order-list"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "Order List" : ""}
                    >
                        <ShoppingCart size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            Order List
                        </span>
                    </Link>
                )}
                {/* Stocks NavLink */}
                {permissions.includes("view_stocks") && (
                    <Link
                        href="/stocks"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/stocks"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "Stocks" : ""}
                    >
                        <Boxes size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            Stocks
                        </span>
                    </Link>
                )}
                {/* StockOut NavLink */}
                {permissions.includes("stock_out") && (
                    <Link
                        href="/stockout"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/stockout"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "Stock Out" : ""}
                    >
                        <PackageX size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            Stock Out
                        </span>
                    </Link>
                )}
                {/* Product Receive NavLink */}
                {permissions.includes("receive_products") && (
                    <Link
                        href="/products/receive"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/products/receive"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "Receive Product" : ""}
                    >
                        <Inbox size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            Receive Product
                        </span>
                    </Link>
                )}

                {/* Product Receive NavLink */}
                {permissions.includes("sale_product") && (
                    <Link
                        href="/sales/create"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/sales/create"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "Create Sale" : ""}
                    >
                        <BadgeDollarSign size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            Sale Product
                        </span>
                    </Link>
                )}
                {/* Retailer Stocks NavLink */}
                {permissions.includes("retailer_stocks") && (
                    <Link
                        href="/my-stocks"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/my-stocks"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "My Stocks" : ""}
                    >
                        <Boxes size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            My Stocks
                        </span>
                    </Link>
                )}

                {/* Bulk Upload NavLink */}

                {permissions.includes("bulk_upload_admin") && (
                    <Link
                        href="/bulk-upload"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/bulk-upload"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "Bulk Upload" : ""}
                    >
                        <UploadCloud size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            Bulk Upload
                        </span>
                    </Link>
                )}

                {permissions.includes("warranty_activation") && (
                    <Link
                        href="/tertiary-sales"
                        onClick={closeSidebar}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                            url === "/tertiary-sales"
                                ? "bg-white/20 text-white font-semibold"
                                : "hover:bg-white/10 text-white"
                        }`}
                        title={collapsed ? "Tertiary Sales" : ""}
                    >
                        <Handshake size={18} />
                        <span
                            className={`${
                                collapsed
                                    ? "opacity-0 w-0"
                                    : "opacity-100 w-auto"
                            } transition-all duration-300`}
                        >
                            Tertiary Sales
                        </span>
                    </Link>
                )}

                {/* Dealer Product Return*/}
                {permissions.includes("dealer_return_product") && (
                <Link
                    href="/products/return"
                    onClick={closeSidebar}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                        url === "/products/return"
                            ? "bg-white/20 text-white font-semibold"
                            : "hover:bg-white/10 text-white"
                    }`}
                    title={collapsed ? "Return Product" : ""}
                >
                    <RotateCcw size={18} />
                    <span
                        className={`${
                            collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                        } transition-all duration-300`}
                    >
                        Return Product
                    </span>
                </Link>
                )}

                {/* Verify Product NavLink */}

                <Link
                    href="/products/verify"
                    onClick={closeSidebar}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                        url === "/products/verify"
                            ? "bg-white/20 text-white font-semibold"
                            : "hover:bg-white/10 text-white"
                    }`}
                    title={collapsed ? "Verify Product" : ""}
                >
                    <ShieldCheck size={18} />
                    <span
                        className={`${
                            collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                        } transition-all duration-300`}
                    >
                        Verify Product
                    </span>
                </Link>



                {/* Debug: Show permissions */}
                {/* <pre style={{ color: "black", background: "white" }}>
                    {JSON.stringify(permissions)}
                </pre> */}
            </nav>
        </div>
    );
}
