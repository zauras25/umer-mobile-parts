import {
  cmsBanners,
  cmsFaqs,
  cmsPolicies,
  cmsReviews,
  cmsSeo,
  cmsTestimonials,
} from "@/lib/cms/data/store";

import type {
  CmsBanner,
  CmsFaq,
  CmsPolicy,
  CmsReview,
  CmsSeo,
  CmsTestimonial,
} from "@/lib/cms/models/types";

function makeId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export const cmsRepository = {
  banners: {
    async getAll(): Promise<CmsBanner[]> {
      return [...cmsBanners].sort((a, b) => a.sortOrder - b.sortOrder);
    },

    async getById(id: string) {
      return cmsBanners.find((item) => item.id === id) ?? null;
    },

    async create(input: Omit<CmsBanner, "id">) {
      const banner: CmsBanner = {
        id: makeId("banner"),
        ...input,
      };

      cmsBanners.push(banner);
      return banner;
    },

    async update(id: string, input: Omit<CmsBanner, "id">) {
      const banner = cmsBanners.find((item) => item.id === id);

      if (!banner) {
        throw new Error("Banner not found.");
      }

      Object.assign(banner, input);
      return banner;
    },

    async delete(id: string) {
      const index = cmsBanners.findIndex((item) => item.id === id);

      if (index === -1) {
        throw new Error("Banner not found.");
      }

      cmsBanners.splice(index, 1);
    },

    async toggleStatus(id: string) {
      const banner = cmsBanners.find((item) => item.id === id);

      if (!banner) {
        throw new Error("Banner not found.");
      }

      banner.status =
        banner.status === "active" ? "inactive" : "active";

      return banner;
    },
  },

  faqs: {
    async getAll(): Promise<CmsFaq[]> {
      return [...cmsFaqs].sort((a, b) => a.sortOrder - b.sortOrder);
    },

    async getById(id: string) {
      return cmsFaqs.find((item) => item.id === id) ?? null;
    },

    async create(input: Omit<CmsFaq, "id">) {
      const faq: CmsFaq = {
        id: makeId("faq"),
        ...input,
      };

      cmsFaqs.push(faq);
      return faq;
    },

    async update(id: string, input: Omit<CmsFaq, "id">) {
      const faq = cmsFaqs.find((item) => item.id === id);

      if (!faq) {
        throw new Error("FAQ not found.");
      }

      Object.assign(faq, input);
      return faq;
    },

    async delete(id: string) {
      const index = cmsFaqs.findIndex((item) => item.id === id);

      if (index === -1) {
        throw new Error("FAQ not found.");
      }

      cmsFaqs.splice(index, 1);
    },

    async toggleStatus(id: string) {
      const faq = cmsFaqs.find((item) => item.id === id);

      if (!faq) {
        throw new Error("FAQ not found.");
      }

      faq.status =
        faq.status === "active" ? "inactive" : "active";

      return faq;
    },
  },

  reviews: {
    async getAll(): Promise<CmsReview[]> {
      return [...cmsReviews];
    },
  },

  testimonials: {
    async getAll(): Promise<CmsTestimonial[]> {
      return [...cmsTestimonials].sort(
        (a, b) => a.sortOrder - b.sortOrder,
      );
    },
  },

  policies: {
    async getAll(): Promise<CmsPolicy[]> {
      return [...cmsPolicies];
    },
  },

  seo: {
    async getAll(): Promise<CmsSeo[]> {
      return [...cmsSeo];
    },
  },
};
