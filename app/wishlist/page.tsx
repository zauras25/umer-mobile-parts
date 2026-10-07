import Link from "next/link";
export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <header>
          <p className="text-sm font-medium text-gray-500">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Wishlist
          </h1>

          <p className="mt-2 text-gray-600">
            Products you have saved for later.
          </p>
        </header>

        <section className="mt-8 rounded-xl border bg-white p-10 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">♡</span>
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Save products you are interested in and come back to them
              whenever you are ready to buy.
            </p>

            <Link href="/shop"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Browse Products
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Wishlist Rules
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>
              • Wishlist requires an authenticated account.
            </li>
            <li>
              • Guest users must sign in to save products.
            </li>
            <li>
              • Pricing follows the current customer account state.
            </li>
            <li>
              • Approved retailers see their applicable wholesale pricing.
            </li>
          </ul>
        </section>

      </div>
    </main>
  )
}


