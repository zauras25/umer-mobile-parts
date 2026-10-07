'use client';

import { useMemo, useState } from "react";
import { categories, products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [quality, setQuality] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sort, setSort] = useState("default");

  const brands = Array.from(new Set(products.map((product) => product.brand)));
  const qualities = Array.from(
    new Set(products.map((product) => product.quality))
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];
    const searchValue = search.toLowerCase().trim();

    if (searchValue) {
      result = result.filter((product) =>
        [
          product.name,
          product.brand,
          product.model,
          product.category,
          product.quality,
          ...product.compatibleModels,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue)
      );
    }

    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    if (brand !== "All") {
      result = result.filter((product) => product.brand === brand);
    }

    if (quality !== "All") {
      result = result.filter((product) => product.quality === quality);
    }

    if (availability !== "All") {
      result = result.filter(
        (product) => product.stockStatus === availability
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, brand, quality, availability, sort]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setQuality("All");
    setAvailability("All");
    setSort("default");
  }

  const hasFilters =
    search ||
    category !== "All" ||
    brand !== "All" ||
    quality !== "All" ||
    availability !== "All";

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-gray-500">
            Umar Mobile Parts
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
            Find Mobile Spare Parts
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Search by model, brand, part type or quality.
          </p>

          <div className="mt-6">
            <label htmlFor="product-search" className="sr-only">
              Search spare parts
            </label>

            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search e.g. A15, Samsung A15 LCD, iPhone 13 battery..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {search.trim() && (
            <p className="mt-3 text-sm text-gray-500">
              Search results for{" "}
              <span className="font-medium text-gray-900">
                &quot;{search.trim()}&quot;
              </span>
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Filters</h2>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-medium text-gray-600 hover:text-black hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="mt-6">
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Part Type
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              >
                <option value="All">All Part Types</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="brand"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Brand
              </label>

              <select
                id="brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              >
                <option value="All">All Brands</option>
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="quality"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Quality
              </label>

              <select
                id="quality"
                value={quality}
                onChange={(event) => setQuality(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              >
                <option value="All">All Qualities</option>
                {qualities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="availability"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Availability
              </label>

              <select
                id="availability"
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              >
                <option value="All">All</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </aside>

          <section>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                products found
              </p>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                aria-label="Sort products"
              >
                <option value="default">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="rounded-xl border bg-white px-6 py-16 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  No matching product found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  We could not find this spare part in the current catalogue.
                  Try another model, part type or quality.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}




