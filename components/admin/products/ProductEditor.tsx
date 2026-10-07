"use client";

import { useState } from "react";

import {
  createProduct,
  deleteProduct,
  toggleProductStatus,
  updateProduct,
} from "@/app/admin/products/actions/product-actions";

import type {
  CmsProduct,
  CmsProductImage,
  CmsProductStatus,
} from "@/lib/cms/models/product-types";

type ProductEditorProps = {
  product?: CmsProduct;
};

const emptyImage: CmsProductImage = {
  id: "",
  url: "",
  alt: "",
  sortOrder: 0,
};

const initialProduct = {
  name: "",
  slug: "",
  sku: "",
  brand: "",
  model: "",
  partType: "",
  quality: "",
  version: "",
  description: "",
  compatibility: "",
  features: "",
  imageUrl: "",
  imageAlt: "",
  warranty: "",
  replacementInformation: "",
  price: "0",
  compareAtPrice: "",
  status: "draft" as CmsProductStatus,
  seoTitle: "",
  seoDescription: "",
};

export function ProductEditor({ product }: ProductEditorProps) {
  const [form, setForm] = useState({
    name: product?.name ?? initialProduct.name,
    slug: product?.slug ?? initialProduct.slug,
    sku: product?.sku ?? initialProduct.sku,
    brand: product?.brand ?? initialProduct.brand,
    model: product?.model ?? initialProduct.model,
    partType: product?.partType ?? initialProduct.partType,
    quality: product?.quality ?? initialProduct.quality,
    version: product?.version ?? initialProduct.version,
    description: product?.description ?? initialProduct.description,
    compatibility:
      product?.compatibility.join(", ") ?? initialProduct.compatibility,
    features:
      product?.features.join(", ") ?? initialProduct.features,
    imageUrl: product?.images[0]?.url ?? initialProduct.imageUrl,
    imageAlt: product?.images[0]?.alt ?? initialProduct.imageAlt,
    warranty: product?.warranty ?? initialProduct.warranty,
    replacementInformation:
      product?.replacementInformation ??
      initialProduct.replacementInformation,
    price: String(product?.price ?? initialProduct.price),
    compareAtPrice:
      product?.compareAtPrice !== undefined
        ? String(product.compareAtPrice)
        : initialProduct.compareAtPrice,
    status: product?.status ?? initialProduct.status,
    seoTitle: product?.seoTitle ?? initialProduct.seoTitle,
    seoDescription:
      product?.seoDescription ?? initialProduct.seoDescription,
  });

  const [message, setMessage] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    const images = form.imageUrl.trim()
      ? [
          {
            ...emptyImage,
            id: product?.images[0]?.id ?? crypto.randomUUID(),
            url: form.imageUrl.trim(),
            alt: form.imageAlt.trim(),
          },
        ]
      : [];

    const input = {
      name: form.name,
      slug: form.slug,
      sku: form.sku,
      brand: form.brand,
      model: form.model,
      partType: form.partType,
      quality: form.quality,
      version: form.version,
      description: form.description,
      compatibility: form.compatibility
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      features: form.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      images,
      warranty: form.warranty,
      replacementInformation: form.replacementInformation,
      price: Number(form.price) || 0,
      compareAtPrice: form.compareAtPrice
        ? Number(form.compareAtPrice)
        : undefined,
      status: form.status,
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
    };

    const result = product
      ? await updateProduct(product.id, input)
      : await createProduct(input);

    setMessage(
      result.success
        ? "Product saved successfully."
        : result.error ?? "Unable to save product.",
    );
  }

  async function handleDelete() {
    if (!product) {
      return;
    }

    const result = await deleteProduct(product.id);

    setMessage(
      result.success
        ? "Product deleted successfully."
        : result.error ?? "Unable to delete product.",
    );
  }

  async function handleToggleStatus() {
    if (!product) {
      return;
    }

    const result = await toggleProductStatus(product.id);

    setMessage(
      result.success
        ? "Product status updated."
        : result.error ?? "Unable to update status.",
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Product Information
          </h2>

          <div className="grid gap-4">
            <input
              className={inputClass}
              placeholder="Product name"
              value={form.name}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                placeholder="SKU"
                value={form.sku}
                onChange={(e) =>
                  updateField("sku", e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="Slug"
                value={form.slug}
                onChange={(e) =>
                  updateField("slug", e.target.value)
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Brand"
                value={form.brand}
                onChange={(e) =>
                  updateField("brand", e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="Model"
                value={form.model}
                onChange={(e) =>
                  updateField("model", e.target.value)
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Part Type e.g. Display"
                value={form.partType}
                onChange={(e) =>
                  updateField("partType", e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="Quality e.g. Premium"
                value={form.quality}
                onChange={(e) =>
                  updateField("quality", e.target.value)
                }
              />
            </div>

            <input
              className={inputClass}
              placeholder="Version"
              value={form.version}
              onChange={(e) =>
                updateField("version", e.target.value)
              }
            />

            <textarea
              className={`${inputClass} min-h-32`}
              placeholder="Product description"
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
            />

            <input
              className={inputClass}
              placeholder="Compatibility — comma separated"
              value={form.compatibility}
              onChange={(e) =>
                updateField("compatibility", e.target.value)
              }
            />

            <input
              className={inputClass}
              placeholder="Features — comma separated"
              value={form.features}
              onChange={(e) =>
                updateField("features", e.target.value)
              }
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Pricing & Media
          </h2>

          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                type="number"
                min="0"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  updateField("price", e.target.value)
                }
              />

              <input
                className={inputClass}
                type="number"
                min="0"
                placeholder="Compare at price"
                value={form.compareAtPrice}
                onChange={(e) =>
                  updateField("compareAtPrice", e.target.value)
                }
              />
            </div>

            <select
              className={inputClass}
              value={form.status}
              onChange={(e) =>
                updateField(
                  "status",
                  e.target.value as CmsProductStatus,
                )
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <input
              className={inputClass}
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) =>
                updateField("imageUrl", e.target.value)
              }
            />

            <input
              className={inputClass}
              placeholder="Image alt text"
              value={form.imageAlt}
              onChange={(e) =>
                updateField("imageAlt", e.target.value)
              }
            />

            <textarea
              className={`${inputClass} min-h-24`}
              placeholder="Warranty information"
              value={form.warranty}
              onChange={(e) =>
                updateField("warranty", e.target.value)
              }
            />

            <textarea
              className={`${inputClass} min-h-24`}
              placeholder="Replacement information"
              value={form.replacementInformation}
              onChange={(e) =>
                updateField(
                  "replacementInformation",
                  e.target.value,
                )
              }
            />
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          SEO
        </h2>

        <div className="grid gap-4">
          <input
            className={inputClass}
            placeholder="SEO title"
            value={form.seoTitle}
            onChange={(e) =>
              updateField("seoTitle", e.target.value)
            }
          />

          <textarea
            className={`${inputClass} min-h-24`}
            placeholder="SEO description"
            value={form.seoDescription}
            onChange={(e) =>
              updateField("seoDescription", e.target.value)
            }
          />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700"
        >
          {product ? "Update Product" : "Create Product"}
        </button>

        {product && (
          <>
            <button
              type="button"
              onClick={handleToggleStatus}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Toggle Status
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-bold text-red-600 hover:bg-red-100"
            >
              Delete
            </button>
          </>
        )}

        {message && (
          <span className="text-sm font-semibold text-slate-600">
            {message}
          </span>
        )}
      </div>
    </form>
  );
}
