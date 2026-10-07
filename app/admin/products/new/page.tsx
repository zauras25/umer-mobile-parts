import { ProductEditor } from "@/components/admin/products/ProductEditor";
import { categoryRepository } from "@/lib/cms/repositories/category-repository";

export default async function NewProductPage() {
  const categories = await categoryRepository.getAll();

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-rose-600">
          Products
        </p>

        <h1 className="text-3xl font-black text-slate-900">
          Add Product
        </h1>
      </div>

      <ProductEditor categories={categories} />
    </main>
  );
}
