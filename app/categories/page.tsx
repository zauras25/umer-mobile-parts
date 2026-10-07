import Link from "next/link";
import { categories } from "@/data/products";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <header>
          <p className="text-sm font-medium text-gray-500">
            Shop
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="mt-2 max-w-2xl text-gray-600">
            Browse mobile parts and accessories by category.
          </p>
        </header>

        <section className="mt-8">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {categories.map((category, index) => (
              <Link
                key={category}
                href={`/shop?category=${encodeURIComponent(category)}`}
                className={[
                  "group rounded-xl border bg-white p-6 transition hover:border-black",
                  index === 0
                    ? "border-2 border-black"
                    : "border-gray-200",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">

                  <div>
                    {index === 0 && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Priority Category
                      </span>
                    )}

                    <h2 className="mt-1 text-lg font-semibold text-gray-900">
                      {category}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Browse products
                    </p>
                  </div>

                  <span className="text-lg text-gray-400 transition group-hover:text-black">
                    →
                  </span>

                </div>
              </Link>
            ))}

          </div>

        </section>

        <section className="mt-10 rounded-xl border bg-white p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Find the right part faster
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Search by model, part name, or product to quickly find the
            mobile part you need.
          </p>

          <Link href="/shop"
            className="mt-5 inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white"
          >
            Browse Shop
          </Link>
        </section>

      </div>
    </main>
  )
}



