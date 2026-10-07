"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAVIGATION } from "@/lib/cms/admin-navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-100 px-6 py-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-600 font-black text-white shadow-lg shadow-rose-600/20">
            U
          </div>

          <div>
            <div className="font-extrabold tracking-tight text-slate-950">
              Umar CMS
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Admin Panel
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
          Content Management
        </p>

        <nav className="space-y-1">
          {ADMIN_NAVIGATION.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group flex items-center gap-3 rounded-xl px-3 py-3 transition",
                  active
                    ? "bg-rose-50 text-rose-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold",
                    active
                      ? "bg-rose-600 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white",
                  ].join(" ")}
                >
                  {item.icon}
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-bold">
                    {item.label}
                  </span>

                  <span className="block truncate text-[11px] text-slate-400">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-100 p-4">
        <Link
          href="/"
          className="flex items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          View Website
        </Link>
      </div>
    </aside>
  );
}