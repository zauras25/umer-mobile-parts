import { FaqManager } from "@/components/admin/faqs/FaqManager";
import { cmsRepository } from "@/lib/cms/repositories/cms-repository";

export default async function FaqAdmin() {
  const faqs = await cmsRepository.faqs.getAll();

  return <FaqManager initialFaqs={faqs} />;
}
