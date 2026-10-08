"use server";

import { revalidatePath } from "next/cache";

import type { CmsPage } from "@/lib/cms/models/types";
import { pageRepository } from "@/lib/cms/repositories/page-repository";

type PageInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: CmsPage["status"];
  seoTitle: string;
  seoDescription: string;
};

function normalizeSlug(slug: string) {
  const value = slug.trim();

  if (!value) {
    throw new Error("Slug is required.");
  }

  return value.startsWith("/") ? value : `/${value}`;
}

function validateInput(input: PageInput) {
  const title = input.title.trim();
  const slug = normalizeSlug(input.slug);
  const content = input.content.trim();

  if (!title) {
    throw new Error("Page title is required.");
  }

  if (!content) {
    throw new Error("Page content is required.");
  }

  return {
    title,
    slug,
    excerpt: input.excerpt.trim(),
    content,
    status: input.status,
    seoTitle: input.seoTitle.trim(),
    seoDescription: input.seoDescription.trim(),
  };
}

export async function createPage(input: PageInput) {
  const data = validateInput(input);

  const existing = await pageRepository.getBySlug(data.slug);

  if (existing) {
    throw new Error(`A page already exists with slug "${data.slug}".`);
  }

  const now = new Date().toISOString();

  const page = await pageRepository.create({
    id: crypto.randomUUID(),
    ...data,
  });

  revalidatePath("/admin/pages");
  revalidatePath(data.slug);
  revalidatePath("/[slug]", "page");

  return {
    success: true,
    page,
    now,
  };
}

export async function updatePage(id: string, input: PageInput) {
  const data = validateInput(input);

  const existing = await pageRepository.getById(id);

  if (!existing) {
    return {
      success: false,
      error: "Page not found",
    };
  }

  const pageWithSlug = await pageRepository.getBySlug(data.slug);

  if (pageWithSlug && pageWithSlug.id !== id) {
    throw new Error(`A page already exists with slug "${data.slug}".`);
  }

  const page = await pageRepository.update(id, data);

  if (!page) {
    return {
      success: false,
      error: "Page not found",
    };
  }

  revalidatePath("/admin/pages");
  revalidatePath(existing.slug);
  revalidatePath(data.slug);
  revalidatePath("/[slug]", "page");

  return {
    success: true,
    page,
  };
}

export async function deletePage(id: string) {
  const existing = await pageRepository.getById(id);

  if (!existing) {
    return {
      success: false,
      error: "Page not found",
    };
  }

  const deleted = await pageRepository.delete(id);

  if (!deleted) {
    return {
      success: false,
      error: "Unable to delete page",
    };
  }

  revalidatePath("/admin/pages");
  revalidatePath(existing.slug);
  revalidatePath("/[slug]", "page");

  return {
    success: true,
  };
}

export async function togglePageStatus(id: string) {
  const existing = await pageRepository.getById(id);

  if (!existing) {
    return {
      success: false,
      error: "Page not found",
    };
  }

  const page = await pageRepository.update(id, {
    status: existing.status === "published" ? "draft" : "published",
  });

  if (!page) {
    return {
      success: false,
      error: "Page not found",
    };
  }

  revalidatePath("/admin/pages");
  revalidatePath(existing.slug);
  revalidatePath("/[slug]", "page");

  return {
    success: true,
    page,
  };
}

export async function createPageAction(input: PageInput) {
  return createPage(input);
}

export async function updatePageAction(id: string, input: PageInput) {
  return updatePage(id, input);
}

export async function deletePageAction(id: string) {
  return deletePage(id);
}
