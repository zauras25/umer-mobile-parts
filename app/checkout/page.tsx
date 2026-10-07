import Link from "next/link";
export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm text-gray-500">Checkout</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Complete Your Order
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                1. Contact Information
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-lg border px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="rounded-lg border px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-lg border px-4 py-3 outline-none focus:border-black sm:col-span-2"
                />
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                2. Delivery Address
              </h2>

              <div className="mt-5 space-y-4">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="City"
                    className="rounded-lg border px-4 py-3 outline-none focus:border-black"
                  />

                  <input
                    type="text"
                    placeholder="Area / Town"
                    className="rounded-lg border px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                3. Delivery Method
              </h2>

              <div className="mt-5 space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Same-day Rider</p>
                    <p className="text-sm text-gray-500">
                      Available for Lahore
                    </p>
                  </div>

                  <input type="radio" name="delivery" />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Normal Delivery</p>
                    <p className="text-sm text-gray-500">
                      Standard delivery service
                    </p>
                  </div>

                  <input type="radio" name="delivery" />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Courier Delivery</p>
                    <p className="text-sm text-gray-500">
                      Available for other cities
                    </p>
                  </div>

                  <input type="radio" name="delivery" />
                </label>
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                4. Payment Method
              </h2>

              <div className="mt-5 space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <span className="font-medium">Cash on Delivery</span>
                  <input type="radio" name="payment" />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <span className="font-medium">Bank Transfer</span>
                  <input type="radio" name="payment" />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <span className="font-medium">JazzCash</span>
                  <input type="radio" name="payment" />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <span className="font-medium">Easypaisa</span>
                  <input type="radio" name="payment" />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <span className="font-medium">
                    Online Payment Gateway
                  </span>
                  <input type="radio" name="payment" />
                </label>
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                5. Order Review
              </h2>

              <div className="mt-5 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between">
                  <span>iPhone 13 LCD OLED × 1</span>
                  <span>Rs. 4,000</span>
                </div>

                <div className="mt-3 flex justify-between">
                  <span>iPhone 13 Battery × 2</span>
                  <span>Rs. 5,600</span>
                </div>

                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rs. 9,600</span>
                  </div>
                </div>
              </div>
            </section>

          </div>

          <aside className="h-fit rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>Rs. 9,600</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span>Calculated</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rs. 9,600</span>
                </div>
              </div>
            </div>

            <Link href="/orders/UMP-1001/confirmation"
              className="mt-6 block rounded-lg bg-black px-5 py-3 text-center font-medium text-white hover:bg-gray-800"
            >
              Place Order
            </Link>

            <Link href="/cart"
              className="mt-3 block text-center text-sm text-gray-600 hover:underline"
            >
              Back to Cart
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}


