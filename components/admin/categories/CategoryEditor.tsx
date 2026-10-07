"use client";

import { useState } from "react";
import {
  createCategory,
  deleteCategory,
  toggleCategoryStatus,
  updateCategory,
} from "@/app/admin/categories/actions/category-actions";
import type { CmsCategory } from "@/lib/cms/models/types";

type CategoryEditorProps = {
  category?: CmsCategory | null;
  categories: CmsCategory[];
  onClose: () => void;
};

export function CategoryEditor({
  category,
  categories,
  onClose,
}: CategoryEditorProps) {
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [description, setDescription] = useState(
    category?.description ?? ""
  );
  const [parentId, setParentId] = useState(
    category?.parentId ?? ""
  );
  const [sortOrder, setSortOrder] = useState(
    String(category?.sortOrder ?? categories.length + 1)
  );
  const [status, setStatus] = useState<"active" | "inactive">(
    category?.status ?? "active"
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const input = {
      name,
      slug,
      description,
      parentId: parentId || null,
      sortOrder: Number(sortOrder) || 0,
      status,
    };

    try {
      if (category) {
        await updateCategory(category.id, input);
      } else {
        await createCategory(input);
      }

      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
              Category CMS
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-900">
              {category ? "Edit Category" : "Create Category"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
              {error}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Category Name
              </span>
              <input
                value={name}
                onChange={(event) => {
                  const value = event.target.value;
                  setName(value);

                  if (!category) {
                    setSlug(makeSlug(value));
                  }
                }}
                placeholder="Displays / Panels"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Slug
              </span>
              <input
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="displays-panels"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
              />
            </label>
          </div>

          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Description
            </span>
            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={4}
              placeholder="Describe this category..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-3">
            <label>
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Parent Category
              </span>
              <select
                value={parentId}
                onChange={(event) => setParentId(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-rose-500"
              >
                <option value="">No Parent</option>
                {categories
                  .filter((item) => item.id !== category?.id)
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Sort Order
              </span>
              <input
                type="number"
                min="0"
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-500"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Status
              </span>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as "active" | "inactive"
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-rose-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-rose-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-rose-200 hover:bg-rose-700 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : category
                  ? "Save Changes"
                  : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type CategoryActionsProps = {
  category: CmsCategory;
  onEdit: (category: CmsCategory) => void;
};

export function CategoryActions({
  category,
  onEdit,
}: CategoryActionsProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (
      !window.confirm(
        `Delete "${category.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      await deleteCategory(category.id);
      window.location.reload();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to delete category."
      );
      setLoading(false);
    }
  }

  async function handleToggle() {
    setLoading(true);

    try {
      await toggleCategoryStatus(category.id);
      window.location.reload();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to update category."
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <button
        type="button"
        disabled={loading}
        onClick={() => onEdit(category)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
      >
        Edit
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={handleToggle}
        className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-50"
      >
        {category.status === "active" ? "Disable" : "Activate"}
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={handleDelete}
        className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
