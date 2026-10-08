"use server";

import { revalidatePath } from "next/cache";

import {
  categoryRepository,
  type CategoryInput,
} from "@/lib/cms/repositories/category-repository";

function validate(input: CategoryInput) {
  if (!input.name.trim()) {
    throw new Error("Category name is required.");
  }

  if (!input.slug.trim()) {
    throw new Error("Category slug is required.");
  }

  if (!Number.isInteger(input.sortOrder) || input.sortOrder < 0) {
    throw new Error(
      "Sort order must be a whole number and cannot be negative.",
    );
  }
}

function refreshCategories() {
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function createCategory(input: CategoryInput) {
  const normalizedInput: CategoryInput = {
    ...input,
    name: input.name.trim(),
    slug: input.slug.trim().toLowerCase(),
    description: input.description.trim(),
    parentId: input.parentId || null,
    sortOrder: Number(input.sortOrder),
  };

  validate(normalizedInput);

  const existing = await categoryRepository.getBySlug(
    normalizedInput.slug,
  );

  if (existing) {
    throw new Error("A category with this slug already exists.");
  }

  const category =
    await categoryRepository.create(normalizedInput);

  refreshCategories();

  return category;
}

export async function updateCategory(
  id: string,
  input: CategoryInput,
) {
  const normalizedInput: CategoryInput = {
    ...input,
    name: input.name.trim(),
    slug: input.slug.trim().toLowerCase(),
    description: input.description.trim(),
    parentId: input.parentId || null,
    sortOrder: Number(input.sortOrder),
  };

  validate(normalizedInput);

  if (
    normalizedInput.parentId &&
    normalizedInput.parentId === id
  ) {
    throw new Error("A category cannot be its own parent.");
  }

  const existing = await categoryRepository.getBySlug(
    normalizedInput.slug,
  );

  if (existing && existing.id !== id) {
    throw new Error("A category with this slug already exists.");
  }

  const category =
    await categoryRepository.update(id, normalizedInput);

  refreshCategories();

  return category;
}

export async function deleteCategory(id: string) {
  await categoryRepository.delete(id);

  refreshCategories();

  return { success: true };
}

export async function toggleCategoryStatus(id: string) {
  const category =
    await categoryRepository.toggleStatus(id);

  refreshCategories();

  return category;
}