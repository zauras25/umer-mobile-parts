import type {
  CmsBanner,
  CmsCategory,
  CmsFaq,
  CmsPage,
  CmsPolicy,
  CmsReview,
  CmsSeo,
  CmsTestimonial,
} from "@/lib/cms/models/types";

export const cmsCategories: CmsCategory[] = [
  {
    id: "cat-displays",
    name: "Displays / Panels",
    slug: "displays-panels",
    description: "Mobile LCD, LED and display panels.",
    parentId: null,
    sortOrder: 1,
    status: "active",
    createdAt: "2026-10-01",
    updatedAt: "2026-10-01",
  },
  {
    id: "cat-batteries",
    name: "Batteries",
    slug: "batteries",
    description: "Replacement batteries for mobile phones.",
    parentId: null,
    sortOrder: 2,
    status: "active",
    createdAt: "2026-10-01",
    updatedAt: "2026-10-01",
  },
  {
    id: "cat-charging",
    name: "Charging Parts",
    slug: "charging-parts",
    description: "Charging boards, connectors and related parts.",
    parentId: null,
    sortOrder: 3,
    status: "active",
    createdAt: "2026-10-01",
    updatedAt: "2026-10-01",
  },
  {
    id: "cat-camera",
    name: "Camera Parts",
    slug: "camera-parts",
    description: "Front and rear camera replacement parts.",
    parentId: null,
    sortOrder: 4,
    status: "active",
    createdAt: "2026-10-01",
    updatedAt: "2026-10-01",
  },
  {
    id: "cat-flex",
    name: "Flex Cables",
    slug: "flex-cables",
    description: "Mobile flex cables and replacement assemblies.",
    parentId: null,
    sortOrder: 5,
    status: "active",
    createdAt: "2026-10-01",
    updatedAt: "2026-10-01",
  },
];

export const cmsPages: CmsPage[] = [
  {
    id: "page-about",
    title: "About Umar Mobile Parts",
    slug: "/about",
    excerpt:
      "Learn more about Umar Mobile Parts and our mobile spare parts business.",
    content:
      "Umar Mobile Parts provides mobile spare parts and replacement components for customers, technicians and retailers across Pakistan.\n\nOur goal is to provide reliable products, competitive pricing and dependable service for mobile repair professionals and businesses.",
    status: "published",
    seoTitle: "About Umar Mobile Parts",
    seoDescription:
      "Learn more about Umar Mobile Parts, our products, services and commitment to mobile repair professionals.",
    createdAt: "2026-10-08",
    updatedAt: "2026-10-08",
  },
  {
    id: "page-support",
    title: "Customer Support",
    slug: "/support",
    excerpt:
      "Get help with products, orders, delivery and replacement requests.",
    content:
      "Welcome to Umar Mobile Parts support.\n\nFor help with products, orders, delivery or replacement requests, please contact our support team.\n\nWe aim to provide quick and helpful assistance to customers and retailers.",
    status: "published",
    seoTitle: "Customer Support | Umar Mobile Parts",
    seoDescription:
      "Get customer support for Umar Mobile Parts products, orders, delivery and replacement requests.",
    createdAt: "2026-10-08",
    updatedAt: "2026-10-08",
  },
  {
    id: "page-retailer",
    title: "Become a Retailer",
    slug: "/retailer",
    excerpt:
      "Join Umar Mobile Parts as a retailer and access mobile spare parts for your business.",
    content:
      "Umar Mobile Parts works with retailers and mobile repair businesses across Pakistan.\n\nRetailers can contact our team to learn about wholesale pricing, product availability and business account options.\n\nUse the retailer registration and login options to continue.",
    status: "published",
    seoTitle: "Become a Retailer | Umar Mobile Parts",
    seoDescription:
      "Join Umar Mobile Parts as a retailer and access mobile spare parts and wholesale business services.",
    createdAt: "2026-10-08",
    updatedAt: "2026-10-08",
  },
];

export const cmsBanners: CmsBanner[] = [];

export const cmsFaqs: CmsFaq[] = [];

export const cmsReviews: CmsReview[] = [];

export const cmsTestimonials: CmsTestimonial[] = [];

export const cmsPolicies: CmsPolicy[] = [];

export const cmsSeo: CmsSeo[] = [];
