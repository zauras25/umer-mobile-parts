"use client";

import { useState } from "react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  function decrease() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increase() {
    setQuantity((current) => current + 1);
  }

  return (
    <div className="inline-flex items-center rounded-xl border border-gray-300">
      <button
        type="button"
        onClick={decrease}
        className="flex h-11 w-11 items-center justify-center text-lg text-gray-700 hover:bg-gray-50"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="flex h-11 min-w-12 items-center justify-center border-x border-gray-300 text-sm font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={increase}
        className="flex h-11 w-11 items-center justify-center text-lg text-gray-700 hover:bg-gray-50"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
