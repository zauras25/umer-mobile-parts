import Link from "next/link";
export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <section className="rounded-xl border bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
            ✓
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Order Confirmed
          </h1>

          <p className="mt-3 text-gray-600">
            Your order has been successfully placed.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link href="/orders"
              className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
            >
              View Orders
            </Link>

            <Link href="/shop"
              className="rounded-lg border px-5 py-3 text-sm font-medium text-gray-900"
            >
              Continue Shopping
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}


