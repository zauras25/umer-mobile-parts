"use client";

import { useMemo, useState } from "react";
import type { CmsBanner } from "@/lib/cms/models/types";
import {
  createBanner,
  deleteBanner,
  toggleBannerStatus,
  updateBanner,
  type BannerInput,
} from "@/app/admin/banners/actions/banner-actions";

type Props = {
  initialBanners: CmsBanner[];
};

const emptyForm: BannerInput = {
  title: "",
  image: "",
  link: "/shop",
  sortOrder: 1,
  status: "active",
};

export function BannerManager({ initialBanners }: Props) {
  const [banners, setBanners] = useState(initialBanners);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<CmsBanner | null>(null);
  const [form, setForm] = useState<BannerInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return banners.filter(
      (banner) =>
        !query ||
        banner.title.toLowerCase().includes(query) ||
        banner.link.toLowerCase().includes(query),
    );
  }, [banners, search]);

  function startCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
  }

  function startEdit(banner: CmsBanner) {
    setEditing(banner);
    setForm({
      title: banner.title,
      image: banner.image,
      link: banner.link,
      sortOrder: banner.sortOrder,
      status: banner.status,
    });
    setError("");
  }

  async function save() {
    setSaving(true);
    setError("");

    try {
      if (editing) {
        const result = await updateBanner(editing.id, form);

        if (result.success) {
          setBanners((items) =>
            items.map((item) =>
              item.id === editing.id ? result.banner : item,
            ),
          );
        }
      } else {
        const result = await createBanner(form);

        if (result.success) {
          setBanners((items) => [...items, result.banner]);
          setEditing(result.banner);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save banner.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this banner?")) {
      return;
    }

    try {
      await deleteBanner(id);
      setBanners((items) => items.filter((item) => item.id !== id));

      if (editing?.id === id) {
        startCreate();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete banner.",
      );
    }
  }

  async function toggle(id: string) {
    try {
      const result = await toggleBannerStatus(id);

      if (result.success) {
        setBanners((items) =>
          items.map((item) =>
            item.id === id ? result.banner : item,
          ),
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update status.",
      );
    }
  }

  function updateField<K extends keyof BannerInput>(
    key: K,
    value: BannerInput[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
            Content Management
          </p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">
            Banners
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage homepage promotional banners.
          </p>
        </div>

        <button
          type="button"
          onClick={startCreate}
          className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-rose-700"
        >
          + New Banner
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          <div className="border-b border-slate-200 p-4">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search banners..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-sm text-slate-400">
                No banners yet.
              </div>
            ) : (
              filtered.map((banner) => (
                <div
                  key={banner.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-extrabold text-slate-900">
                      {banner.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-400">
                      {banner.image}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                        Order {banner.sortOrder}
                      </span>
                      <span
                        className={
                          banner.status === "active"
                            ? "rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700"
                            : "rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700"
                        }
                      >
                        {banner.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(banner)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => toggle(banner.id)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      {banner.status === "active"
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      type="button"
                      onClick={() => remove(banner.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-extrabold text-slate-900">
            {editing ? "Edit Banner" : "New Banner"}
          </h2>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-slate-700">
                Banner Title
              </span>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Summer Parts Sale"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-slate-700">
                Image URL
              </span>
              <input
                value={form.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="/images/banner.webp"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-slate-700">
                Destination URL
              </span>
              <input
                value={form.link}
                onChange={(e) => updateField("link", e.target.value)}
                placeholder="/shop"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-slate-700">
                Display Order
              </span>
              <input
                type="number"
                min="0"
                value={form.sortOrder}
                onChange={(e) =>
                  updateField("sortOrder", Number(e.target.value))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-slate-700">
                Status
              </span>
              <select
                value={form.status}
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value as BannerInput["status"],
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={save}
                className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Banner"}
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={startCreate}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-extrabold text-slate-700"
                >
                  New
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
