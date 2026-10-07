export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold text-gray-900">
          My Orders
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and manage your orders.
        </p>

        <div className="mt-8 rounded-xl border border-gray-200 p-6">
          <p className="text-gray-700">
            No orders available yet.
          </p>
        </div>
      </div>
    </main>
  );
}
