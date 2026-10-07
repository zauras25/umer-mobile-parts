"use client";

import { useState } from "react";
import Image from "next/image";

type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  quality: string;
  compatibleModels: string[];
  price: number;
  wholesalePrice?: number;
  discount?: number;
  stockStatus: string;
  warranty: string;
  description: string;
  image: string;
};

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Product Image */}
        <section>
          <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
            <Image src={product.image} alt={product.name} width={600} height={600} className="max-h-full max-w-full object-contain" />
          </div>
        </section>

        {/* Product Information */}
        <section>
          <p className="mb-2 text-sm text-gray-500">
            {product.category}
          </p>

          <h1 className="mb-3 text-3xl font-semibold">
            {product.name}
          </h1>

          <div className="mb-4 flex gap-2">
            <span className="rounded-md bg-gray-100 px-3 py-1 text-sm">
              {product.brand}
            </span>

            <span className="rounded-md bg-gray-100 px-3 py-1 text-sm">
              {product.quality}
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-3xl font-bold">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>

          {/* Stock */}
          <div className="mb-6">
            <span className="text-sm font-medium">
              {product.stockStatus}
            </span>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium">Quantity</p>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setQuantity((value) => Math.max(1, value - 1))
                }
                className="h-10 w-10 rounded border"
              >
                -
              </button>

              <span className="w-8 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((value) => value + 1)}
                className="h-10 w-10 rounded border"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 rounded-lg bg-black px-5 py-3 text-white">
              Add to Cart
            </button>

            <button className="rounded-lg border px-5 py-3">
              â™¡
            </button>
          </div>

          {/* Product Information */}
          <div className="mt-10 space-y-6 border-t pt-6">
            <div>
              <h2 className="mb-2 font-semibold">
                Compatible Models
              </h2>

              <p className="text-gray-600">
                {product.compatibleModels.join(", ")}
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">
                Warranty
              </h2>

              <p className="text-gray-600">
                {product.warranty}
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">
                Description
              </h2>

              <p className="text-gray-600">
                {product.description}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


