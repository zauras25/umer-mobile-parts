export default function RetailerRejectedPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border bg-white p-8 shadow-sm">

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-2xl text-red-600">!</span>
            </div>

            <p className="mt-6 text-sm font-medium text-red-600">
              Retailer Application
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Application Needs Attention
            </h1>

            <p className="mt-4 text-gray-600">
              Your retailer application could not be approved in its current
              form. Please review the reason below and update your application.
            </p>
          </div>

          <section className="mt-8 rounded-lg border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-900">
              Reason for Rejection
            </h2>

            <p className="mt-2 text-sm text-red-800">
              The submitted business information or verification documents
              require correction or additional information.
            </p>
          </section>

          <section className="mt-6 rounded-lg border p-5">
            <h2 className="font-semibold text-gray-900">
              What you can do
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>• Review your submitted business information.</li>
              <li>• Correct any incomplete information.</li>
              <li>• Replace verification documents if required.</li>
              <li>• Review your application again.</li>
              <li>• Resubmit the same retailer application.</li>
            </ul>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex-1 rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              Update Application
            </button>

            <button
              type="button"
              className="flex-1 rounded-lg border px-5 py-3 font-medium text-gray-900"
            >
              View Application
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            You do not need to create another account.
          </p>

        </div>
      </div>
    </main>
  )
}
