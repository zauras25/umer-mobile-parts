"use client";

import { useState } from "react";
import {
  createPage,
  deletePage,
  togglePageStatus,
  updatePage,
} from "@/app/admin/pages/actions/page-actions";
import type { CmsPage } from "@/lib/cms/models/types";

type PageEditorProps = {
  page?: CmsPage | null;
  onClose: () => void;
};

export function PageEditor({ page, onClose }: PageEditorProps) {
  const [title, setTitle] = useState(page?.title ?? "");
  const [slug, setSlug] = useState(page?.slug ?? "");
  const [excerpt, setExcerpt] = useState(page?.excerpt ?? "");
  const [content, setContent] = useState(page?.content ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    page?.status ?? "draft"
  );
  const [seoTitle, setSeoTitle] = useState(page?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    page?.seoDescription ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const input = {
        title,
        slug,
        excerpt,
        content,
        status,
        seoTitle,
        seoDescription,
      };

      if (page) {
        const formData = new FormData();
        formData.set("id", page.id);
        Object.entries(input).forEach(([key, value]) =>
          formData.set(key, String(value)),
        );
        await updatePage(formData);
      } else {
        const formData = new FormData();
        Object.entries(input).forEach(([key, value]) =>
          formData.set(key, String(value)),
        );
        await createPage(formData);
      }

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-rose-600">
              CMS Page
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              {page ? "Edit Page" : "Create New Page"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Page Title
              </span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="About Umar Mobile Parts"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Slug
              </span>
              <input
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="/about"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Excerpt
            </span>
            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="Short summary of this page..."
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Page Content
            </span>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write page content here..."
              rows={12}
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
            />
          </label>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4">
              <p className="text-sm font-extrabold text-slate-900">
                Search Engine Optimization
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Control how this page can appear in search engines.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  SEO Title
                </span>
                <input
                  value={seoTitle}
                  onChange={(event) => setSeoTitle(event.target.value)}
                  placeholder="Page title for Google"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  SEO Description
                </span>
                <textarea
                  value={seoDescription}
                  onChange={(event) => setSeoDescription(event.target.value)}
                  placeholder="Short search engine description..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Publishing Status
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Draft pages remain unpublished.
              </p>
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as "draft" | "published")
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-rose-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-rose-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : page ? "Save Changes" : "Create Page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type PageActionsProps = {
  page: CmsPage;
  onEdit: (page: CmsPage) => void;
};

export function PageActions({ page, onEdit }: PageActionsProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${page.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("id", page.id);
      await deletePage(formData);
      window.location.reload();
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to delete page."
      );
      setLoading(false);
    }
  }

  async function handleToggleStatus() {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("id", page.id);
      await togglePageStatus(formData);
      window.location.reload();
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to update status."
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        disabled={loading}
        onClick={() => onEdit(page)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
      >
        Edit
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={handleToggleStatus}
        className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-50"
      >
        {page.status === "published" ? "Draft" : "Publish"}
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
