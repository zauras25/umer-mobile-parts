import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, Field, SaveButton, TextArea } from "@/components/admin/ui/AdminForm";

export default function FooterAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / Footer"
        title="Footer Content"
        description="Manage footer descriptions, contact content and navigation links."
      />

      <div className="space-y-5">
        <AdminFormCard title="Company Information">
          <div className="space-y-5">
            <Field label="Business Name" placeholder="Umar Mobile Parts" />
            <TextArea label="Description" placeholder="Footer company description..." />
            <Field label="Address" placeholder="Lahore, Pakistan" />
            <SaveButton />
          </div>
        </AdminFormCard>

        <AdminFormCard title="Support Information">
          <div className="space-y-5">
            <Field label="WhatsApp" placeholder="Business WhatsApp number" />
            <Field label="Business Hours" placeholder="Mon - Sat, 10 AM - 8 PM" />
            <SaveButton />
          </div>
        </AdminFormCard>
      </div>
    </div>
  );
}