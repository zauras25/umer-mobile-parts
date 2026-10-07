import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, Field, SaveButton } from "@/components/admin/ui/AdminForm";

export default function NavigationAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / Navigation"
        title="Navigation"
        description="Manage primary website navigation labels, destinations and ordering."
        action={{ label: "Add Menu Item", href: "/admin/navigation/new" }}
      />

      <AdminFormCard title="Menu Item">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Label" placeholder="Shop" />
          <Field label="URL" placeholder="/shop" />
          <Field label="Display Order" placeholder="1" type="number" />
        </div>

        <div className="mt-5">
          <SaveButton />
        </div>
      </AdminFormCard>
    </div>
  );
}