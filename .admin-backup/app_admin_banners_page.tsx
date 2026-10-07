import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, Field, SaveButton } from "@/components/admin/ui/AdminForm";

export default function BannersAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / Banners"
        title="Banners"
        description="Manage promotional and campaign banners used throughout the website."
        action={{ label: "New Banner", href: "/admin/banners/new" }}
      />

      <AdminFormCard title="Banner Content">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Banner Title" placeholder="Summer Parts Sale" />
          <Field label="Button Text" placeholder="Shop Now" />
          <Field label="Destination URL" placeholder="/shop" />
          <Field label="Display Order" placeholder="1" type="number" />
        </div>

        <div className="mt-5">
          <SaveButton />
        </div>
      </AdminFormCard>
    </div>
  );
}