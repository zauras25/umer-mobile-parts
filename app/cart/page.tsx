"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/products";

type CartItem = {
  productId: string;
  quantity: number;
};

const initialCart: CartItem[] = [
  {
    productId: "ump-001",
    quantity: 1,
  },
  {
    productId: "ump-003",
    quantity: 2,
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const cartProducts = useMemo(() => {
    return cartItems
      .map((cartItem) => {
        const product = products.find(
          (item) => item.id === cartItem.productId
        );

        if (!product) {
          return null;
        }

        return {
          product,
          quantity: cartItem.quantity,
        };
      })
      .filter(
        (
          item
        ): item is {
          product: (typeof products)[number];
          quantity: number;
        } => item !== null
      );
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cartProducts]);

  function increaseQuantity(productId: string) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(productId: string) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(productId: string) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    );
  }

  const isEmpty = cartProducts.length === 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Umar Mobile Parts
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Your Cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review your selected mobile parts before checkout.
          </p>
        </div>

        {isEmpty ? (
          /* Empty Cart */
          <section className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🛒
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              You have not added any products to your cart yet.
              Browse our mobile parts and add the products you need.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Browse Products
            </Link>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Cart Items */}
            <section className="space-y-4">
              {cartProducts.map(({ product, quantity }) => {
                const itemTotal = product.price * quantity;
                const isOutOfStock =
                  product.stockStatus === "out-of-stock";

                return (
                  <article
                    key={product.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5"
                  >
                    <div className="flex gap-4 sm:gap-5">
                      {/* Product Image */}
                      <Link
                        href={`/product/${product.slug}`}
                        className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={160}
                          height={160}
                          className="h-full w-full object-contain"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={`/product/${product.slug}`}
                              className="font-semibold text-gray-900 hover:underline"
                            >
                              {product.name}
                            </Link>

                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand} · {product.quality}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {product.category}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="shrink-0 text-sm font-medium text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>

                        {/* Stock */}
                        <div className="mt-2">
                          <span
                            className={
                              isOutOfStock
                                ? "text-xs font-medium text-red-600"
                                : product.stockStatus === "low-stock"
                                  ? "text-xs font-medium text-orange-600"
                                  : "text-xs font-medium text-green-600"
                            }
                          >
                            {isOutOfStock
                              ? "Out of Stock"
                              : product.stockStatus === "low-stock"
                                ? "Low Stock"
                                : "In Stock"}
                          </span>
                        </div>

                        {/* Quantity + Price */}
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(product.id)
                              }
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg text-gray-700 transition hover:bg-gray-50"
                            >
                              −
                            </button>

                            <span className="flex h-9 min-w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-900">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(product.id)
                              }
                              aria-label={`Increase quantity of ${product.name}`}
                              disabled={isOutOfStock}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-xs text-gray-500">
                              Rs. {formatPrice(product.price)} each
                            </p>

                            <p className="mt-1 font-bold text-gray-900">
                              Rs. {formatPrice(itemTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Continue Shopping */}
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="text-sm font-medium text-gray-600 hover:text-black hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </section>

            {/* Order Summary */}
            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium text-gray-900">
                    Rs. {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="text-right text-xs text-gray-500">
                    Calculated at checkout
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between gap-4">
                    <span className="font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      Rs. {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block rounded-xl bg-black px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="mt-3 block text-center text-sm font-medium text-gray-600 hover:text-black hover:underline"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900">
                  Cash on Delivery Available
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Delivery charges will be calculated during checkout.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
