import Link from "next/link";

import { productRepository } from "@/lib/cms/repositories/product-repository";
import { ProductActions } from "@/components/admin/products/ProductActions";

export default async function AdminProductsPage() {
  const products = await productRepository.getAll();

  return (
    <main className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-rose-600">
            CMS
          </p>
          <h1 className="text-3xl font-black text-slate-900">
            Products
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage product content, pricing, versions, media and SEO.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-sm font-bold text-white hover:bg-rose-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-bold text-slate-700">
                  Product
                </th>
                <th className="px-5 py-4 font-bold text-slate-700">
                  SKU
                </th>
                <th className="px-5 py-4 font-bold text-slate-700">
                  Brand / Model
                </th>
                <th className="px-5 py-4 font-bold text-slate-700">
                  Quality
                </th>
                <th className="px-5 py-4 font-bold text-slate-700">
                  Price
                </th>
                <th className="px-5 py-4 font-bold text-slate-700">
                  Status
                </th>
                <th className="px-5 py-4 text-right font-bold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-slate-400"
                  >
                    No products yet. Create your first product.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {product.partType}
                      </div>
                    </td>

                    <td className="px-5 py-4 font-mono text-xs text-slate-500">
                      {product.sku}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-700">
                        {product.brand}
                      </div>
                      <div className="text-xs text-slate-400">
                        {product.model}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {product.quality || "â€”"}
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-800">
                      Rs. {product.price.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          product.status === "published"
                            ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
                            : "rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700"
                        }
                      >
                        {product.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <ProductActions
                        productId={product.id}
                        status={product.status}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
