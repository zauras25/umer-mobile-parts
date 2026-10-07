import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { FooterEditor } from "@/components/admin/footer/FooterEditor";
import { cmsFooter } from "@/lib/cms/data/footer-store";

export default function FooterAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / Footer"
        title="Footer Content"
        description="Manage footer descriptions, contact content and support information."
      />

      <FooterEditor initialFooter={cmsFooter} />
    </div>
  );
}
