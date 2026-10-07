import { PageManager } from "@/components/admin/pages/PageManager";
import { pageRepository } from "@/lib/cms/repositories/page-repository";

export default async function AdminPagesPage() {
  const pages = await pageRepository.getAll();

  return <PageManager initialPages={pages} />;
}
