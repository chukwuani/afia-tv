'use client'

export default function AnniversaryBadge() {
  return (
    <div className="fixed top-20 right-4 z-40 hidden md:block">
      <div className="relative">
        <div className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white px-4 py-2 rounded-full shadow-xl animate-pulse">
          <span className="text-xs font-bold">🎉 3rd Anniversary</span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      </div>
    </div>
  )
}