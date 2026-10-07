"use client";

import { useEffect } from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Future: connect production error monitoring here.
  }, []);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-gray-950">
              Something went wrong
            </h1>

            <p className="mt-3 text-gray-600">
              We could not load this page. Please try again.
            </p>

            <button
              type="button"
              onClick={() => reset()}
              className="mt-6 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
