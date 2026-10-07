"use client";

import { useMemo, useState } from "react";
import type { CmsPage } from "@/lib/cms/models/types";
import { PageActions, PageEditor } from "@/components/admin/pages/PageEditor";

type Props = {
  initialPages: CmsPage[];
};

export function PageManager({ initialPages }: Props) {
  const [pages] = useState(initialPages);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "draft" | "published">("all");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);

  const filteredPages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pages.filter((page) => {
      const matchesSearch =
        !query ||
        page.title.toLowerCase().includes(query) ||
        page.slug.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || page.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [pages, search, status]);

  function openCreate() {
    setEditingPage(null);
    setEditorOpen(true);
  }

  function openEdit(page: CmsPage) {
    setEditingPage(page);
    setEditorOpen(true);
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
              Pages
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Create and manage website pages, publishing status and SEO
              metadata.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreate}
            className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700"
          >
            + Add New Page
          </button>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search pages by title or slug..."
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
          />

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as "all" | "draft" | "published"
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-rose-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Page
                  </th>
                  <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Slug
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
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <tr
                      key={page.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-5">
                        <p className="font-extrabold text-slate-800">
                          {page.title}
                        </p>
                        <p className="mt-1 max-w-md truncate text-xs text-slate-400">
                          {page.excerpt || "No excerpt"}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <code className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                          {page.slug}
                        </code>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={
                            page.status === "published"
                              ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700"
                              : "inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-700"
                          }
                        >
                          {page.status === "published"
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <PageActions
                          page={page}
                          onEdit={openEdit}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-16 text-center"
                    >
                      <p className="font-extrabold text-slate-700">
                        No pages found
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Try another search or create a new page.
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
        <PageEditor
          page={editingPage}
          onClose={() => setEditorOpen(false)}
        />
      )}
    </>
  );
}
