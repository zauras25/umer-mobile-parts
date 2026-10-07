import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, Field, SaveButton } from "@/components/admin/ui/AdminForm";

export default function MediaAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / Media"
        title="Media Library"
        description="Central location for product images, banners and other website media."
        action={{ label: "Upload Media", href: "/admin/media/upload" }}
      />

      <AdminFormCard
        title="Media Information"
        description="The actual storage provider can be connected through the future media service layer."
      >
        <div className="space-y-5">
          <Field label="File Name" placeholder="product-image.webp" />
          <Field label="Alt Text" placeholder="Samsung A15 LCD" />
          <Field label="Folder" placeholder="products/displays" />
          <SaveButton />
        </div>
      </AdminFormCard>
    </div>
  );
}