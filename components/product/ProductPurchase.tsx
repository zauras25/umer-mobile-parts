"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

type ProductPurchaseProps = {
  product: {
    id: string;
    name: string;
    price: number;
    wholesalePrice?: number;
    stockStatus: string;
  };
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function ProductPurchase({
  product,
}: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const isOutOfStock = product.stockStatus === "out-of-stock";
  const total = product.price * quantity;

  function handleAddToCart() {
    if (isOutOfStock) return;

    addToCart(product.id, quantity);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <div>
      <div className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-gray-900">
          Quantity
        </h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setQuantity((value) => Math.max(1, value - 1))
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-lg hover:bg-gray-50"
          >
            −
          </button>

          <span className="flex h-10 min-w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm font-semibold">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((value) => value + 1)
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-lg hover:bg-gray-50"
          >
            +
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Total:{" "}
          <span className="font-semibold text-gray-900">
            Rs. {formatPrice(total)}
          </span>
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
        >
          {isOutOfStock
            ? "Out of Stock"
            : added
              ? "✓ Added to Cart"
              : "Add to Cart"}
        </button>

        <Link
          href="/cart"
          className="rounded-xl border border-gray-300 px-5 py-3.5 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
        >
          View Cart
        </Link>
      </div>

      {added && (
        <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3">
          <p className="text-sm font-medium text-green-800">
            Product added to your cart successfully.
          </p>

          <Link
            href="/cart"
            className="mt-1 inline-block text-xs font-semibold text-green-700 hover:underline"
          >
            Go to cart →
          </Link>
        </div>
      )}

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-900">
          Want wholesale pricing?
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-800">
          Retailer pricing and quantity benefits are available to
          approved retailer accounts.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/retailer/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Become a Retailer
          </Link>

          <Link
            href="/account/login"
            className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
          >
            Retailer Login
          </Link>
        </div>
      </div>
    </div>
  );
}
