import { BannerManager } from "@/components/admin/banners/BannerManager";
import { cmsRepository } from "@/lib/cms/repositories/cms-repository";

export default async function BannersAdminPage() {
  const banners = await cmsRepository.banners.getAll();

  return <BannerManager initialBanners={banners} />;
}
