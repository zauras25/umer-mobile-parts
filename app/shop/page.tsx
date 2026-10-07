import Link from "next/link";

import { productRepository } from "@/lib/cms/repositories/product-repository";
import { categoryRepository } from "@/lib/cms/repositories/category-repository";

type ShopPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const params = await searchParams;
  const selectedCategorySlug = params.category?.trim() ?? "";

  const [products, categories] = await Promise.all([
    productRepository.getPublished(),
    categoryRepository.getAll(),
  ]);

  const activeCategories = categories.filter(
    (category) => category.status === "active",
  );

  const selectedCategory = activeCategories.find(
    (category) => category.slug === selectedCategorySlug,
  );

  const filteredProducts = selectedCategory
    ? products.filter((product) => {
        const productPartType = product.partType
          .trim()
          .toLowerCase();

        return (
          productPartType === selectedCategory.name.trim().toLowerCase() ||
          productPartType === selectedCategory.slug
            .trim()
            .toLowerCase()
        );
      })
    : products;

  return (
    <main className="container-site py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Umar Mobile Parts
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
            {selectedCategory
              ? selectedCategory.name
              : "Shop Spare Parts"}
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            {selectedCategory
              ? `Browse ${selectedCategory.name.toLowerCase()} products.`
              : "Browse our published mobile spare parts."}
          </p>
        </div>

        {selectedCategory && (
          <Link
            href="/shop"
            className="inline-flex rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:border-red-600 hover:text-red-600"
          >
            View All Products
          </Link>
        )}
      </div>

      {activeCategories.length > 0 && (
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          <Link
            href="/shop"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              !selectedCategory
                ? "bg-red-600 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:text-red-600"
            }`}
          >
            All Products
          </Link>

          {activeCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(
                category.slug,
              )}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory?.id === category.id
                  ? "bg-red-600 text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <h2 className="text-lg font-bold text-gray-950">
            No products found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {selectedCategory
              ? "There are no published products in this category yet."
              : "Published products will appear here once they are added."}
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {product.images[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  className="h-52 w-full object-cover"
                />
              ) : (
                <div className="flex h-52 items-center justify-center bg-gray-100 text-sm font-semibold text-gray-400">
                  No image
                </div>
              )}

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                  {product.partType || "Mobile Spare Part"}
                </p>

                <h2 className="mt-2 text-lg font-bold text-gray-950">
                  {product.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {product.brand}
                  {product.model ? ` · ${product.model}` : ""}
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
    </main>
  );
}

