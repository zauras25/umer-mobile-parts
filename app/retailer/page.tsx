import Link from "next/link";

export default function Page() {
  return (
    <main className="container-site py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
        Umar Mobile Parts
      </p>

      <h1 className="mt-3 text-3xl font-bold text-gray-950">
        
      </h1>

      <p className="mt-4 max-w-xl text-gray-600">
        This route is part of the application foundation. Its full module
        functionality will be implemented according to the Master Development
        Specification.
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
      >
        Back to Home
      </Link>
    </main>
  );
}
