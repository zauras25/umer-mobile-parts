export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <header>
          <p className="text-sm font-medium text-gray-500">
            Support
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Warranty
          </h1>

          <p className="mt-2 text-gray-600">
            Understand warranty coverage before requesting a replacement.
          </p>
        </header>

        <section className="mt-8 rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Warranty Information
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Warranty coverage may vary depending on the product,
            manufacturer, quality, and applicable company policy.
            Always check the warranty shown on the product and order details.
          </p>
        </section>

        <section className="mt-6 grid gap-6 sm:grid-cols-3">

          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold text-gray-900">
              Product Warranty
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Warranty duration is displayed on eligible product details.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold text-gray-900">
              Order Warranty
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your order details show the applicable warranty for purchased
              products.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold text-gray-900">
              Replacement
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Replacement availability is checked before submitting a claim.
            </p>
          </div>

        </section>

        <section className="mt-6 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Before Requesting Replacement
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>• Check the warranty shown for the purchased product.</li>
            <li>• Open the relevant order from My Orders.</li>
            <li>• Select the product you want to claim.</li>
            <li>• Complete the eligibility check.</li>
            <li>• Provide the required reason and evidence.</li>
          </ul>
        </section>

        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-semibold text-amber-900">
            Important
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            Warranty does not automatically mean every product is eligible
            for replacement. Eligibility depends on the applicable product
            and company policy.
          </p>
        </section>

      </div>
    </main>
  )
}
