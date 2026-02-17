'use client'
import { useEffect, useState } from 'react'

export default function AnniversaryModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if user has seen the modal
    const hasVisited = localStorage.getItem('anniversary-modal-seen-2024')
    if (!hasVisited) {
      setTimeout(() => setShow(true), 1500) // Show after 1.5s
    }
  }, [])

  const handleClose = () => {
    setShow(false)
    localStorage.setItem('anniversary-modal-seen-2026', 'true')
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg text-center shadow-2xl animate-scale-in">
        <div className="text-7xl mb-4 animate-bounce">🎊</div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
          3 Years of Excellence!
        </h2>
        <p className="text-gray-600 mb-2 text-lg">
          Thank you for 3 amazing years of trust and support
        </p>
        <p className="text-gray-500 mb-6">
          3 Years • 5,000+ Stories • Growing Every Day
        </p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={handleClose}
            className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition shadow-lg"
          >
            Let's Celebrate! 🎉
          </button>
        </div>
      </div>
    </div>
  )
}