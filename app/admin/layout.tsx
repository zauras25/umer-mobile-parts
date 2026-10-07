import type { ReactNode } from "react";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminHeader />

          <main className="p-5 sm:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}