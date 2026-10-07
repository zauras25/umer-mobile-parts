export default function RetailerRegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">
            Retailer Registration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Create your retailer account
          </h1>

          <p className="mt-2 text-gray-600">
            Complete your account information to start the retailer
            verification process.
          </p>
        </div>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Step 1 of 4</p>
              <p className="text-sm text-gray-500">Account Information</p>
            </div>

            <div className="text-sm text-gray-500">
              25% complete
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="03XX XXXXXXX"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
              <p className="mt-2 text-xs text-gray-500">
                You will receive an OTP on this number.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div className="border-t pt-6">
              <button
                type="button"
                className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
              >
                Continue to Mobile Verification
              </button>
            </div>
          </form>
        </section>

        <p className="mt-6 text-center text-sm text-gray-500">
          Retailer approval is required before wholesale pricing is unlocked.
        </p>
      </div>
    </main>
  )
}
