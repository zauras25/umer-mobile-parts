"use server";

import { revalidatePath } from "next/cache";

import type {
  CmsProduct,
  CmsProductImage,
  CmsProductStatus,
} from "@/lib/cms/models/product-types";

import { cmsProducts } from "@/lib/cms/data/product-store";

type ProductInput = {
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  brand: string;
  model: string;
  partType: string;
  quality: string;
  version: string;
  description: string;
  compatibility: string[];
  features: string[];
  images: CmsProductImage[];
  warranty: string;
  replacementInformation: string;
  price: number;
  compareAtPrice?: number;
  status: CmsProductStatus;
  seoTitle: string;
  seoDescription: string;
};

function revalidateProducts() {
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/categories");
  revalidatePath("/");
}

export async function createProduct(input: ProductInput) {
  const now = new Date().toISOString();

  if (!input.name.trim()) {
    return { success: false, error: "Product name is required." };
  }

  if (!input.sku.trim()) {
    return { success: false, error: "SKU is required." };
  }

  if (!input.categoryId.trim()) {
    return { success: false, error: "Category is required." };
  }

  if (
    cmsProducts.some(
      (product) =>
        product.sku.toLowerCase() === input.sku.trim().toLowerCase(),
    )
  ) {
    return { success: false, error: "SKU already exists." };
  }

  const product: CmsProduct = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    slug: input.slug.trim(),
    sku: input.sku.trim(),
    categoryId: input.categoryId.trim(),
    brand: input.brand.trim(),
    model: input.model.trim(),
    partType: input.partType.trim(),
    quality: input.quality.trim(),
    version: input.version.trim(),
    description: input.description.trim(),
    compatibility: input.compatibility,
    features: input.features,
    images: input.images,
    warranty: input.warranty.trim(),
    replacementInformation: input.replacementInformation.trim(),
    price: Number(input.price) || 0,
    compareAtPrice:
      input.compareAtPrice === undefined
        ? undefined
        : Number(input.compareAtPrice),
    status: input.status,
    seoTitle: input.seoTitle.trim(),
    seoDescription: input.seoDescription.trim(),
    createdAt: now,
    updatedAt: now,
  };

  cmsProducts.push(product);
  revalidateProducts();

  return {
    success: true,
    product,
  };
}

export async function updateProduct(
  id: string,
  input: ProductInput,
) {
  const product = cmsProducts.find((item) => item.id === id);

  if (!product) {
    return {
      success: false,
      error: "Product not found.",
    };
  }

  if (!input.categoryId.trim()) {
    return {
      success: false,
      error: "Category is required.",
    };
  }

  const duplicateSku = cmsProducts.some(
    (item) =>
      item.id !== id &&
      item.sku.toLowerCase() === input.sku.trim().toLowerCase(),
  );

  if (duplicateSku) {
    return {
      success: false,
      error: "SKU already exists.",
    };
  }

  product.name = input.name.trim();
  product.slug = input.slug.trim();
  product.sku = input.sku.trim();
  product.categoryId = input.categoryId.trim();
  product.brand = input.brand.trim();
  product.model = input.model.trim();
  product.partType = input.partType.trim();
  product.quality = input.quality.trim();
  product.version = input.version.trim();
  product.description = input.description.trim();
  product.compatibility = input.compatibility;
  product.features = input.features;
  product.images = input.images;
  product.warranty = input.warranty.trim();
  product.replacementInformation =
    input.replacementInformation.trim();
  product.price = Number(input.price) || 0;
  product.compareAtPrice =
    input.compareAtPrice === undefined
      ? undefined
      : Number(input.compareAtPrice);
  product.status = input.status;
  product.seoTitle = input.seoTitle.trim();
  product.seoDescription = input.seoDescription.trim();
  product.updatedAt = new Date().toISOString();

  revalidateProducts();

  return {
    success: true,
    product,
  };
}

export async function deleteProduct(id: string) {
  const index = cmsProducts.findIndex((item) => item.id === id);

  if (index === -1) {
    return {
      success: false,
      error: "Product not found.",
    };
  }

  cmsProducts.splice(index, 1);
  revalidateProducts();

  return {
    success: true,
  };
}

export async function toggleProductStatus(id: string) {
  const product = cmsProducts.find((item) => item.id === id);

  if (!product) {
    return {
      success: false,
      error: "Product not found.",
    };
  }

  product.status =
    product.status === "published" ? "draft" : "published";

  product.updatedAt = new Date().toISOString();

  revalidateProducts();

  return {
    success: true,
    product,
  };
}
