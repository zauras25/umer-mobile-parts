"use client";

import { useMemo, useState } from "react";
import type { CmsFaq } from "@/lib/cms/models/types";
import {
  createFaq,
  deleteFaq,
  toggleFaqStatus,
  updateFaq,
  type FaqInput,
} from "@/app/admin/faqs/actions/faq-actions";

type Props = {
  initialFaqs: CmsFaq[];
};

const emptyForm: FaqInput = {
  question: "",
  answer: "",
  sortOrder: 1,
  status: "active",
};

export function FaqManager({ initialFaqs }: Props) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<CmsFaq | null>(null);
  const [form, setForm] = useState<FaqInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqs.filter(
      (faq) =>
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query),
    );
  }, [faqs, search]);

  function newFaq() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
  }

  function editFaq(faq: CmsFaq) {
    setEditing(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sortOrder,
      status: faq.status,
    });
    setError("");
  }

  function field<K extends keyof FaqInput>(
    key: K,
    value: FaqInput[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function save() {
    setSaving(true);
    setError("");

    try {
      if (editing) {
        const result = await updateFaq(editing.id, form);

        if (result.success) {
          setFaqs((items) =>
            items.map((item) =>
              item.id === editing.id ? result.faq : item,
            ),
          );
        }
      } else {
        const result = await createFaq(form);

        if (result.success) {
          setFaqs((items) => [...items, result.faq]);
          setEditing(result.faq);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save FAQ.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this FAQ?")) {
      return;
    }

    try {
      await deleteFaq(id);
      setFaqs((items) => items.filter((item) => item.id !== id));

      if (editing?.id === id) {
        newFaq();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete FAQ.",
      );
    }
  }

  async function toggle(id: string) {
    try {
      const result = await toggleFaqStatus(id);

      if (result.success) {
        setFaqs((items) =>
          items.map((item) =>
            item.id === id ? result.faq : item,
          ),
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update status.",
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
            Content Management
          </p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">
            FAQs
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage customer questions and answers.
          </p>
        </div>

        <button
          type="button"
          onClick={newFaq}
          className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-rose-700"
        >
          + New FAQ
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_450px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          <div className="border-b border-slate-200 p-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-sm text-slate-400">
                No FAQs yet.
              </div>
            ) : (
              filtered.map((faq) => (
                <div key={faq.id} className="p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <p className="font-extrabold text-slate-900">
                        {faq.question}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {faq.answer}
                      </p>

                      <div className="mt-3 flex gap-2">
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                          Order {faq.sortOrder}
                        </span>

                        <span
                          className={
                            faq.status === "active"
                              ? "rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700"
                              : "rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700"
                          }
                        >
                          {faq.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => editFaq(faq)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => toggle(faq.id)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                      >
                        {faq.status === "active"
                          ? "Disable"
                          : "Enable"}
                      </button>

                      <button
                        type="button"
                        onClick={() => remove(faq.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-extrabold text-slate-900">
            {editing ? "Edit FAQ" : "New FAQ"}
          </h2>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-slate-700">
                Question
              </span>
              <input
                value={form.question}
                onChange={(e) => field("question", e.target.value)}
                placeholder="Do you deliver across Pakistan?"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-slate-700">
                Answer
              </span>
              <textarea
                rows={7}
                value={form.answer}
                onChange={(e) => field("answer", e.target.value)}
                placeholder="Write the customer-facing answer..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-500"
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
                  field("sortOrder", Number(e.target.value))
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
                  field(
                    "status",
                    e.target.value as FaqInput["status"],
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
                {saving ? "Saving..." : "Save FAQ"}
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={newFaq}
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
