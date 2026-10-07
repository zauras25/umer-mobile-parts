import type { CmsPage } from "@/lib/cms/models/types";
import { cmsPages } from "@/lib/cms/data/store";

export class PageRepository {
  async getAll(): Promise<CmsPage[]> {
    return [...cmsPages].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  async getPublished(): Promise<CmsPage[]> {
    return cmsPages
      .filter((page) => page.status === "published")
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  async getById(id: string): Promise<CmsPage | null> {
    return cmsPages.find((page) => page.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<CmsPage | null> {
    return cmsPages.find((page) => page.slug === slug) ?? null;
  }
}

export const pageRepository = new PageRepository();
