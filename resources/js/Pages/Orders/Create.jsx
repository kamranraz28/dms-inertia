import Master from "@/Layouts/Master";
import { Head, useForm } from "@inertiajs/react";

export default function CreateOrder({ products, auth }) {
  const { data, setData, post, processing, errors } = useForm({
    items: [
      { product_id: "", quantity: 1, price: 0, subtotal: 0 },
    ],
    total: 0,
    remarks: "",
  });

  // Handle product selection change
  const handleProductChange = (index, productId) => {
    const selected = products.find(p => p.id === parseInt(productId));
    const updatedItems = [...data.items];
    updatedItems[index].product_id = productId;
    updatedItems[index].price = selected?.dp || 0;
    updatedItems[index].subtotal = updatedItems[index].price * updatedItems[index].quantity;

    setData("items", updatedItems);
    calculateTotal(updatedItems);
  };

  // Handle quantity change
  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...data.items];
    updatedItems[index].quantity = quantity;
    updatedItems[index].subtotal = updatedItems[index].price * quantity;

    setData("items", updatedItems);
    calculateTotal(updatedItems);
  };

  // Add new row
  const handleAddRow = () => {
    setData("items", [
      ...data.items,
      { product_id: "", quantity: 1, price: 0, subtotal: 0 },
    ]);
  };

  // Remove row
  const handleRemoveRow = (index) => {
    const updatedItems = data.items.filter((_, i) => i !== index);
    setData("items", updatedItems);
    calculateTotal(updatedItems);
  };

  // Recalculate total
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    setData("total", total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("orders.store"));
  };

  return (
    <Master auth={auth} title="Create Order">
      <Head title="Create Order" />

      <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Order</h2>

          <form onSubmit={handleSubmit}>
            {data.items.map((item, index) => (
              <div key={index} className="flex flex-wrap items-end gap-4 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">Product</label>
                  <select
                    value={item.product_id}
                    onChange={(e) => handleProductChange(index, e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  >
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>

                <div className="w-40">
                  <label className="block text-sm font-medium text-gray-700">Subtotal</label>
                  <input
                    type="number"
                    value={item.subtotal}
                    readOnly
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                  />
                </div>

                {data.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <div className="mb-4">
              <button
                type="button"
                onClick={handleAddRow}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded"
              >
                + Add Product
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Total</label>
              <input
                type="number"
                value={data.total}
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea
                value={data.remarks}
                onChange={(e) => setData("remarks", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </Master>
  );
}
