export default function ProductDetailsLoading() {
  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb skeleton */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="h-4 w-48 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left - Image skeleton */}
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="aspect-square w-full bg-gray-200 rounded-xl animate-pulse mb-3" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Info skeleton */}
          <div className="lg:w-3/4 flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="h-7 w-28 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="h-9 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-5 w-40 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-24 w-full bg-gray-200 rounded-xl animate-pulse" />
            <div className="flex gap-3">
              <div className="h-12 flex-1 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-12 flex-1 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}