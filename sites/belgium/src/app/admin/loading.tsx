export default function AdminLoading() {
  return (
    <div className="w-full animate-pulse">
      {/* Başlık + buton satırı */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg" />
        <div className="h-9 w-32 bg-gray-200 rounded-lg" />
      </div>

      {/* Tablo iskelet */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b px-6 py-3 flex gap-8">
          {[160, 80, 100, 80, 80].map((w, i) => (
            <div key={i} className="h-3.5 bg-gray-200 rounded" style={{ width: w }} />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b last:border-0 px-6 py-4 flex gap-8 items-center">
            <div className="h-4 bg-gray-100 rounded flex-1" style={{ maxWidth: 240 }} />
            <div className="h-5 w-16 bg-gray-100 rounded-full" />
            <div className="h-4 w-20 bg-gray-100 rounded" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
            <div className="flex gap-4">
              <div className="h-4 w-14 bg-gray-100 rounded" />
              <div className="h-4 w-8 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
