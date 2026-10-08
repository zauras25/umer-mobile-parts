import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-gray-950 text-gray-300">
      <div className="container-site py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-bold text-white">
              {SITE_CONFIG.name}
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
              Mobile spare parts e-commerce and B2B wholesale platform serving
              customers and retailers across Pakistan.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link className="hover:text-white" href="/shop">
                Shop
              </Link>

              <Link className="hover:text-white" href="/categories">
                Categories
              </Link>

              <Link className="hover:text-white" href="/about">
                About
              </Link>

              <Link className="hover:text-white" href="/support">
                Support
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Retailers</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link className="hover:text-white" href="/retailer">
                Become a Retailer
              </Link>

              <Link className="hover:text-white" href="/retailer">
                Retailer Login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

