import { db } from "@/prisma/db";
import type { CmsProduct, CmsProductImage } from "@/lib/cms/models/product-types";

type ProductRow = Awaited<ReturnType<typeof db.orm.public.Product.all>>[number];
type ImageRow = Awaited<ReturnType<typeof db.orm.public.ProductImage.all>>[number];
type FeatureRow = Awaited<ReturnType<typeof db.orm.public.ProductFeature.all>>[number];
type CompatibilityRow =
  Awaited<ReturnType<typeof db.orm.public.ProductCompatibility.all>>[number];

function toProduct(
  product: ProductRow,
  images: ImageRow[],
  features: FeatureRow[],
  compatibility: CompatibilityRow[],
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

    compatibility: compatibility
      .filter((item) => item.productId === product.id)
      .map((item) => item.model),

    features: features
      .filter((item) => item.productId === product.id)
      .map((item) => item.feature),

    images: images
      .filter((item) => item.productId === product.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(
        (item): CmsProductImage => ({
          id: String(item.id),
          url: item.url,
          alt: item.alt ?? "",
          sortOrder: item.sortOrder,
        }),
      ),

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

export class ProductRepository {
  async getAll(): Promise<CmsProduct[]> {
    const [products, images, features, compatibility] =
      await Promise.all([
        db.orm.public.Product.all(),
        db.orm.public.ProductImage.all(),
        db.orm.public.ProductFeature.all(),
        db.orm.public.ProductCompatibility.all(),
      ]);

    return products
      .map((product) =>
        toProduct(product, images, features, compatibility),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getById(id: string): Promise<CmsProduct | null> {
    const productId = Number(id);

    if (!Number.isInteger(productId)) {
      return null;
    }

    const product = await db.orm.public.Product.first({
      id: productId,
    });

    if (!product) {
      return null;
    }

    const [images, features, compatibility] =
      await Promise.all([
        db.orm.public.ProductImage.where({
          productId,
        }).all(),
        db.orm.public.ProductFeature.where({
          productId,
        }).all(),
        db.orm.public.ProductCompatibility.where({
          productId,
        }).all(),
      ]);

    return toProduct(
      product,
      images,
      features,
      compatibility,
    );
  }

  async getBySlug(slug: string): Promise<CmsProduct | null> {
    const product = await db.orm.public.Product.first({
      slug: slug.trim(),
    });

    if (!product) {
      return null;
    }

    const productId = product.id;

    const [images, features, compatibility] =
      await Promise.all([
        db.orm.public.ProductImage.where({
          productId,
        }).all(),
        db.orm.public.ProductFeature.where({
          productId,
        }).all(),
        db.orm.public.ProductCompatibility.where({
          productId,
        }).all(),
      ]);

    return toProduct(
      product,
      images,
      features,
      compatibility,
    );
  }

  async getBySku(sku: string): Promise<CmsProduct | null> {
    const product = await db.orm.public.Product.first({
      sku: sku.trim(),
    });

    if (!product) {
      return null;
    }

    const productId = product.id;

    const [images, features, compatibility] =
      await Promise.all([
        db.orm.public.ProductImage.where({
          productId,
        }).all(),
        db.orm.public.ProductFeature.where({
          productId,
        }).all(),
        db.orm.public.ProductCompatibility.where({
          productId,
        }).all(),
      ]);

    return toProduct(
      product,
      images,
      features,
      compatibility,
    );
  }

  async getPublished(): Promise<CmsProduct[]> {
    const [products, images, features, compatibility] =
      await Promise.all([
        db.orm.public.Product.where({
          status: "published",
        }).all(),
        db.orm.public.ProductImage.all(),
        db.orm.public.ProductFeature.all(),
        db.orm.public.ProductCompatibility.all(),
      ]);

    return products
      .map((product) =>
        toProduct(product, images, features, compatibility),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}

export const productRepository = new ProductRepository();
