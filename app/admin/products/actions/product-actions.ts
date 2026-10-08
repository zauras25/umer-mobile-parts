"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/prisma/db";

import type {
  CmsProduct,
  CmsProductImage,
  CmsProductStatus,
} from "@/lib/cms/models/product-types";

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

function cleanArray(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean);
}

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCmsProduct(
  product: any,
  compatibility: string[],
  features: string[],
  images: CmsProductImage[],
): CmsProduct {
  return {
    id: String(product.id),
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    categoryId:
      product.categoryId === null
        ? ""
        : String(product.categoryId),
    brand: product.brand,
    model: product.model,
    partType: product.partType,
    quality: product.quality,
    version: product.version,
    description: product.description ?? "",
    compatibility,
    features,
    images,
    warranty: product.warranty ?? "",
    replacementInformation:
      product.replacementInformation ?? "",
    price: product.price,
    ...(product.compareAtPrice !== null
      ? { compareAtPrice: product.compareAtPrice }
      : {}),
    status: product.status,
    seoTitle: product.seoTitle ?? "",
    seoDescription: product.seoDescription ?? "",
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

async function removeProductChildren(productId: number) {
  const images = await db.orm.public.ProductImage.where({
    productId,
  }).all();

  for (const image of images) {
    await (db.orm.public.ProductImage.delete as any)({
      id: image.id,
    } as any);
  }

  const features = await db.orm.public.ProductFeature.where({
    productId,
  }).all();

  for (const feature of features) {
    await (db.orm.public.ProductFeature.delete as any)({
      id: feature.id,
    } as any);
  }

  const compatibility =
    await db.orm.public.ProductCompatibility.where({
      productId,
    }).all();

  for (const item of compatibility) {
    await (db.orm.public.ProductCompatibility.delete as any)({
      id: item.id,
    } as any);
  }
}

async function addProductChildren(
  productId: number,
  input: ProductInput,
) {
  const compatibility = cleanArray(input.compatibility);
  const features = cleanArray(input.features);

  for (const model of compatibility) {
    await db.orm.public.ProductCompatibility.create({
      productId,
      model,
    });
  }

  for (const feature of features) {
    await db.orm.public.ProductFeature.create({
      productId,
      feature,
    });
  }

  for (const [index, image] of input.images.entries()) {
    if (!image.url?.trim()) {
      continue;
    }

    await db.orm.public.ProductImage.create({
      productId,
      url: image.url.trim(),
      alt: image.alt?.trim() || null,
      sortOrder: Number.isInteger(image.sortOrder)
        ? image.sortOrder
        : index,
    });
  }

  return {
    compatibility,
    features,
    images: input.images.filter(
      (image) => Boolean(image.url?.trim()),
    ),
  };
}

export async function createProduct(input: ProductInput) {
  try {
    const name = input.name.trim();
    const sku = input.sku.trim();
    const slug = makeSlug(input.slug || name);
    const categoryId = input.categoryId.trim();

    if (!name) {
      return {
        success: false,
        error: "Product name is required.",
      };
    }

    if (!sku) {
      return {
        success: false,
        error: "SKU is required.",
      };
    }

    if (!slug) {
      return {
        success: false,
        error: "Slug is required.",
      };
    }

    if (!categoryId || !Number.isInteger(Number(categoryId))) {
      return {
        success: false,
        error: "Category is required.",
      };
    }

    const category = await db.orm.public.Category.first({
      id: Number(categoryId),
    });

    if (!category) {
      return {
        success: false,
        error: "Selected category was not found.",
      };
    }

    const existingSku = await db.orm.public.Product.first({
      sku,
    });

    if (existingSku) {
      return {
        success: false,
        error: "SKU already exists.",
      };
    }

    const existingSlug = await db.orm.public.Product.first({
      slug,
    });

    if (existingSlug) {
      return {
        success: false,
        error: "Slug already exists.",
      };
    }

    const product = await db.orm.public.Product.create({
      name,
      slug,
      sku,
      categoryId: Number(categoryId),
      brand: input.brand.trim(),
      model: input.model.trim(),
      partType: input.partType.trim(),
      quality: input.quality.trim(),
      version: input.version.trim(),
      description: input.description.trim(),
      warranty: input.warranty.trim(),
      replacementInformation:
        input.replacementInformation.trim(),
      price: Number(input.price) || 0,
      compareAtPrice:
        input.compareAtPrice === undefined ||
        input.compareAtPrice === null ||
        Number.isNaN(Number(input.compareAtPrice))
          ? null
          : Number(input.compareAtPrice),
      status: input.status,
      seoTitle: input.seoTitle.trim(),
      seoDescription: input.seoDescription.trim(),
    });

    const children = await addProductChildren(
      product.id,
      input,
    );

    revalidateProducts();

    return {
      success: true,
      product: toCmsProduct(
        product,
        children.compatibility,
        children.features,
        children.images,
      ),
    };
  } catch (error) {
    console.error("createProduct error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create product.",
    };
  }
}

export async function updateProduct(
  id: string,
  input: ProductInput,
) {
  try {
    const productId = Number(id);

    if (!Number.isInteger(productId)) {
      return {
        success: false,
        error: "Invalid product ID.",
      };
    }

    const existing = await db.orm.public.Product.first({
      id: productId,
    });

    if (!existing) {
      return {
        success: false,
        error: "Product not found.",
      };
    }

    const name = input.name.trim();
    const sku = input.sku.trim();
    const slug = makeSlug(input.slug || name);
    const categoryId = input.categoryId.trim();

    if (!name) {
      return {
        success: false,
        error: "Product name is required.",
      };
    }

    if (!sku) {
      return {
        success: false,
        error: "SKU is required.",
      };
    }

    if (!slug) {
      return {
        success: false,
        error: "Slug is required.",
      };
    }

    if (!categoryId || !Number.isInteger(Number(categoryId))) {
      return {
        success: false,
        error: "Category is required.",
      };
    }

    const category = await db.orm.public.Category.first({
      id: Number(categoryId),
    });

    if (!category) {
      return {
        success: false,
        error: "Selected category was not found.",
      };
    }

    const skuOwner = await db.orm.public.Product.first({
      sku,
    });

    if (skuOwner && skuOwner.id !== productId) {
      return {
        success: false,
        error: "SKU already exists.",
      };
    }

    const slugOwner = await db.orm.public.Product.first({
      slug,
    });

    if (slugOwner && slugOwner.id !== productId) {
      return {
        success: false,
        error: "Slug already exists.",
      };
    }

    /*
     * Prisma 8 RC generated update() typing is returning nullable/never
     * for this schema. We already know the product exists above, so
     * perform the write and then re-read the record.
     */
    await (db.orm.public.Product.update as any).call(
      db.orm.public.Product,
      { id: productId },
      {
        name,
        slug,
        sku,
        categoryId: Number(categoryId),
        brand: input.brand.trim(),
        model: input.model.trim(),
        partType: input.partType.trim(),
        quality: input.quality.trim(),
        version: input.version.trim(),
        description: input.description.trim(),
        warranty: input.warranty.trim(),
        replacementInformation:
          input.replacementInformation.trim(),
        price: Number(input.price) || 0,
        compareAtPrice:
          input.compareAtPrice === undefined ||
          input.compareAtPrice === null ||
          Number.isNaN(Number(input.compareAtPrice))
            ? null
            : Number(input.compareAtPrice),
        status: input.status,
        seoTitle: input.seoTitle.trim(),
        seoDescription: input.seoDescription.trim(),
      },
    );

    await removeProductChildren(productId);

    const children = await addProductChildren(
      productId,
      input,
    );

    const updated = await db.orm.public.Product.first({
      id: productId,
    });

    if (!updated) {
      return {
        success: false,
        error: "Product could not be loaded after update.",
      };
    }

    revalidateProducts();

    return {
      success: true,
      product: toCmsProduct(
        updated,
        children.compatibility,
        children.features,
        children.images,
      ),
    };
  } catch (error) {
    console.error("updateProduct error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update product.",
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    const productId = Number(id);

    if (!Number.isInteger(productId)) {
      return {
        success: false,
        error: "Invalid product ID.",
      };
    }

    const product = await db.orm.public.Product.first({
      id: productId,
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found.",
      };
    }

    await removeProductChildren(productId);

    await (db.orm.public.Product.delete as any)({
      id: productId,
    } as any);

    revalidateProducts();

    return {
      success: true,
    };
  } catch (error) {
    console.error("deleteProduct error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete product.",
    };
  }
}

export async function toggleProductStatus(id: string) {
  try {
    const productId = Number(id);

    if (!Number.isInteger(productId)) {
      return {
        success: false,
        error: "Invalid product ID.",
      };
    }

    const product = await db.orm.public.Product.first({
      id: productId,
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found.",
      };
    }

    const status: CmsProductStatus =
      product.status === "published"
        ? "draft"
        : "published";

    await (db.orm.public.Product.update as any).call(
      db.orm.public.Product,
      { id: productId },
      {
        status,
      },
    );

    const updated = await db.orm.public.Product.first({
      id: productId,
    });

    if (!updated) {
      return {
        success: false,
        error: "Product could not be loaded after status change.",
      };
    }

    revalidateProducts();

    return {
      success: true,
      product: updated,
    };
  } catch (error) {
    console.error("toggleProductStatus error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to change product status.",
    };
  }
}

