import { CategoryManager } from "@/components/admin/categories/CategoryManager";
import { categoryRepository } from "@/lib/cms/repositories/category-repository";

export default async function AdminCategoriesPage() {
  const categories =
    await categoryRepository.getAll();

  return (
    <CategoryManager
      initialCategories={categories}
    />
  );
}
