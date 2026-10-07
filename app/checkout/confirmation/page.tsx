import Link from "next/link";
export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-semibold text-gray-900">
          Order Confirmed
        </h1>

        <p className="mt-3 text-gray-500">
          Your order has been successfully placed.
        </p>

        <section className="mt-8 rounded-xl border p-6 text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Order Number</span>
            <strong>UMP-10001</strong>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-gray-500">Payment</span>
            <strong>Cash on Delivery</strong>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-gray-500">Status</span>
            <strong>Order Confirmed</strong>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/orders/UMP-10001"
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white"
          >
            View Order
          </Link>

          <Link href="/shop"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}


