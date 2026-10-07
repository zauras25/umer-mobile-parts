"use server";

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

  if (input.sortOrder < 0) {
    throw new Error("Sort order cannot be negative.");
  }
}

export async function createCategory(input: CategoryInput) {
  validate(input);

  const existing = await categoryRepository.getBySlug(input.slug);

  if (existing) {
    throw new Error("A category with this slug already exists.");
  }

  return categoryRepository.create({
    ...input,
    name: input.name.trim(),
    slug: input.slug.trim().toLowerCase(),
    description: input.description.trim(),
  });
}

export async function updateCategory(
  id: string,
  input: CategoryInput
) {
  validate(input);

  const existing = await categoryRepository.getBySlug(input.slug);

  if (existing && existing.id !== id) {
    throw new Error("A category with this slug already exists.");
  }

  return categoryRepository.update(id, {
    ...input,
    name: input.name.trim(),
    slug: input.slug.trim().toLowerCase(),
    description: input.description.trim(),
  });
}

export async function deleteCategory(id: string) {
  return categoryRepository.delete(id);
}

export async function toggleCategoryStatus(id: string) {
  return categoryRepository.toggleStatus(id);
}
