import { notFound } from "next/navigation";

import { pageRepository } from "@/lib/cms/repositories/page-repository";

export default async function RetailerPage() {
  const page = await pageRepository.getBySlug("/retailer");

  if (!page || page.status !== "published") {
    notFound();
  }

  return (
    <main className="container-site py-16">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          Umar Mobile Parts
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
          {page.title}
        </h1>

        {page.excerpt && (
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {page.excerpt}
          </p>
        )}

        <article className="prose prose-gray mt-10 max-w-none whitespace-pre-wrap">
          {page.content}
        </article>
      </div>
    </main>
  );
}
