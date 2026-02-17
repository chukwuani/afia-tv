'use client'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'


export default function AnniversaryConfetti() {
  useEffect(() => {
    // Initial golden burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FFDF00', '#DAA520'],
        shapes: ['circle', 'square'],
        scalar: 1.2
      })
    }, 500)

    // Second burst from sides
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#C0C0C0']
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#C0C0C0']
      })
    }, 1000)

    // Subtle continuous confetti for 3 seconds
    const duration = 3 * 1000
    const end = Date.now() + duration
    const colors = ['#FFD700', '#FFA500']

    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval)
      
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return null
}