"use client";

import { useMemo, useState } from "react";
import type { CmsCategory } from "@/lib/cms/models/types";
import {
  CategoryActions,
  CategoryEditor,
} from "@/components/admin/categories/CategoryEditor";

type Props = {
  initialCategories: CmsCategory[];
};

export function CategoryManager({
  initialCategories,
}: Props) {
  const [categories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CmsCategory | null>(null);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || category.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, status]);

  function openCreate() {
    setEditingCategory(null);
    setEditorOpen(true);
  }

  function openEdit(category: CmsCategory) {
    setEditingCategory(category);
    setEditorOpen(true);
  }

  function getParentName(parentId: string | null) {
    if (!parentId) {
      return "Top Level";
    }

    return (
      categories.find((category) => category.id === parentId)?.name ??
      "Unknown"
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
              Content Management
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
              Categories
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage the product category structure used across
              the Umar Mobile Parts catalogue.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreate}
            className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700"
          >
            + Add Category
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total
            </p>
            <p className="mt-2 text-3xl font-black text-slate-900">
              {categories.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active
            </p>
            <p className="mt-2 text-3xl font-black text-emerald-600">
              {
                categories.filter(
                  (category) => category.status === "active"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Inactive
            </p>
            <p className="mt-2 text-3xl font-black text-amber-600">
              {
                categories.filter(
                  (category) => category.status === "inactive"
                ).length
              }
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search category by name or slug..."
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
          />

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | "all"
                  | "active"
                  | "inactive"
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-rose-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Parent
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Order
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-5">
                        <p className="font-extrabold text-slate-800">
                          {category.name}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <code className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
                            {category.slug}
                          </code>

                          {category.description && (
                            <span className="max-w-sm truncate text-xs text-slate-400">
                              {category.description}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm font-semibold text-slate-500">
                        {getParentName(category.parentId)}
                      </td>

                      <td className="px-5 py-5">
                        <span className="inline-flex min-w-9 justify-center rounded-lg bg-slate-100 px-2 py-1 text-xs font-extrabold text-slate-600">
                          {category.sortOrder}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={
                            category.status === "active"
                              ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700"
                              : "inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-700"
                          }
                        >
                          {category.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <CategoryActions
                          category={category}
                          onEdit={openEdit}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-16 text-center"
                    >
                      <p className="font-extrabold text-slate-700">
                        No categories found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Try another search or create a new category.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editorOpen && (
        <CategoryEditor
          category={editingCategory}
          categories={categories}
          onClose={() => setEditorOpen(false)}
        />
      )}
    </>
  );
}
