"use client";

import { useState } from "react";

import { updateFooter } from "@/app/admin/footer/actions";
import type { CmsFooter } from "@/lib/cms/models/footer-types";

type Props = {
  initialFooter: CmsFooter;
};

export function FooterEditor({ initialFooter }: Props) {
  const [form, setForm] = useState({
    businessName: initialFooter.businessName,
    description: initialFooter.description,
    address: initialFooter.address,
    whatsapp: initialFooter.whatsapp,
    businessHours: initialFooter.businessHours,
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

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
    setSaving(true);
    setMessage("");

    const result = await updateFooter(form);

    if (!result.success) {
      setMessage(result.error ?? "Unable to save footer.");
      setSaving(false);
      return;
    }

    setMessage("Footer saved successfully.");
    setSaving(false);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="mb-6">
          <h3 className="text-lg font-extrabold text-slate-950">
            Company Information
          </h3>
        </div>

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-slate-700">
              Business Name
            </span>
            <input
              className={inputClass}
              value={form.businessName}
              onChange={(e) =>
                updateField("businessName", e.target.value)
              }
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-slate-700">
              Description
            </span>
            <textarea
              rows={5}
              className={`${inputClass} resize-none`}
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-slate-700">
              Address
            </span>
            <input
              className={inputClass}
              value={form.address}
              onChange={(e) =>
                updateField("address", e.target.value)
              }
            />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="mb-6">
          <h3 className="text-lg font-extrabold text-slate-950">
            Support Information
          </h3>
        </div>

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-slate-700">
              WhatsApp
            </span>
            <input
              className={inputClass}
              value={form.whatsapp}
              onChange={(e) =>
                updateField("whatsapp", e.target.value)
              }
              placeholder="+92 300 8897768"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-slate-700">
              Business Hours
            </span>
            <input
              className={inputClass}
              value={form.businessHours}
              onChange={(e) =>
                updateField("businessHours", e.target.value)
              }
              placeholder="Mon - Sat, 10 AM - 8 PM"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {message && (
              <span className="text-sm font-semibold text-slate-600">
                {message}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
