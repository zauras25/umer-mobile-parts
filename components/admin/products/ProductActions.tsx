"use client";

import Link from "next/link";
import { useState } from "react";

import {
  deleteProduct,
  toggleProductStatus,
} from "@/app/admin/products/actions/product-actions";

type ProductActionsProps = {
  productId: string;
  status: "draft" | "published";
};

export function ProductActions({
  productId,
  status,
}: ProductActionsProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    setMessage("");

    const result = await toggleProductStatus(productId);

    setMessage(
      result.success
        ? "Updated"
        : result.error ?? "Unable to update",
    );

    setLoading(false);

    if (result.success) {
      window.location.reload();
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setMessage("");

    const result = await deleteProduct(productId);

    if (result.success) {
      window.location.reload();
      return;
    }

    setMessage(result.error ?? "Unable to delete");
    setLoading(false);
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Link
        href={`/admin/products/${productId}`}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
      >
        Edit
      </Link>

      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={
          status === "published"
            ? "rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
            : "rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        {loading
          ? "..."
          : status === "published"
            ? "Set Draft"
            : "Publish"}
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Delete
      </button>

      {message && (
        <span className="w-full text-xs font-semibold text-slate-500">
          {message}
        </span>
      )}
    </div>
  );
}