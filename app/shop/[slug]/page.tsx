import { notFound } from "next/navigation";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const isOutOfStock = product.stockStatus === "out-of-stock";

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-gray-500">
          Shop / {product.category} / {product.name}
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-gray-100">
            <div className="text-center text-gray-400">
              <div className="mb-3 text-5xl">📱</div>
              <p>Product Image</p>
              <p className="mt-1 text-xs">{product.image}</p>
            </div>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {product.brand}
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
                {product.quality}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  product.stockStatus === "in-stock"
                    ? "bg-green-50 text-green-700"
                    : product.stockStatus === "low-stock"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {product.stockStatus === "in-stock"
                  ? "In Stock"
                  : product.stockStatus === "low-stock"
                  ? "Low Stock"
                  : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <p className="mt-2 text-gray-500">
              Compatible with {product.compatibleModels.join(", ")}
            </p>

            <div className="mt-6 rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Regular Price</p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                Rs. {product.price.toLocaleString()}
              </p>

              {product.wholesalePrice && (
                <div className="mt-4 rounded-xl bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-700">
                    Retailer Price
                  </p>

                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-2xl font-bold text-blue-900">
                      Rs. {product.wholesalePrice.toLocaleString()}
                    </span>

                    {product.discountPercentage && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-blue-700">
                    Wholesale pricing is available to approved retailers.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Model</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {product.model}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Warranty</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {product.warranty}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-900">
                Quantity
              </p>

              <div className="flex h-12 w-36 items-center justify-between rounded-lg border border-gray-300 px-4">
                <button className="text-xl text-gray-600">−</button>
                <span className="font-semibold">1</span>
                <button className="text-xl text-gray-600">+</button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                disabled={isOutOfStock}
                className="flex-1 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>

              {!isOutOfStock && (
                <button className="flex-1 rounded-xl border border-black px-6 py-3 font-semibold text-black transition hover:bg-gray-100">
                  Buy Now
                </button>
              )}
            </div>

            <button className="mt-3 w-full rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50">
              Need help with this product? Chat on WhatsApp
            </button>
          </div>
        </div>

        <section className="mt-14 border-t border-gray-200 pt-10">
          <h2 className="text-xl font-bold text-gray-900">
            Product Information
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="mt-1 font-medium">{product.category}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Brand</p>
              <p className="mt-1 font-medium">{product.brand}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Quality</p>
              <p className="mt-1 font-medium">{product.quality}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Warranty</p>
              <p className="mt-1 font-medium">{product.warranty}</p>
            </div>
          </div>
        </section>

        <section className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-xl font-bold text-gray-900">
            Compatibility
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.compatibleModels.map((model) => (
              <span
                key={model}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm"
              >
                {model}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-xl font-bold text-gray-900">
            Warranty & Replacement
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            This product includes {product.warranty} warranty. Replacement
            eligibility depends on the applicable product or manufacturer
            warranty policy.
          </p>
        </section>
      </div>
    </main>
  );
}
