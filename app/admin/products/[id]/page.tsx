import { notFound } from "next/navigation";

import { ProductEditor } from "@/components/admin/products/ProductEditor";
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

  const product = await productRepository.getById(id);

  if (!product) {
    notFound();
  }

  return (
    <ProductEditor
      product={product}
    />
  );
}