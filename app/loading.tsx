export default function Loading() {
  return (
    <div className="container-site flex min-h-[50vh] items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"
        aria-label="Loading"
      />
    </div>
  );
}
