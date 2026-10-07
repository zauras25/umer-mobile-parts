import type {
  CmsBanner,
  CmsCategory,
  CmsFaq,
  CmsPage,
  CmsPolicy,
  CmsProduct,
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

export const cmsPages: CmsPage[] = [];

export const cmsProducts: CmsProduct[] = [];

export const cmsBanners: CmsBanner[] = [];

export const cmsFaqs: CmsFaq[] = [];

export const cmsReviews: CmsReview[] = [];

export const cmsTestimonials: CmsTestimonial[] = [];

export const cmsPolicies: CmsPolicy[] = [];

export const cmsSeo: CmsSeo[] = [];
