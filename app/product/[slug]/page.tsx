import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import StockBadge from "@/components/product/StockBadge";
import ProductPurchase from "@/components/product/ProductPurchase";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  /*
   * Products using the same model + category are treated as
   * possible quality/variant alternatives.
   */
  const variants = products.filter(
    (item) =>
      item.model === product.model &&
      item.category === product.category
  );

  const retailerPrice = product.wholesalePrice ?? product.price;

  const retailerSaving =
    product.price > retailerPrice
      ? product.price - retailerPrice
      : 0;

  const retailerSavingPercentage =
    product.price > 0
      ? Math.round((retailerSaving / product.price) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          Shop
          <span className="mx-2">/</span>
          {product.category}
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Main Product */}
        <section className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-5 md:grid-cols-2 md:p-8">

          {/* Image */}
          <div>
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-black bg-gray-100 text-xs text-gray-400">
                Main
              </div>

              <div className="h-16 w-16 rounded-lg border border-gray-200 bg-gray-100" />

              <div className="h-16 w-16 rounded-lg border border-gray-200 bg-gray-100" />
            </div>
          </div>

          {/* Product Information */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  {product.brand}
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                  {product.name}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Model: {product.model}
                </p>
              </div>

              <button
                type="button"
                aria-label="Add to wishlist"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 text-xl hover:bg-gray-50"
              >
                ♡
              </button>
            </div>

            {/* Quality + Stock */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {product.quality}
              </span>

              <StockBadge status={product.stockStatus} />

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                Warranty: {product.warranty}
              </span>
            </div>

            {/* Price Explanation */}
            <div className="mt-7 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Regular Customer Price
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                Rs. {formatPrice(product.price)}
              </p>

              {product.wholesalePrice &&
                product.wholesalePrice < product.price && (
                  <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                          Approved Retailer Price
                        </p>

                        <p className="mt-1 text-2xl font-bold text-green-700">
                          Rs. {formatPrice(retailerPrice)}
                        </p>
                      </div>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        Save {retailerSavingPercentage}%
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-green-800">
                      Approved retailers save Rs.{" "}
                      {formatPrice(retailerSaving)} on this item.
                    </p>

                    <p className="mt-2 text-xs text-green-700">
                      Retailer pricing is available only after account
                      approval.
                    </p>
                  </div>
                )}
            </div>

            {/* Variant / Quality Options */}
            {variants.length > 1 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Available Versions
                  </h2>

                  <span className="text-xs text-gray-500">
                    {variants.length} options
                  </span>
                </div>

                <div className="mt-3 grid gap-2">
                  {variants.map((variant) => {
                    const active = variant.id === product.id;

                    return (
                      <a
                        key={variant.id}
                        href={`/product/${variant.slug}`}
                        className={`flex items-center justify-between rounded-xl border p-4 transition ${
                          active
                            ? "border-black bg-gray-50"
                            : "border-gray-200 bg-white hover:border-gray-400"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {variant.quality}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {variant.name}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            Rs. {formatPrice(variant.price)}
                          </p>

                          <p
                            className={`mt-1 text-xs ${
                              variant.stockStatus === "out-of-stock"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {variant.stockStatus === "out-of-stock"
                              ? "Out of stock"
                              : "Available"}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                  Different versions can have different prices because
                  quality, materials, performance, or warranty coverage may
                  differ. Select the version that matches your requirement.
                </p>
              </div>
            )}

            {/* Compatibility */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-900">
                Compatible Models
              </h2>

              <div className="mt-2 flex flex-wrap gap-2">
                {product.compatibleModels.map((model) => (
                  <span
                    key={model}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase */}
            <ProductPurchase
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                wholesalePrice: product.wholesalePrice,
                stockStatus: product.stockStatus,
              }}
            />

            {/* WhatsApp */}
            <button
              type="button"
              className="mt-3 w-full rounded-xl border border-green-600 px-5 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
            >
              Need help with this product? Chat on WhatsApp
            </button>
          </div>
        </section>

        {/* Product Details */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Product Information
            </h2>

            <div className="mt-5 divide-y divide-gray-100">
              <div className="flex justify-between gap-4 py-3 text-sm">
                <span className="text-gray-500">Brand</span>
                <span className="font-medium text-gray-900">
                  {product.brand}
                </span>
              </div>

              <div className="flex justify-between gap-4 py-3 text-sm">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-gray-900">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between gap-4 py-3 text-sm">
                <span className="text-gray-500">Model</span>
                <span className="font-medium text-gray-900">
                  {product.model}
                </span>
              </div>

              <div className="flex justify-between gap-4 py-3 text-sm">
                <span className="text-gray-500">Quality</span>
                <span className="font-medium text-gray-900">
                  {product.quality}
                </span>
              </div>

              <div className="flex justify-between gap-4 py-3 text-sm">
                <span className="text-gray-500">Warranty</span>
                <span className="font-medium text-gray-900">
                  {product.warranty}
                </span>
              </div>
            </div>
          </div>

          {/* Compatibility / Warranty */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Compatibility & Warranty
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Please confirm the mobile model and product compatibility
              before placing your order.
            </p>

            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-900">
                Warranty
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                This product includes {product.warranty} warranty.
                Replacement eligibility depends on the applicable
                product/company warranty policy.
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-900">
                Before ordering
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Check the model, quality/version, compatibility and
                warranty conditions before adding the item to your cart.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

