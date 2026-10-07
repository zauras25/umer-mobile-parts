import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, Field, SaveButton, TextArea } from "@/components/admin/ui/AdminForm";

export default function SeoAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / SEO"
        title="SEO Settings"
        description="Manage default metadata and search-engine content for the public website."
      />

      <AdminFormCard title="Global SEO">
        <div className="space-y-5">
          <Field
            label="Site Title"
            placeholder="Umar Mobile Parts | Mobile Spare Parts Pakistan"
          />

          <TextArea
            label="Site Description"
            placeholder="Default website meta description..."
          />

          <Field
            label="Default Keywords"
            placeholder="mobile spare parts, Lahore, Pakistan"
          />

          <Field
            label="Canonical Base URL"
            placeholder="https://example.com"
          />

          <SaveButton />
        </div>
      </AdminFormCard>
    </div>
  );
}