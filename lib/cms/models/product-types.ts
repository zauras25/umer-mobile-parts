export type CmsProductStatus = "draft" | "published";

export type CmsProductImage = {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
};

export type CmsProduct = {
  id: string;
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

  createdAt: string;
  updatedAt: string;
};
