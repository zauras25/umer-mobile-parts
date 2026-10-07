export default function RetailerApprovedPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl text-green-700">✓</span>
            </div>

            <p className="mt-6 text-sm font-medium text-green-600">
              Retailer Approved
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Your Retailer Account Is Approved
            </h1>

            <p className="mt-4 max-w-xl text-gray-600">
              Your retailer verification has been approved. Wholesale
              pricing and retailer features are now available on your account.
            </p>
          </div>

          <section className="mt-8 rounded-lg bg-green-50 p-6">
            <h2 className="font-semibold text-green-900">
              Wholesale Pricing Unlocked
            </h2>

            <p className="mt-2 text-sm text-green-800">
              You will now see your applicable retailer price and wholesale
              discount on eligible products.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="font-semibold text-gray-900">
              Your Retailer Features
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-gray-900">
                  Wholesale Pricing
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  View your retailer prices and discounts.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-gray-900">
                  Quantity Discounts
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Unlock better rates when quantity increases.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-gray-900">
                  Buy Again
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Quickly reorder products from previous orders.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-gray-900">
                  Frequently Purchased
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Quickly access products you regularly purchase.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex-1 rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              Start Shopping
            </button>

            <button
              type="button"
              className="flex-1 rounded-lg border px-5 py-3 font-medium text-gray-900"
            >
              Go to Retailer Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
