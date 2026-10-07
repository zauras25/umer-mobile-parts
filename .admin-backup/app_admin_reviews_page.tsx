import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminTable, TableCell, TableRow } from "@/components/admin/ui/AdminTable";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";

export default function ReviewsAdmin() {
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader
        eyebrow="CMS / Reviews"
        title="Customer Reviews"
        description="Review and moderate customer feedback before it appears publicly."
      />

      <AdminTable
        columns={[
          { label: "Customer" },
          { label: "Product" },
          { label: "Rating" },
          { label: "Status" },
          { label: "Action" },
        ]}
      >
        <TableRow>
          <TableCell className="font-bold">No reviews yet</TableCell>
          <TableCell className="text-slate-400">—</TableCell>
          <TableCell className="text-slate-400">—</TableCell>
          <TableCell>
            <AdminBadge>Waiting</AdminBadge>
          </TableCell>
          <TableCell className="text-slate-400">—</TableCell>
        </TableRow>
      </AdminTable>
    </div>
  );
}