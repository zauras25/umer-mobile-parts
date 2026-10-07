"use server";

import { revalidatePath } from "next/cache";

import type { CmsPage } from "@/lib/cms/models/types";
import { cmsPages } from "@/lib/cms/data/store";

type PageInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: CmsPage["status"];
  seoTitle: string;
  seoDescription: string;
};

export async function createPage(input: PageInput) {
  const now = new Date().toISOString();

  const page: CmsPage = {
    id: crypto.randomUUID(),
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    status: input.status,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    createdAt: now,
    updatedAt: now,
  };

  cmsPages.push(page);

  revalidatePath("/admin/pages");

  return {
    success: true,
    page,
  };
}

export async function updatePage(id: string, input: PageInput) {
  const page = cmsPages.find((item) => item.id === id);

  if (!page) {
    return {
      success: false,
      error: "Page not found",
    };
  }

  page.title = input.title;
  page.slug = input.slug;
  page.excerpt = input.excerpt;
  page.content = input.content;
  page.status = input.status;
  page.seoTitle = input.seoTitle;
  page.seoDescription = input.seoDescription;
  page.updatedAt = new Date().toISOString();

  revalidatePath("/admin/pages");

  return {
    success: true,
    page,
  };
}

export async function deletePage(id: string) {
  const index = cmsPages.findIndex((item) => item.id === id);

  if (index === -1) {
    return {
      success: false,
      error: "Page not found",
    };
  }

  cmsPages.splice(index, 1);

  revalidatePath("/admin/pages");

  return {
    success: true,
  };
}

export async function togglePageStatus(id: string) {
  const page = cmsPages.find((item) => item.id === id);

  if (!page) {
    return {
      success: false,
      error: "Page not found",
    };
  }

  page.status = page.status === "published" ? "draft" : "published";
  page.updatedAt = new Date().toISOString();

  revalidatePath("/admin/pages");

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
