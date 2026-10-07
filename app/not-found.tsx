import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-site flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-md text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-red-600">
          404
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-950">
          Page not found
        </h1>

        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist or may have moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
