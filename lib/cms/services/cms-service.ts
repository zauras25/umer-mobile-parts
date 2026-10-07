import { categoryRepository } from "@/lib/cms/repositories/category-repository";
import { pageRepository } from "@/lib/cms/repositories/page-repository";
import { productRepository } from "@/lib/cms/repositories/product-repository";

export const cmsService = {
  pages: pageRepository,
  categories: categoryRepository,
  products: productRepository,
};
