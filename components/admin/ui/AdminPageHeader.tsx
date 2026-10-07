import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: Props) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-rose-600">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700"
        >
          + {action.label}
        </Link>
      )}
    </div>
  );
}