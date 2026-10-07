export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-600">
            Create an account to manage orders, wishlist and addresses.
          </p>
        </div>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <form className="space-y-5">

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

            <button
              type="button"
              className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              Create Account
            </button>

          </form>

          <div className="mt-6 border-t pt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span className="font-medium text-blue-600">
                Sign In
              </span>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
