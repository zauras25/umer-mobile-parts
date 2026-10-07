import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, Field, SaveButton, TextArea } from "@/components/admin/ui/AdminForm";

export default function TestimonialsAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / Testimonials"
        title="Testimonials"
        description="Manage trust-focused customer testimonials shown on the public website."
        action={{ label: "New Testimonial", href: "/admin/testimonials/new" }}
      />

      <AdminFormCard title="Testimonial">
        <div className="space-y-5">
          <Field label="Customer Name" placeholder="Customer name" />
          <Field label="Role / Business" placeholder="Mobile shop owner" />
          <TextArea label="Testimonial" placeholder="Customer feedback..." />
          <SaveButton />
        </div>
      </AdminFormCard>
    </div>
  );
}