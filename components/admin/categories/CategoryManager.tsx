"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createCategory,
  deleteCategory,
  toggleCategoryStatus,
  updateCategory,
} from "@/app/admin/categories/actions/category-actions";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

type Props = {
  initialCategories: Category[];
};

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  parentId: "",
  sortOrder: "0",
  status: "active" as "active" | "inactive",
};

export function CategoryManager({ initialCategories }: Props) {
  const router = useRouter();

  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  }

  function startEdit(category: Category) {
    setEditingId(category.id);

    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parentId ?? "",
      sortOrder: String(category.sortOrder),
      status: category.status,
    });

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const input = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      parentId: form.parentId || null,
      sortOrder: Number(form.sortOrder) || 0,
      status: form.status,
    };

    try {
      if (editingId) {
        const updated = await updateCategory(editingId, input);

        setCategories((current) =>
          current.map((category) =>
            category.id === editingId ? updated : category,
          ),
        );

        setMessage("Category updated successfully.");
      } else {
        const created = await createCategory(input);

        setCategories((current) =>
          [...current, created].sort(
            (a, b) => a.sortOrder - b.sortOrder,
          ),
        );

        setMessage("Category created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save category.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await deleteCategory(id);

      setCategories((current) =>
        current.filter((category) => category.id !== id),
      );

      if (editingId === id) {
        setForm(emptyForm);
        setEditingId(null);
      }

      setMessage("Category deleted successfully.");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete category.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(id: string) {
    setLoading(true);
    setMessage("");

    try {
      const updated = await toggleCategoryStatus(id);

      setCategories((current) =>
        current.map((category) =>
          category.id === id ? updated : category,
        ),
      );

      setMessage(
        updated.status === "active"
          ? "Category activated."
          : "Category moved to inactive.",
      );

      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to update category.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-rose-600">
          CMS / Categories
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-950">
              Product Categories
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create and manage the categories used throughout the
              product catalogue.
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-extrabold text-slate-950">
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Category Name
            </label>

            <input
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
              placeholder="Displays / Panels"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Slug
            </label>

            <input
              value={form.slug}
              onChange={(event) =>
                updateField("slug", event.target.value)
              }
              placeholder="displays-panels"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Mobile LCD, LED and display panels."
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Parent Category
            </label>

            <select
              value={form.parentId}
              onChange={(event) =>
                updateField("parentId", event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-500"
            >
              <option value="">No parent category</option>

              {categories
                .filter((category) => category.id !== editingId)
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Display Order
            </label>

            <input
              type="number"
              min="0"
              value={form.sortOrder}
              onChange={(event) =>
                updateField("sortOrder", event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Status
            </label>

            <select
              value={form.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value as "active" | "inactive",
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingId
                ? "Update Category"
                : "Add Category"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          {message && (
            <span className="text-sm font-semibold text-slate-600">
              {message}
            </span>
          )}
        </div>
      </form>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-extrabold text-slate-950">
            Categories
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} configured.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-bold text-slate-900">
              No categories yet.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Add your first product category above.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-slate-950">
                      {category.name}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        category.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {category.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    /{category.slug} · Order {category.sortOrder}
                  </p>

                  {category.description && (
                    <p className="mt-2 max-w-2xl text-sm text-slate-500">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(category)}
                    disabled={loading}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggle(category.id)}
                    disabled={loading}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    {category.status === "active"
                      ? "Set Inactive"
                      : "Set Active"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(category.id)}
                    disabled={loading}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
