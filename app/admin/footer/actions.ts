"use server";

import { revalidatePath } from "next/cache";

import { cmsFooter } from "@/lib/cms/data/footer-store";

export type FooterInput = {
  businessName: string;
  description: string;
  address: string;
  whatsapp: string;
  businessHours: string;
};

function cleanWhatsapp(value: string) {
  return value.trim().replace(/[^\d+]/g, "");
}

export async function getFooter() {
  return { ...cmsFooter };
}

export async function updateFooter(input: FooterInput) {
  const businessName = input.businessName.trim();
  const description = input.description.trim();
  const address = input.address.trim();
  const whatsapp = cleanWhatsapp(input.whatsapp);
  const businessHours = input.businessHours.trim();

  if (!businessName) {
    return { success: false, error: "Business name is required." };
  }

  if (!description) {
    return { success: false, error: "Description is required." };
  }

  if (!whatsapp) {
    return { success: false, error: "WhatsApp number is required." };
  }

  Object.assign(cmsFooter, {
    businessName,
    description,
    address,
    whatsapp,
    businessHours,
    updatedAt: new Date().toISOString(),
  });

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/categories");
  revalidatePath("/about");
  revalidatePath("/support");
  revalidatePath("/retailer");
  revalidatePath("/admin/footer");

  return {
    success: true,
    footer: { ...cmsFooter },
  };
}
