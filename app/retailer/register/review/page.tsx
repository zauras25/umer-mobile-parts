export default function RetailerReviewPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-blue-600">
            Final Step
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Review Your Application
          </h1>

          <p className="mt-2 text-gray-600">
            Review your information before submitting your retailer
            application.
          </p>

          <div className="mt-8 space-y-6">
            <section className="rounded-lg border p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  Account Information
                </h2>

                <button
                  type="button"
                  className="text-sm font-medium text-blue-600"
                >
                  Edit
                </button>
              </div>

              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">Name</dt>
                  <dd className="font-medium text-gray-900">
                    Customer Name
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-medium text-gray-900">
                    customer@example.com
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">Mobile</dt>
                  <dd className="font-medium text-gray-900">
                    03XX XXXXXXX
                  </dd>
                </div>
              </dl>
            </section>

            <section className="rounded-lg border p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  Business Information
                </h2>

                <button
                  type="button"
                  className="text-sm font-medium text-blue-600"
                >
                  Edit
                </button>
              </div>

              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">Business Name</dt>
                  <dd className="font-medium text-gray-900">
                    Your Shop Name
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">Business Type</dt>
                  <dd className="font-medium text-gray-900">
                    Mobile Shop
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">Address</dt>
                  <dd className="font-medium text-gray-900">
                    Business Address
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">City</dt>
                  <dd className="font-medium text-gray-900">
                    Lahore
                  </dd>
                </div>
              </dl>
            </section>

            <section className="rounded-lg border p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  Verification Documents
                </h2>

                <button
                  type="button"
                  className="text-sm font-medium text-blue-600"
                >
                  Edit
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <span>Shop Photo</span>
                  <span className="font-medium text-green-600">
                    Uploaded
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <span>Business Card</span>
                  <span className="font-medium text-green-600">
                    Uploaded
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              Your application will be reviewed by Umar Mobile Parts.
              Wholesale pricing will become available only after approval.
            </p>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
          >
            Submit Retailer Application
          </button>
        </div>
      </div>
    </main>
  )
}
