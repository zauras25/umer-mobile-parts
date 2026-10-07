import Link from "next/link";

import { categoryRepository } from "@/lib/cms/repositories/category-repository";

export default async function CategoriesPage() {
  const categories = await categoryRepository.getAll();

  const activeCategories = categories.filter(
    (category) => category.status === "active",
  );

  return (
    <main className="container-site py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          Umar Mobile Parts
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
          Product Categories
        </h1>

        <p className="mt-4 text-gray-600">
          Browse mobile spare parts by category.
        </p>
      </div>

      {activeCategories.length === 0 ? (
        <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="font-bold text-gray-900">
            No categories available
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Categories will appear here once they are published from the admin
            panel.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(category.slug)}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-950 group-hover:text-red-600">
                {category.name}
              </h2>

              {category.description && (
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>
              )}

              <span className="mt-5 inline-flex text-sm font-semibold text-red-600">
                Browse category →
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
