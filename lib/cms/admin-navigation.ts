export type AdminNavigationItem = {
  label: string;
  href: string;
  description: string;
  icon: string;
};

export const ADMIN_NAVIGATION: AdminNavigationItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    description: "CMS overview",
    icon: "▦",
  },
  {
    label: "Pages",
    href: "/admin/pages",
    description: "Website pages",
    icon: "▤",
  },
  {
    label: "Homepage",
    href: "/admin/homepage",
    description: "Homepage sections",
    icon: "⌂",
  },
  {
    label: "Banners",
    href: "/admin/banners",
    description: "Promotional banners",
    icon: "▰",
  },
  {
    label: "Categories",
    href: "/admin/categories",
    description: "Product categories",
    icon: "◫",
  },
  {
    label: "Products",
    href: "/admin/products",
    description: "Product content",
    icon: "□",
  },
  {
    label: "FAQs",
    href: "/admin/faqs",
    description: "Frequently asked questions",
    icon: "?",
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    description: "Customer reviews",
    icon: "★",
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    description: "Customer testimonials",
    icon: "“",
  },
  {
    label: "Policies",
    href: "/admin/policies",
    description: "Store policies",
    icon: "§",
  },
  {
    label: "Navigation",
    href: "/admin/navigation",
    description: "Menus & navigation",
    icon: "☰",
  },
  {
    label: "Footer",
    href: "/admin/footer",
    description: "Footer content",
    icon: "▱",
  },
  {
    label: "SEO",
    href: "/admin/seo",
    description: "SEO settings",
    icon: "⌕",
  },
  {
    label: "Media",
    href: "/admin/media",
    description: "Images & media",
    icon: "▧",
  },
];