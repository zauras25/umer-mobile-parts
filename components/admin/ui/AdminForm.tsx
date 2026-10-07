import type { ReactNode } from "react";

export function AdminFormCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-extrabold text-slate-950">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}

export function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-slate-700">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
      />
    </label>
  );
}

export function TextArea({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-slate-700">
        {label}
      </span>
      <textarea
        rows={5}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
      />
    </label>
  );
}

export function SaveButton({ children = "Save Changes" }: { children?: ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700"
    >
      {children}
    </button>
  );
}