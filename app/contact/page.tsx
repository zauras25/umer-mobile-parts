import Link from "next/link";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-gray-400">
            Umar Mobile Parts
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Mobile Spare Parts for Retailers & Everyday Buyers
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">
            Find mobile spare parts, compare available qualities, check
            compatibility and order across Pakistan.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black"
            >
              Shop Spare Parts
            </Link>

            <Link
              href="/retailer"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Become a Retailer
            </Link>
          </div>
        </div>
      </section>

      {/* Main Entry */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">
            Choose your shopping experience
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            How are you buying today?
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Retailer */}
          <div className="rounded-2xl border bg-gray-50 p-7">
            <p className="text-sm font-medium text-gray-500">
              For Shopkeepers
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Retailer
            </h3>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600">
              Get access to wholesale pricing, quantity-based discounts and
              faster repeat purchasing after retailer approval.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/retailer/register"
                className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white"
              >
                Become a Retailer
              </Link>

              <Link
                href="/account/login"
                className="rounded-lg border bg-white px-5 py-3 text-sm font-semibold"
              >
                Retailer Login
              </Link>
            </div>
          </div>

          {/* General Customer */}
          <div className="rounded-2xl border bg-gray-50 p-7">
            <p className="text-sm font-medium text-gray-500">
              For Everyone
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              General Customer
            </h3>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600">
              Find the right spare part, check compatibility and quality,
              then order directly without retailer registration.
            </p>

            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Product discovery
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Browse Spare Parts
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category}
              href={`/shop?category=${encodeURIComponent(category)}`}
              className="rounded-xl border bg-white p-5 transition hover:border-black"
            >
              <h3 className="font-semibold">
                {category}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Browse products →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Popular products
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Running Spare Parts
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            View shop →
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold">
                Wholesale Pricing
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Approved retailers can access quantity-based wholesale
                pricing.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold">
                Multiple Qualities
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Compare available product qualities and choose according to
                your requirement.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold">
                Pakistan-wide Delivery
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Orders can be delivered through courier services across
                Pakistan.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold">
                Order Tracking
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Follow your order from processing and packing through
                dispatch and delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Trust */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl bg-black p-8 text-white md:p-10">
          <p className="text-sm text-gray-400">
            Physical Store
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Umar Mobile Parts
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
            Visit our physical shop in Lahore or order mobile spare parts
            online for delivery across Pakistan.
          </p>

          <div className="mt-6 grid gap-4 text-sm text-gray-300 sm:grid-cols-3">
            <div>
              <span className="block text-gray-500">
                Location
              </span>
              Zam Zam Mall Plaza, Basement, Shop #15
            </div>

            <div>
              <span className="block text-gray-500">
                City
              </span>
              Baghbanpura, Lahore
            </div>

            <div>
              <span className="block text-gray-500">
                Business Hours
              </span>
              10:00 AM – 10:00 PM
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Contact Us
            </Link>

            <Link
              href="/support/whatsapp"
              className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white"
            >
              WhatsApp Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
