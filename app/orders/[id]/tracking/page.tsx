import Link from "next/link";
export default function OrderTrackingPage() {
  const steps = [
    {
      title: "Order Confirmed",
      description: "Your order has been successfully placed.",
      completed: true,
    },
    {
      title: "Processing",
      description: "Your order is being prepared.",
      completed: true,
    },
    {
      title: "Packed",
      description: "Your products have been packed.",
      completed: false,
    },
    {
      title: "Shipped",
      description: "Your order will be handed over to the courier.",
      completed: false,
    },
    {
      title: "Out for Delivery",
      description: "Your order is on the way to you.",
      completed: false,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered.",
      completed: false,
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-10">

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Order Tracking
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Track Order #UMP-1001
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Follow the progress of your order.
          </p>
        </div>

        <section className="rounded-xl border bg-white p-6 sm:p-8">

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4">

                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      step.completed
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {step.completed ? "✓" : index + 1}
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`mt-2 h-12 w-0.5 ${
                        step.completed
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                <div className="pt-1">
                  <h2
                    className={`font-semibold ${
                      step.completed
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-10 border-t pt-6">
            <p className="text-sm text-gray-500">
              Courier Tracking
            </p>

            <p className="mt-2 text-sm text-gray-700">
              Courier tracking information will appear here when
              the order is shipped.
            </p>
          </div>

        </section>

        <div className="mt-6 flex gap-3">
          <Link href="/orders/UMP-1001"
            className="rounded-lg border bg-white px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Order Details
          </Link>

          <Link href="/shop"
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </main>
  )
}



