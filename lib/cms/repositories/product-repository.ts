import type { CmsProduct } from "@/lib/cms/models/product-types";
import { cmsProducts } from "@/lib/cms/data/product-store";

export class ProductRepository {
  async getAll(): Promise<CmsProduct[]> {
    return [...cmsProducts].sort(
      (a, b) => a.name.localeCompare(b.name),
    );
  }

  async getById(id: string): Promise<CmsProduct | null> {
    return cmsProducts.find((product) => product.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<CmsProduct | null> {
    return cmsProducts.find((product) => product.slug === slug) ?? null;
  }

  async getBySku(sku: string): Promise<CmsProduct | null> {
    return cmsProducts.find((product) => product.sku === sku) ?? null;
  }

  async getPublished(): Promise<CmsProduct[]> {
    return cmsProducts
      .filter((product) => product.status === "published")
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}

export const productRepository = new ProductRepository();
