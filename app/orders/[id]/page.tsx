import Link from "next/link";
export default function OrderDetailPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="mb-8">
          <p className="text-sm text-gray-500">Order Details</p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #UMP-1001
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Placed on October 6, 2026
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Processing
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

          <div className="space-y-6">

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Products
              </h2>

              <div className="mt-5 divide-y">

                <div className="flex gap-4 py-5 first:pt-0">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                    Product Image
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      iPhone 13 LCD OLED
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quality: OEM
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: 1
                    </p>
                  </div>

                  <p className="font-medium text-gray-900">
                    Rs. 4,000
                  </p>
                </div>

                <div className="flex gap-4 py-5 last:pb-0">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                    Product Image
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      iPhone 13 Battery
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quality: OEM
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: 2
                    </p>
                  </div>

                  <p className="font-medium text-gray-900">
                    Rs. 5,600
                  </p>
                </div>

              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Delivery Information
              </h2>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">
                    Delivery Address
                  </p>

                  <p className="mt-2 font-medium">
                    Customer Address
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Lahore, Pakistan
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Delivery Method
                  </p>

                  <p className="mt-2 font-medium">
                    Normal Delivery
                  </p>
                </div>

              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Payment Information
              </h2>

              <div className="mt-5 flex justify-between">
                <span className="text-gray-500">
                  Payment Method
                </span>

                <span className="font-medium">
                  Cash on Delivery
                </span>
              </div>
            </section>

          </div>

          <aside className="h-fit space-y-6">

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    Rs. 9,600
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span>
                    Calculated
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>Rs. 9,600</span>
                  </div>
                </div>

              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Actions
              </h2>

              <Link href="/orders/UMP-1001/tracking"
                className="mt-5 block rounded-lg bg-black px-5 py-3 text-center font-medium text-white hover:bg-gray-800"
              >
                Track Order
              </Link>

              <button
                type="button"
                className="mt-3 w-full rounded-lg border px-5 py-3 font-medium text-gray-900 hover:bg-gray-50"
              >
                Buy Again
              </button>
            </section>

          </aside>

        </div>
      </div>
    </main>
  )
}



