export default function RetailerBusinessPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-blue-600">
            Step 3 of 4
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Business Information
          </h1>

          <p className="mt-2 text-gray-600">
            Tell us about your shop or mobile-parts business.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Shop / Business Name
              </label>
              <input
                type="text"
                placeholder="Enter shop or business name"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Type
              </label>
              <select className="mt-2 w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500">
                <option value="">Select business type</option>
                <option>Mobile Shop</option>
                <option>Mobile Repair Business</option>
                <option>Mobile Parts Retailer</option>
                <option>Electronics Business</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Address
              </label>
              <textarea
                rows={3}
                placeholder="Enter complete business address"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                placeholder="Enter city"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              Continue
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Your business information will be reviewed as part of retailer
            verification.
          </p>
        </div>
      </div>
    </main>
  )
}
