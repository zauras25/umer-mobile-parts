import Link from "next/link";

import { ADMIN_NAVIGATION } from "@/lib/cms/admin-navigation";

const stats = [
  {
    label: "Published Pages",
    value: "0",
    description: "Website content",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Products",
    value: "0",
    description: "Catalogue content",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Categories",
    value: "0",
    description: "Catalogue structure",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Reviews",
    value: "0",
    description: "Pending moderation",
    color: "bg-amber-50 text-amber-600",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-rose-600">
          Dashboard
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Content overview
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage the content and presentation of the Umar Mobile Parts
          website from one central CMS.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${stat.color}`}
            >
              ●
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              {stat.label}
            </p>

            <div className="mt-1 flex items-end justify-between gap-3">
              <p className="text-3xl font-black text-slate-950">
                {stat.value}
              </p>

              <span className="text-xs text-slate-400">
                {stat.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-extrabold text-slate-950">
              Content modules
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Select a section to manage its website content.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADMIN_NAVIGATION.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-slate-200 p-4 transition hover:border-rose-200 hover:bg-rose-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600 transition group-hover:bg-rose-600 group-hover:text-white">
                  {item.icon}
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-slate-950 p-7 text-white shadow-card">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-rose-400">
          CMS principle
        </p>

        <h3 className="mt-2 text-2xl font-black">
          Content stays in CMS. Business logic stays in the application.
        </h3>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          This separation keeps the website maintainable and prepares the
          platform for future business and inventory system integrations.
        </p>
      </section>
    </div>
  );
}