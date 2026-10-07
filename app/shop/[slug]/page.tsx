import Link from "next/link";
import { notFound } from "next/navigation";

import { productRepository } from "@/lib/cms/repositories/product-repository";
import { SITE_CONFIG } from "@/lib/constants/site";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await productRepository.getBySlug(slug);

  if (!product || product.status !== "published") {
    notFound();
  }

  const mainImage = product.images[0];

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum, mujhe ${product.name} chahiye. SKU: ${product.sku}. Price: Rs. ${product.price.toLocaleString()}`,
  );

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`;

  return (
    <main className="container-site py-12 sm:py-16">
      <div className="mb-8">
        <Link
          href="/shop"
          className="text-sm font-semibold text-red-600 hover:text-red-700"
        >
          ← Back to Shop
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {mainImage?.url ? (
              <img
                src={mainImage.url}
                alt={mainImage.alt || product.name}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-gray-100 text-sm font-semibold text-gray-400">
                No image available
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <img
                    src={image.url}
                    alt={image.alt || product.name}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            {product.partType || "Mobile Spare Part"}
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.brand && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                {product.brand}
              </span>
            )}

            {product.model && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                {product.model}
              </span>
            )}

            {product.quality && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                {product.quality}
              </span>
            )}

            {product.version && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                {product.version}
              </span>
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-end gap-3">
            <span className="text-3xl font-black text-gray-950">
              Rs. {product.price.toLocaleString()}
            </span>

            {product.compareAtPrice !== undefined &&
              product.compareAtPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  Rs. {product.compareAtPrice.toLocaleString()}
                </span>
              )}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-700 sm:w-auto"
          >
            Order on WhatsApp
          </a>

          {product.description && (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-gray-950">
                Description
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                {product.description}
              </p>
            </section>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                SKU
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {product.sku}
              </p>
            </div>

            {product.warranty && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Warranty
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {product.warranty}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {(product.compatibility.length > 0 ||
        product.features.length > 0 ||
        product.replacementInformation) && (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {product.compatibility.length > 0 && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-950">
                Compatibility
              </h2>

              <ul className="mt-4 space-y-2">
                {product.compatibility.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-6 text-gray-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.features.length > 0 && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-950">
                Features
              </h2>

              <ul className="mt-4 space-y-2">
                {product.features.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-6 text-gray-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.replacementInformation && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-950">
                Replacement Information
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-600">
                {product.replacementInformation}
              </p>
            </section>
          )}
        </div>
      )}

      <div className="mt-10">
        <Link
          href="/shop"
          className="inline-flex rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-red-600 hover:text-red-600"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
