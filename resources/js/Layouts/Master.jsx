// resources/js/Layouts/Master.jsx
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Master({ title, children, auth }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: "Success!",
        text: flash.success,
        icon: "success",
        confirmButtonColor: "#4f46e5",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }

    if (flash.error) {
      Swal.fire({
        title: "Error!",
        text: flash.error,
        icon: "error",
        confirmButtonColor: "#e53e3e",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  }, [flash]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="relative w-64 bg-white z-50 shadow-lg">
            <Sidebar
              collapsed={false}
              onCollapseToggle={() => {}}
              closeSidebar={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col h-full bg-white border-r shadow transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <Sidebar
          collapsed={collapsed}
          onCollapseToggle={() => setCollapsed(!collapsed)}
          closeSidebar={() => {}}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar user={auth.user} onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Head title={title || "Dashboard"} />
          {children}
        </main>
      </div>
    </div>
  );
}
