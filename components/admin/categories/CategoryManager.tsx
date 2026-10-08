"use client";

import { useMemo, useState } from "react";

import type { CmsCategory } from "@/lib/cms/models/types";
import {
  createCategory,
  deleteCategory,
  toggleCategoryStatus,
  updateCategory,
} from "@/app/admin/categories/actions/category-actions";

type CategoryManagerProps = {
  initialCategories: CmsCategory[];
};

type CategoryForm = {
  name: string;
  slug: string;
  description: string;
  parentId: string;
  sortOrder: string;
  status: "active" | "inactive";
};

const EMPTY_FORM: CategoryForm = {
  name: "",
  slug: "",
  description: "",
  parentId: "",
  sortOrder: "0",
  status: "active",
};

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CategoryManager({
  initialCategories,
}: CategoryManagerProps) {
  const [categories, setCategories] =
    useState<CmsCategory[]>(initialCategories);

  const [form, setForm] =
    useState<CategoryForm>(EMPTY_FORM);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  const sortedCategories = useMemo(
    () =>
      [...categories].sort(
        (a, b) => a.sortOrder - b.sortOrder,
      ),
    [categories],
  );

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError(null);
    setSuccess(null);
  }

  function updateField<K extends keyof CategoryForm>(
    field: K,
    value: CategoryForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug:
        editingId !== null
          ? current.slug
          : makeSlug(value),
    }));
  }

  function startEdit(category: CmsCategory) {
    setEditingId(category.id);

    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parentId ?? "",
      sortOrder: String(category.sortOrder),
      status: category.status,
    });

    setError(null);
    setSuccess(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    const name = form.name.trim();
    const slug = makeSlug(form.slug || name);

    if (!name) {
      setError("Category name is required.");
      return;
    }

    if (!slug) {
      setError("Category slug is required.");
      return;
    }

    const sortOrder = Number(form.sortOrder);

    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      setError("Sort order must be a whole number and cannot be negative.");
      return;
    }

    if (
      form.parentId &&
      form.parentId === editingId
    ) {
      setError("A category cannot be its own parent.");
      return;
    }

    const duplicateSlug = categories.some(
      (category) =>
        category.slug.toLowerCase() === slug.toLowerCase() &&
        category.id !== editingId,
    );

    if (duplicateSlug) {
      setError("This category slug already exists.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name,
        slug,
        description: form.description.trim(),
        parentId: form.parentId || null,
        sortOrder,
        status: form.status,
      };

      if (editingId) {
        const updated = await updateCategory(
          editingId,
          payload,
        );

        setCategories((current) =>
          current.map((category) =>
            category.id === updated.id
              ? updated
              : category,
          ),
        );

        setSuccess("Category updated successfully.");
      } else {
        const created = await createCategory(payload);

        setCategories((current) => [
          ...current,
          created,
        ]);

        setSuccess("Category created successfully.");
      }

      setForm(EMPTY_FORM);
      setEditingId(null);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    category: CmsCategory,
  ) {
    const confirmed = window.confirm(
      `Delete "${category.name}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await deleteCategory(category.id);

      setCategories((current) =>
        current.filter(
          (item) => item.id !== category.id,
        ),
      );

      if (editingId === category.id) {
        resetForm();
      }

      setSuccess("Category deleted successfully.");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete category.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleStatus(
    category: CmsCategory,
  ) {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const updated =
        await toggleCategoryStatus(category.id);

      setCategories((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item,
        ),
      );

      setSuccess(
        updated.status === "active"
          ? "Category activated."
          : "Category deactivated.",
      );
    } catch (toggleError) {
      setError(
        toggleError instanceof Error
          ? toggleError.message
          : "Failed to change category status.",
      );
    } finally {
      setLoading(false);
    }
  }

  function getParentName(parentId: string | null) {
    if (!parentId) {
      return "Top level";
    }

    return (
      categories.find(
        (category) => category.id === parentId,
      )?.name ?? "Unknown"
    );
  }

  const parentOptions = categories.filter(
    (category) => category.id !== editingId,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
            CMS / Categories
          </p>

          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
            Product Categories
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Create, organize and manage the categories used
            throughout the store.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Total Categories
          </p>

          <p className="mt-1 text-2xl font-black text-slate-900">
            {categories.length}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600">
              {editingId ? "Edit Category" : "New Category"}
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              {editingId
                ? "Update category"
                : "Add category"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="category-name"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Category Name
              </label>

              <input
                id="category-name"
                value={form.name}
                onChange={(event) =>
                  handleNameChange(event.target.value)
                }
                placeholder="e.g. iPhone Parts"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div>
              <label
                htmlFor="category-slug"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Slug
              </label>

              <input
                id="category-slug"
                value={form.slug}
                onChange={(event) =>
                  updateField("slug", event.target.value)
                }
                placeholder="iphone-parts"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Used in category URLs.
              </p>
            </div>

            <div>
              <label
                htmlFor="category-description"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Description
              </label>

              <textarea
                id="category-description"
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                rows={4}
                placeholder="Short category description..."
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div>
              <label
                htmlFor="category-parent"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Parent Category
              </label>

              <select
                id="category-parent"
                value={form.parentId}
                onChange={(event) =>
                  updateField(
                    "parentId",
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              >
                <option value="">
                  Top level category
                </option>

                {parentOptions.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category-sort"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Sort Order
                </label>

                <input
                  id="category-sort"
                  type="number"
                  min="0"
                  value={form.sortOrder}
                  onChange={(event) =>
                    updateField(
                      "sortOrder",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              <div>
                <label
                  htmlFor="category-status"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Status
                </label>

                <select
                  id="category-status"
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as
                        | "active"
                        | "inactive",
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Category"
                    : "Create Category"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="font-black text-slate-900">
                All Categories
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Manage your store category structure.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600 transition hover:bg-rose-100"
            >
              + New
            </button>
          </div>

          {sortedCategories.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                📦
              </div>

              <h3 className="mt-4 font-black text-slate-900">
                No categories yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Create your first product category using the form.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                      Parent
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                      Order
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sortedCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">
                          {category.name}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          /{category.slug}
                        </div>

                        {category.description && (
                          <div className="mt-1 max-w-sm truncate text-xs text-slate-500">
                            {category.description}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {getParentName(category.parentId)}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                        {category.sortOrder}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleStatus(category)
                          }
                          disabled={loading}
                          className={
                            category.status === "active"
                              ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
                              : "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500"
                          }
                        >
                          {category.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </button>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              startEdit(category)
                            }
                            disabled={loading}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-white disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(category)
                            }
                            disabled={loading}
                            className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}