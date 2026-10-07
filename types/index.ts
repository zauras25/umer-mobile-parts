export type UserType = "customer" | "retailer";

export type RetailerStatus = "pending" | "approved" | "rejected";

export type OrderStatus =
  | "placed"
  | "payment_received"
  | "processing"
  | "packed"
  | "dispatched"
  | "in_transit"
  | "delivered";

export interface NavItem {
  label: string;
  href: string;
}
