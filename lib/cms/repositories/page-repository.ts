import { db } from "@/prisma/db";
import type { CmsPage } from "@/lib/cms/models/types";

type PageRow =
  Awaited<ReturnType<typeof db.orm.public.CmsPage.all>>[number];

function toPage(page: PageRow): CmsPage {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    excerpt: page.excerpt ?? "",
    content: page.content,
    status: page.status,
    seoTitle: page.seoTitle ?? "",
    seoDescription: page.seoDescription ?? "",
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
  };
}

export class PageRepository {
  async getAll(): Promise<CmsPage[]> {
    const pages = await db.orm.public.CmsPage.all();

    return pages
      .map(toPage)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  async getById(id: string): Promise<CmsPage | null> {
    const page = await db.orm.public.CmsPage.first({
      id,
    });

    return page ? toPage(page) : null;
  }

  async getBySlug(slug: string): Promise<CmsPage | null> {
    const page = await db.orm.public.CmsPage.first({
      slug: slug.trim(),
    });

    return page ? toPage(page) : null;
  }

  async getPublished(): Promise<CmsPage[]> {
    const pages = await db.orm.public.CmsPage.where({
      status: "published",
    }).all();

    return pages
      .map(toPage)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  async create(data: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    status?: "draft" | "published";
    seoTitle?: string;
    seoDescription?: string;
  }): Promise<CmsPage> {
    const page = await db.orm.public.CmsPage.create({
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt ?? null,
      content: data.content,
      status: data.status ?? "draft",
      seoTitle: data.seoTitle ?? null,
      seoDescription: data.seoDescription ?? null,
    });

    return toPage(page);
  }

  async update(
    id: string,
    data: {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      status?: "draft" | "published";
      seoTitle?: string;
      seoDescription?: string;
    },
  ): Promise<CmsPage | null> {
    const existing = await db.orm.public.CmsPage.first({
      id,
    });

    if (!existing) {
      return null;
    }

    const page = await (db.orm.public.CmsPage as any).update(
      { id },
      {
        ...data,
        excerpt:
          data.excerpt !== undefined
            ? data.excerpt
            : existing.excerpt,
        seoTitle:
          data.seoTitle !== undefined
            ? data.seoTitle
            : existing.seoTitle,
        seoDescription:
          data.seoDescription !== undefined
            ? data.seoDescription
            : existing.seoDescription,
      },
    );

    return page ? toPage(page) : null;
  }

  async delete(id: string): Promise<boolean> {
    const existing = await db.orm.public.CmsPage.first({
      id,
    });

    if (!existing) {
      return false;
    }

    await (db.orm.public.CmsPage as any).delete({
      id,
    });

    return true;
  }
}

export const pageRepository = new PageRepository();
