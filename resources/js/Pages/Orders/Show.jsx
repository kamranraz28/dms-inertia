import Master from "@/Layouts/Master";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, ClipboardList } from "lucide-react";

export default function OrdersShow({ order, auth }) {
  const orderDetails = order.details || [];
  const total = orderDetails.reduce((sum, item) => {
    const subtotal = item.quantity * item.product.dp;
    return sum + subtotal;
  }, 0);

  return (
    <Master auth={auth} title={`Order #${order.id}`}>
      <Head title={`Order #${order.id} Details`} />

      <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">

          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          </div>

          {/* Back to Orders link */}
          <Link
            href="/orders"
            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 mb-6 font-semibold"
          >
            <ArrowLeft size={16} /> Back to Orders
          </Link>

          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
            <div><strong>Order ID:</strong> #{order.id}</div>
            <div><strong>User:</strong> {order.user?.name ?? "—"}</div>
            <div><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</div>
            <div>
              <strong>Status:</strong>{" "}
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-indigo-100 text-indigo-700">
                {order.status ?? "Pending"}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Product Name</th>
                  <th className="px-6 py-3 text-left">Color</th>
                  <th className="px-6 py-3 text-left">Price (৳)</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Subtotal (৳)</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm">
                {orderDetails.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No order details found.
                    </td>
                  </tr>
                ) : (
                  orderDetails.map((item) => {
                    const subtotal = item.quantity * item.product.dp;
                    return (
                      <tr key={item.id} className="border-t bg-white">
                        <td className="px-6 py-4">{item.product.name}</td>
                        <td className="px-6 py-4">{item.product.color ?? "—"}</td>
                        <td className="px-6 py-4">৳ {item.product.dp.toFixed(2)}</td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4 font-semibold">৳ {subtotal.toFixed(2)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              {orderDetails.length > 0 && (
                <tfoot>
                  <tr className="bg-gray-100 font-bold text-gray-700">
                    <td colSpan="4" className="text-right px-6 py-3">Total</td>
                    <td className="px-6 py-3">৳ {total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </Master>
  );
}
