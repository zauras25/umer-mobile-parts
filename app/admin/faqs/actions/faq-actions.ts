"use server";

import { revalidatePath } from "next/cache";
import { cmsRepository } from "@/lib/cms/repositories/cms-repository";

export type FaqInput = {
  question: string;
  answer: string;
  sortOrder: number;
  status: "active" | "inactive";
};

function validate(input: FaqInput) {
  if (!input.question.trim()) {
    throw new Error("Question is required.");
  }

  if (!input.answer.trim()) {
    throw new Error("Answer is required.");
  }

  if (input.sortOrder < 0) {
    throw new Error("Display order cannot be negative.");
  }
}

function refresh() {
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}

export async function createFaq(input: FaqInput) {
  validate(input);

  const faq = await cmsRepository.faqs.create({
    ...input,
    question: input.question.trim(),
    answer: input.answer.trim(),
  });

  refresh();

  return {
    success: true,
    faq,
  };
}

export async function updateFaq(
  id: string,
  input: FaqInput,
) {
  validate(input);

  const faq = await cmsRepository.faqs.update(id, {
    ...input,
    question: input.question.trim(),
    answer: input.answer.trim(),
  });

  refresh();

  return {
    success: true,
    faq,
  };
}

export async function deleteFaq(id: string) {
  await cmsRepository.faqs.delete(id);
  refresh();

  return { success: true };
}

export async function toggleFaqStatus(id: string) {
  const faq = await cmsRepository.faqs.toggleStatus(id);
  refresh();

  return {
    success: true,
    faq,
  };
}
