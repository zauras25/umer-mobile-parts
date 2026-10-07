import Link from "next/link";

import { NAVIGATION, SITE_CONFIG } from "@/lib/constants/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container-site">
        <div className="flex min-h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-gray-950"
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
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Retailer Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
