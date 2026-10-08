"use client";

import Link from "next/link";
import { useState } from "react";

import { NAVIGATION, SITE_CONFIG } from "@/lib/constants/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container-site">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-gray-950"
            onClick={() => setOpen(false)}
          >
            {SITE_CONFIG.name}
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition hover:text-red-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/retailer"
              className="hidden rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-red-600 hover:text-red-600 sm:inline-flex"
            >
              Become a Retailer
            </Link>

            <Link
              href="/retailer"
              className="hidden rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:inline-flex"
            >
              Retailer Login
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-800 md:hidden"
            >
              <span className="text-xl leading-none">
                {open ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/retailer"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg border border-gray-300 px-3 py-3 text-center text-sm font-semibold text-gray-800"
              >
                Become a Retailer
              </Link>

              <Link
                href="/retailer"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-red-600 px-3 py-3 text-center text-sm font-semibold text-white"
              >
                Retailer Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
