export default function AddressesPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              My Account
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Addresses
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your saved delivery addresses.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Add New Address
          </button>
        </header>

        <section className="mt-8 rounded-xl border bg-white p-10 text-center">
          <div className="mx-auto max-w-md">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">⌂</span>
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              No saved addresses
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add a delivery address to make checkout faster and easier.
            </p>

            <button
              type="button"
              className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Add Address
            </button>

          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Address Requirements
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>• Recipient name</li>
            <li>• Mobile number</li>
            <li>• Complete delivery address</li>
            <li>• City</li>
            <li>• Optional address label such as Home or Shop</li>
          </ul>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Delivery Context
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Delivery options are determined by the selected address. Lahore
            may support same-day rider and normal delivery, while other cities
            may use courier delivery.
          </p>
        </section>

      </div>
    </main>
  )
}
