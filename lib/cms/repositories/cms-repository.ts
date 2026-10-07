import {
  cmsBanners,
  cmsFaqs,
  cmsPolicies,
  cmsReviews,
  cmsSeo,
  cmsTestimonials,
} from "@/lib/cms/data/store";

export const cmsRepository = {
  banners: {
    async getAll() {
      return [...cmsBanners].sort((a, b) => a.sortOrder - b.sortOrder);
    },
  },

  faqs: {
    async getAll() {
      return [...cmsFaqs].sort((a, b) => a.sortOrder - b.sortOrder);
    },
  },

  reviews: {
    async getAll() {
      return [...cmsReviews];
    },
  },

  testimonials: {
    async getAll() {
      return [...cmsTestimonials].sort((a, b) => a.sortOrder - b.sortOrder);
    },
  },

  policies: {
    async getAll() {
      return [...cmsPolicies];
    },
  },

  seo: {
    async getAll() {
      return [...cmsSeo];
    },
  },
};
