import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminFormCard, SaveButton, TextArea } from "@/components/admin/ui/AdminForm";

export default function PoliciesAdmin() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        eyebrow="CMS / Policies"
        title="Store Policies"
        description="Manage customer-facing delivery, payment, replacement and privacy policy content."
      />

      <div className="space-y-5">
        {[
          ["Delivery Policy", "Delivery information and applicable charges."],
          ["Replacement Policy", "Applicable replacement conditions."],
          ["Payment Policy", "Supported payment methods and rules."],
          ["Privacy Policy", "Customer privacy information."],
          ["Terms & Conditions", "Website terms and conditions."],
        ].map(([title, description]) => (
          <AdminFormCard key={title} title={title} description={description}>
            <TextArea label="Content" placeholder={`Write ${title.toLowerCase()}...`} />
            <div className="mt-5">
              <SaveButton />
            </div>
          </AdminFormCard>
        ))}
      </div>
    </div>
  );
}
