import Link from "next/link";

import { productRepository } from "@/lib/cms/repositories/product-repository";

export default async function HomePage() {
  const products = await productRepository.getPublished();

  return (
    <div>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container-site py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Umar Mobile Parts
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Mobile Spare Parts for Customers & Retailers
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              A professional platform for finding mobile spare parts,
              comparing available qualities, and purchasing across Pakistan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Shop Spare Parts
              </Link>

              <Link
                href="/retailer"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:border-red-600 hover:text-red-600"
              >
                Become a Retailer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Catalogue
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-950">
            Latest Products
          </h2>

          <p className="mt-2 text-gray-600">
            Browse our latest published mobile spare parts.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="font-semibold text-gray-900">
              No published products yet.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Products published from the admin panel will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                {product.images[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.name}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-gray-100 text-sm text-gray-400">
                    No image
                  </div>
                )}

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                    {product.brand}
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-gray-950">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {product.partType}
                    {product.model ? ` • ${product.model}` : ""}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-gray-950">
                      Rs. {product.price.toLocaleString()}
                    </span>

                    <Link
                      href={`/shop/${product.slug}`}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:border-red-600 hover:text-red-600"
            >
              View All Products
            </Link>
          </div>
        )}
      </section>

      <section className="container-site py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Wide Product Catalogue",
              text: "A scalable catalogue structure for brands, models, parts and quality versions.",
            },
            {
              title: "Retail & Wholesale",
              text: "Separate customer and approved retailer experiences built into the architecture.",
            },
            {
              title: "Pakistan-wide",
              text: "Designed for delivery, pickup and future nationwide commerce operations.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <h2 className="text-lg font-semibold text-gray-950">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
