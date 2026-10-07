import type { StockStatus } from "@/data/products";

interface StockBadgeProps {
  status: StockStatus;
}

const stockConfig = {
  "in-stock": {
    label: "In Stock",
    className: "bg-green-50 text-green-700",
  },
  "low-stock": {
    label: "Low Stock",
    className: "bg-orange-50 text-orange-700",
  },
  "out-of-stock": {
    label: "Out of Stock",
    className: "bg-red-50 text-red-700",
  },
};

export default function StockBadge({ status }: StockBadgeProps) {
  const config = stockConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
