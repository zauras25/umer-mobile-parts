"use server";

import { revalidatePath } from "next/cache";
import { cmsRepository } from "@/lib/cms/repositories/cms-repository";

export type BannerInput = {
  title: string;
  image: string;
  link: string;
  sortOrder: number;
  status: "active" | "inactive";
};

function validate(input: BannerInput) {
  if (!input.title.trim()) {
    throw new Error("Banner title is required.");
  }

  if (!input.image.trim()) {
    throw new Error("Banner image URL is required.");
  }

  if (input.sortOrder < 0) {
    throw new Error("Display order cannot be negative.");
  }
}

function refresh() {
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function createBanner(input: BannerInput) {
  validate(input);

  const banner = await cmsRepository.banners.create({
    ...input,
    title: input.title.trim(),
    image: input.image.trim(),
    link: input.link.trim(),
  });

  refresh();

  return {
    success: true,
    banner,
  };
}

export async function updateBanner(
  id: string,
  input: BannerInput,
) {
  validate(input);

  const banner = await cmsRepository.banners.update(id, {
    ...input,
    title: input.title.trim(),
    image: input.image.trim(),
    link: input.link.trim(),
  });

  refresh();

  return {
    success: true,
    banner,
  };
}

export async function deleteBanner(id: string) {
  await cmsRepository.banners.delete(id);
  refresh();

  return { success: true };
}

export async function toggleBannerStatus(id: string) {
  const banner = await cmsRepository.banners.toggleStatus(id);
  refresh();

  return {
    success: true,
    banner,
  };
}
