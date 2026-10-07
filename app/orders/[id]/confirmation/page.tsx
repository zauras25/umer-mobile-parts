import Link from "next/link";
export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <section className="rounded-xl border bg-white p-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
            ✓
          </div>

          <p className="mt-6 text-sm font-medium text-green-600">
            Order Confirmed
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Thank you for your order
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Your order has been successfully placed. We will process your
            order and keep you updated about its delivery status.
          </p>

          <div className="mt-8 rounded-lg bg-gray-50 p-5 text-left">
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-500">Order Number</span>
              <span className="font-semibold">UMP-1001</span>
            </div>

            <div className="flex justify-between border-b py-4">
              <span className="text-gray-500">Delivery Method</span>
              <span className="font-medium">Normal Delivery</span>
            </div>

            <div className="flex justify-between border-b py-4">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>

            <div className="flex justify-between pt-4">
              <span className="text-gray-500">Total</span>
              <span className="font-bold">Rs. 9,600</span>
            </div>
          </div>

          <div className="mt-8 rounded-lg border p-5 text-left">
            <p className="text-sm text-gray-500">
              Delivery Address
            </p>

            <p className="mt-2 font-medium text-gray-900">
              Customer Address
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Lahore, Pakistan
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/orders/UMP-1001"
              className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              View Order
            </Link>

            <Link href="/orders/UMP-1001/tracking"
              className="rounded-lg border px-6 py-3 font-medium text-gray-900 hover:bg-gray-50"
            >
              Track Order
            </Link>
          </div>

          <Link href="/shop"
            className="mt-6 inline-block text-sm text-gray-600 hover:underline"
          >
            Continue Shopping
          </Link>

        </section>
      </div>
    </main>
  )
}



