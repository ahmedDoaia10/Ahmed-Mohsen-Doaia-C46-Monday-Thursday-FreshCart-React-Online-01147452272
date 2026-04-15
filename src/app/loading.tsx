export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">

        <div className="w-24 h-24 rounded-full  flex items-center justify-center mx-auto ">
          <svg className="animate-spin w-10 h-10" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="8"  r="3" fill="#16a34a"  />
            <circle cx="28.5" cy="11.5" r="3" fill="#16a34a"  />
            <circle cx="32" cy="20" r="3" fill="#16a34a"  />
            <circle cx="28.5" cy="28.5" r="3" fill="#16a34a"  />
            <circle cx="20" cy="32" r="3" fill="#16a34a"  />
            <circle cx="11.5" cy="28.5" r="3" fill="#16a34a"  />
            <circle cx="8"  cy="20" r="3" fill="#16a34a"  />
            <circle cx="11.5" cy="11.5" r="3" fill="none" opacity="0" />
          </svg>
        </div>

        <p className="text-[#6a7282] font-medium text-lg">Loading Products...</p>
       

      </div>
    </main>
  );
}