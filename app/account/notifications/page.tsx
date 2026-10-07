export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <header>
          <p className="text-sm font-medium text-gray-500">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Notifications
          </h1>

          <p className="mt-2 text-gray-600">
            Stay updated about your account, orders, retailer application,
            and replacement requests.
          </p>
        </header>

        <section className="mt-8 rounded-xl border bg-white p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <span className="text-2xl">🔔</span>
          </div>

          <h2 className="mt-5 text-xl font-semibold text-gray-900">
            No notifications
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            You do not have any notifications right now.
          </p>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Notification Types
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div className="rounded-lg border p-4">
              <h3 className="font-medium text-gray-900">
                Account
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Retailer application submitted, approved, rejected,
                or information update requests.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium text-gray-900">
                Orders
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Order confirmation, processing, packed, shipped,
                out for delivery, and delivered updates.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium text-gray-900">
                Replacement
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Replacement request, review, approval, rejection,
                processing, and completion updates.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium text-gray-900">
                Product
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Supported product and stock-related notifications.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  )
}
