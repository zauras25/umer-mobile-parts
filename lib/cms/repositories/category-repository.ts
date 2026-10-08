import { db } from "@/prisma/db";
import type { CmsCategory } from "@/lib/cms/models/types";

type CategoryRow =
  Awaited<ReturnType<typeof db.orm.public.Category.all>>[number];

function toCategory(category: CategoryRow): CmsCategory {
  return {
    id: String(category.id),
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
    parentId:
      category.parentId === null
        ? null
        : String(category.parentId),
    sortOrder: category.sortOrder,
    status: category.status,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export type CategoryInput = {
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  sortOrder?: number;
  status?: "active" | "inactive";
};

export class CategoryRepository {
  async getAll(): Promise<CmsCategory[]> {
    const categories = await db.orm.public.Category.all();

    return categories
      .map(toCategory)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getById(id: string): Promise<CmsCategory | null> {
    const categoryId = Number(id);

    if (!Number.isInteger(categoryId)) {
      return null;
    }

    const category = await db.orm.public.Category.first({
      id: categoryId,
    });

    return category ? toCategory(category) : null;
  }

  async getBySlug(slug: string): Promise<CmsCategory | null> {
    const category = await db.orm.public.Category.first({
      slug: slug.trim().toLowerCase(),
    });

    return category ? toCategory(category) : null;
  }

  async getActive(): Promise<CmsCategory[]> {
    const categories = await db.orm.public.Category.where({
      status: "active",
    }).all();

    return categories
      .map(toCategory)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async create(input: CategoryInput): Promise<CmsCategory> {
    const category = await db.orm.public.Category.create({
      name: input.name,
      slug: input.slug.trim().toLowerCase(),
      description: input.description ?? null,
      parentId:
        input.parentId === undefined || input.parentId === null
          ? null
          : Number(input.parentId),
      sortOrder: input.sortOrder ?? 0,
      status: input.status ?? "active",
    });

    return toCategory(category);
  }

  async update(
    id: string,
    input: CategoryInput,
  ): Promise<CmsCategory | null> {
    const categoryId = Number(id);

    if (!Number.isInteger(categoryId)) {
      return null;
    }

    const existing = await db.orm.public.Category.first({
      id: categoryId,
    });

    if (!existing) {
      return null;
    }

    const category = await (db.orm.public.Category as any).update(
      { id: categoryId },
      {
        ...input,
        slug:
          input.slug !== undefined
            ? input.slug.trim().toLowerCase()
            : existing.slug,
        description:
          input.description !== undefined
            ? input.description
            : existing.description,
        parentId:
          input.parentId !== undefined
            ? input.parentId === null
              ? null
              : Number(input.parentId)
            : existing.parentId,
        sortOrder:
          input.sortOrder !== undefined
            ? input.sortOrder
            : existing.sortOrder,
        status:
          input.status !== undefined
            ? input.status
            : existing.status,
      },
    );

    return category ? toCategory(category) : null;
  }

  async delete(id: string): Promise<boolean> {
    const categoryId = Number(id);

    if (!Number.isInteger(categoryId)) {
      return false;
    }

    const existing = await db.orm.public.Category.first({
      id: categoryId,
    });

    if (!existing) {
      return false;
    }

    await (db.orm.public.Category as any).delete({
      id: categoryId,
    });

    return true;
  }

  async toggleStatus(id: string): Promise<CmsCategory | null> {
    const categoryId = Number(id);

    if (!Number.isInteger(categoryId)) {
      return null;
    }

    const existing = await db.orm.public.Category.first({
      id: categoryId,
    });

    if (!existing) {
      return null;
    }

    const category = await (db.orm.public.Category as any).update(
      { id: categoryId },
      {
        status:
          existing.status === "active"
            ? "inactive"
            : "active",
      },
    );

    return category ? toCategory(category) : null;
  }
}

export const categoryRepository = new CategoryRepository();
