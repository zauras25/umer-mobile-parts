import { notFound } from "next/navigation";

import { ProductEditor } from "@/components/admin/products/ProductEditor";
import { categoryRepository } from "@/lib/cms/repositories/category-repository";
import { productRepository } from "@/lib/cms/repositories/product-repository";

type ProductEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductEditPage({
  params,
}: ProductEditPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    productRepository.getById(id),
    categoryRepository.getAll(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <ProductEditor
      product={product}
      categories={categories}
    />
  );
}
