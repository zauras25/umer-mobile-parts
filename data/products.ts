export type CustomerType =
  | "guest"
  | "general"
  | "pending-retailer"
  | "approved-retailer";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductQuality = "Original" | "OEM" | "Copy";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  quality: ProductQuality;
  price: number;
  wholesalePrice?: number;
  discountPercentage?: number;
  stockStatus: StockStatus;
  warranty: string;
  image: string;
  compatibleModels: string[];
}

export const products: Product[] = [
  {
    id: "ump-001",
    slug: "iphone-13-lcd-oled",
    name: "iPhone 13 LCD OLED",
    brand: "Apple",
    category: "LCD / Panels",
    model: "iPhone 13",
    quality: "OEM",
    price: 4000,
    wholesalePrice: 3600,
    discountPercentage: 10,
    stockStatus: "in-stock",
    warranty: "7 Days",
    image: "/products/iphone-13-lcd.jpg",
    compatibleModels: ["iPhone 13"],
  },
  {
    id: "ump-002",
    slug: "samsung-a15-lcd",
    name: "Samsung A15 LCD",
    brand: "Samsung",
    category: "LCD / Panels",
    model: "Galaxy A15",
    quality: "Original",
    price: 5200,
    wholesalePrice: 4784,
    discountPercentage: 8,
    stockStatus: "low-stock",
    warranty: "7 Days",
    image: "/products/samsung-a15-lcd.jpg",
    compatibleModels: ["Galaxy A15"],
  },
  {
    id: "ump-003",
    slug: "iphone-13-battery",
    name: "iPhone 13 Battery",
    brand: "Apple",
    category: "Batteries",
    model: "iPhone 13",
    quality: "OEM",
    price: 2800,
    wholesalePrice: 2576,
    discountPercentage: 8,
    stockStatus: "in-stock",
    warranty: "30 Days",
    image: "/products/iphone-13-battery.jpg",
    compatibleModels: ["iPhone 13"],
  },
  {
    id: "ump-004",
    slug: "samsung-a15-battery",
    name: "Samsung A15 Battery",
    brand: "Samsung",
    category: "Batteries",
    model: "Galaxy A15",
    quality: "OEM",
    price: 2200,
    wholesalePrice: 2024,
    discountPercentage: 8,
    stockStatus: "in-stock",
    warranty: "30 Days",
    image: "/products/samsung-a15-battery.jpg",
    compatibleModels: ["Galaxy A15"],
  },
  {
    id: "ump-005",
    slug: "iphone-13-charging-flex",
    name: "iPhone 13 Charging Flex",
    brand: "Apple",
    category: "Charging Ports",
    model: "iPhone 13",
    quality: "Copy",
    price: 950,
    wholesalePrice: 874,
    discountPercentage: 8,
    stockStatus: "low-stock",
    warranty: "7 Days",
    image: "/products/iphone-13-flex.jpg",
    compatibleModels: ["iPhone 13"],
  },
  {
    id: "ump-006",
    slug: "samsung-a15-charging-flex",
    name: "Samsung A15 Charging Flex",
    brand: "Samsung",
    category: "Charging Ports",
    model: "Galaxy A15",
    quality: "OEM",
    price: 1100,
    wholesalePrice: 1012,
    discountPercentage: 8,
    stockStatus: "out-of-stock",
    image: "/products/samsung-a15-flex.jpg",
    warranty: "7 Days",
    compatibleModels: ["Galaxy A15"],
  },
];

export const categories = [
  "LCD / Panels",
  "Batteries",
  "Charging Ports",
  "Flex Cables",
  "Speakers",
  "Microphones",
  "ICs",
  "Back Glass / Housing",
  "Covers",
  "Chargers",
  "Cables",
  "Tools",
  "Other Accessories",
];
