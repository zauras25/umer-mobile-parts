import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, Field, SaveButton, TextArea } from "@/components/admin/ui/AdminForm";

export default function HomepageAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / Homepage"
        title="Homepage Sections"
        description="Control the content and order of the public homepage sections."
      />

      <div className="space-y-5">
        <AdminFormCard title="Hero Section">
          <div className="space-y-5">
            <Field label="Eyebrow" placeholder="Mobile Spare Parts" />
            <Field label="Headline" placeholder="The right mobile part." />
            <TextArea label="Description" placeholder="Hero description..." />
            <Field label="Primary Button" placeholder="Explore Spare Parts" />
            <Field label="Secondary Button" placeholder="Become a Retailer" />
            <SaveButton />
          </div>
        </AdminFormCard>

        <AdminFormCard title="Retailer CTA">
          <div className="space-y-5">
            <Field label="Heading" placeholder="Buy smarter with wholesale access." />
            <TextArea label="Description" placeholder="Retailer CTA content..." />
            <SaveButton />
          </div>
        </AdminFormCard>
      </div>
    </div>
  );
}