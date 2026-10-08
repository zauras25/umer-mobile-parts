"use server";

import { revalidatePath } from "next/cache";

import { pageRepository } from "@/lib/cms/repositories/page-repository";

function value(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

function statusValue(
  formData: FormData,
): "draft" | "published" {
  return value(formData, "status") === "published"
    ? "published"
    : "draft";
}

export async function createPage(formData: FormData) {
  const title = value(formData, "title");
  const slug = value(formData, "slug");
  const content = value(formData, "content");

  if (!title || !slug || !content) {
    throw new Error(
      "Title, slug and content are required.",
    );
  }

  const page = await pageRepository.create({
    id: crypto.randomUUID(),
    title,
    slug: slug.startsWith("/") ? slug : `/${slug}`,
    excerpt: value(formData, "excerpt"),
    content,
    status: statusValue(formData),
    seoTitle: value(formData, "seoTitle"),
    seoDescription: value(formData, "seoDescription"),
  });

  revalidatePath("/admin/pages");
  revalidatePath(page.slug);

  return page;
}

export async function updatePage(formData: FormData) {
  const id = value(formData, "id");

  if (!id) {
    throw new Error("Page ID is required.");
  }

  const existing = await pageRepository.getById(id);

  if (!existing) {
    throw new Error("Page not found.");
  }

  const oldSlug = existing.slug;

  const updated = await pageRepository.update(id, {
    title: value(formData, "title"),
    slug: value(formData, "slug").startsWith("/")
      ? value(formData, "slug")
      : `/${value(formData, "slug")}`,
    excerpt: value(formData, "excerpt"),
    content: value(formData, "content"),
    status: statusValue(formData),
    seoTitle: value(formData, "seoTitle"),
    seoDescription: value(formData, "seoDescription"),
  });

  if (!updated) {
    throw new Error("Unable to update page.");
  }

  revalidatePath("/admin/pages");
  revalidatePath(oldSlug);
  revalidatePath(updated.slug);

  return updated;
}

export async function deletePage(formData: FormData) {
  const id = value(formData, "id");

  if (!id) {
    throw new Error("Page ID is required.");
  }

  const existing = await pageRepository.getById(id);

  if (!existing) {
    throw new Error("Page not found.");
  }

  const deleted = await pageRepository.delete(id);

  if (!deleted) {
    throw new Error("Unable to delete page.");
  }

  revalidatePath("/admin/pages");
  revalidatePath(existing.slug);
}

export async function togglePageStatus(formData: FormData) {
  const id = value(formData, "id");

  if (!id) {
    throw new Error("Page ID is required.");
  }

  const existing = await pageRepository.getById(id);

  if (!existing) {
    throw new Error("Page not found.");
  }

  const updated = await pageRepository.update(id, {
    status:
      existing.status === "published"
        ? "draft"
        : "published",
  });

  if (!updated) {
    throw new Error("Unable to update page status.");
  }

  revalidatePath("/admin/pages");
  revalidatePath(existing.slug);
  revalidatePath(updated.slug);

  return updated;
}
