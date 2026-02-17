'use client'

export default function AnniversaryStars() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <div className="absolute top-10 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-20 right-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-32 left-1/2 w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-40 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
    </div>
  )
}