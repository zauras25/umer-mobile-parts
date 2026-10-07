import type { CmsCategory } from "@/lib/cms/models/types";
import { cmsCategories } from "@/lib/cms/data/store";

export type CategoryInput = {
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  status: "active" | "inactive";
};

export class CategoryRepository {
  async getAll(): Promise<CmsCategory[]> {
    return [...cmsCategories].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getById(id: string): Promise<CmsCategory | null> {
    return cmsCategories.find((category) => category.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<CmsCategory | null> {
    return cmsCategories.find((category) => category.slug === slug) ?? null;
  }

  async create(input: CategoryInput): Promise<CmsCategory> {
    const now = new Date().toISOString();

    const category: CmsCategory = {
      id: `cat-${Date.now()}`,
      ...input,
      createdAt: now,
      updatedAt: now,
    };

    cmsCategories.push(category);

    return category;
  }

  async update(
    id: string,
    input: CategoryInput
  ): Promise<CmsCategory> {
    const category = cmsCategories.find((item) => item.id === id);

    if (!category) {
      throw new Error("Category not found.");
    }

    Object.assign(category, {
      ...input,
      updatedAt: new Date().toISOString(),
    });

    return category;
  }

  async delete(id: string): Promise<void> {
    const index = cmsCategories.findIndex((category) => category.id === id);

    if (index === -1) {
      throw new Error("Category not found.");
    }

    cmsCategories.splice(index, 1);
  }

  async toggleStatus(id: string): Promise<CmsCategory> {
    const category = cmsCategories.find((item) => item.id === id);

    if (!category) {
      throw new Error("Category not found.");
    }

    category.status =
      category.status === "active" ? "inactive" : "active";

    category.updatedAt = new Date().toISOString();

    return category;
  }
}

export const categoryRepository = new CategoryRepository();
