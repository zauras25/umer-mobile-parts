export default function ReplacementStatusPage() {
  const steps = [
    {
      title: "Request Submitted",
      description: "Your replacement request has been received.",
      status: "completed",
    },
    {
      title: "Under Review",
      description: "Our team is reviewing your request and evidence.",
      status: "current",
    },
    {
      title: "Approved",
      description: "The replacement request will be approved if eligible.",
      status: "upcoming",
    },
    {
      title: "Replacement Processing",
      description: "Your replacement is being prepared.",
      status: "upcoming",
    },
    {
      title: "Completed",
      description: "The replacement process has been completed.",
      status: "upcoming",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <header>
          <p className="text-sm font-medium text-gray-500">
            Support / Replacement
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Replacement Status
          </h1>

          <p className="mt-2 text-gray-600">
            Track the progress of your replacement request.
          </p>
        </header>

        <section className="mt-8 rounded-xl border bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Replacement Request
              </p>

              <h2 className="mt-1 text-lg font-semibold text-gray-900">
                REP-1001
              </h2>
            </div>

            <span className="w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
              Under Review
            </span>

          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-5">
            <p className="font-medium text-gray-900">
              iPhone 13 LCD OLED
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Order #UMP-1001
            </p>

            <p className="mt-3 text-sm text-gray-600">
              Replacement reason: Product is defective
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Request Timeline
          </h2>

          <div className="mt-8 space-y-8">

            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4">

                <div className="flex flex-col items-center">
                  <div
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                      step.status === "completed"
                        ? "bg-green-600 text-white"
                        : step.status === "current"
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-500",
                    ].join(" ")}
                  >
                    {step.status === "completed" ? "✓" : index + 1}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="mt-2 h-10 w-px bg-gray-200" />
                  )}
                </div>

                <div className="pb-2">
                  <h3 className="font-medium text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            If Your Request Is Rejected
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            A rejected replacement request will display the reason provided
            by the review team. Where applicable, the customer can review the
            warranty policy or contact support.
          </p>
        </section>

      </div>
    </main>
  )
}
