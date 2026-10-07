import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, Field, SaveButton, TextArea } from "@/components/admin/ui/AdminForm";

export default function FaqAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / FAQs"
        title="Frequently Asked Questions"
        description="Manage questions and answers displayed across the website."
        action={{ label: "New FAQ", href: "/admin/faqs/new" }}
      />

      <AdminFormCard title="FAQ Entry">
        <div className="space-y-5">
          <Field label="Question" placeholder="Do you deliver across Pakistan?" />
          <TextArea
            label="Answer"
            placeholder="Write the customer-facing answer..."
          />
          <Field label="Display Order" placeholder="1" type="number" />
          <SaveButton />
        </div>
      </AdminFormCard>
    </div>
  );
}