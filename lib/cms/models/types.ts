export type CmsPageStatus = "draft" | "published";

export type CmsCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

export type CmsPage = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: CmsPageStatus;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
};


export type CmsBanner = {
  id: string;
  title: string;
  image: string;
  link: string;
  sortOrder: number;
  status: "active" | "inactive";
};

export type CmsFaq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  status: "active" | "inactive";
};

export type CmsReview = {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  text: string;
  status: "pending" | "approved" | "rejected";
};

export type CmsTestimonial = {
  id: string;
  customerName: string;
  text: string;
  rating: number;
  sortOrder: number;
  status: "active" | "inactive";
};

export type CmsPolicy = {
  id: string;
  title: string;
  content: string;
  status: "active" | "inactive";
};

export type CmsSeo = {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
};

