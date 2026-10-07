export function AdminHeader() {
  return (
    <header className="flex min-h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      <div>
        <p className="text-xs font-semibold text-slate-400">
          Content Management System
        </p>
        <h1 className="mt-0.5 text-lg font-extrabold text-slate-950">
          Umar Mobile Parts
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-bold text-slate-800">
            Administrator
          </p>
          <p className="text-xs text-slate-400">
            CMS Manager
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
          A
        </div>
      </div>
    </header>
  );
}