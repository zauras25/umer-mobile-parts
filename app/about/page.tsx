export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <header className="rounded-2xl bg-black px-8 py-12 text-white">
          <p className="text-sm font-medium text-gray-300">
            Umar Mobile Parts
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Trusted Mobile Parts Supplier Since 2017
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">
            Umar Mobile Parts is an established wholesale mobile-parts and
            accessories business based in Lahore, serving retailers,
            mobile shops, repair businesses, and customers across Pakistan.
          </p>
        </header>

        <section className="mt-8 grid gap-6 sm:grid-cols-3">

          <div className="rounded-xl border bg-white p-6">
            <p className="text-3xl font-bold text-gray-900">
              2017
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Business established
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-3xl font-bold text-gray-900">
              Wholesale
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Retailer-focused service
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-3xl font-bold text-gray-900">
              Pakistan
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Nationwide digital reach
            </p>
          </div>

        </section>

        <section className="mt-8 rounded-xl border bg-white p-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Our Business
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Umar Mobile Parts operates from Zam Zam Mall, Lahore and
            specializes in mobile spare parts and accessories. The business
            serves retailers and mobile-related businesses with a focus on
            reliable product discovery, wholesale purchasing, and ongoing
            customer support.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            The website is designed to make purchasing faster and easier
            while maintaining the support and service customers already
            receive through the physical business and WhatsApp.
          </p>
        </section>

        <section className="mt-6 rounded-xl border bg-white p-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            What We Offer
          </h2>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2">

            <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
              Mobile spare parts and accessories
            </li>

            <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
              Wholesale purchasing for verified retailers
            </li>

            <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
              Product warranty and replacement support
            </li>

            <li className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
              Delivery across Pakistan
            </li>

          </ul>
        </section>

        <section className="mt-6 rounded-xl border bg-white p-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Our Approach
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            Our goal is simple: make finding, buying, tracking, and
            reordering mobile parts easier than the traditional manual
            ordering process.
          </p>
        </section>

      </div>
    </main>
  )
}
