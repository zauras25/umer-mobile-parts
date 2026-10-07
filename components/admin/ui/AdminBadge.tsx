type Props = {
  children: React.ReactNode;
  variant?: "green" | "yellow" | "red" | "blue" | "gray";
};

const styles = {
  green: "bg-emerald-50 text-emerald-700",
  yellow: "bg-amber-50 text-amber-700",
  red: "bg-rose-50 text-rose-700",
  blue: "bg-blue-50 text-blue-700",
  gray: "bg-slate-100 text-slate-600",
};

export function AdminBadge({ children, variant = "gray" }: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold ${styles[variant]}`}
    >
      {children}
    </span>
  );
}