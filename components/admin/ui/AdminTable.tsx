import type { ReactNode } from "react";

type Column = {
  label: string;
};

type Props = {
  columns: Column[];
  children: ReactNode;
  emptyMessage?: string;
};

export function AdminTable({
  columns,
  children,
  emptyMessage = "No records available.",
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.label}
                  className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-wider text-slate-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>

      {emptyMessage && <div className="hidden">{emptyMessage}</div>}
    </div>
  );
}

export function TableRow({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-5 py-4 text-sm ${className}`}>
      {children}
    </td>
  );
}
