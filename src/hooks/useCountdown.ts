import { useState, useEffect } from 'react'

const WEDDING_DATE = new Date('2026-09-05T11:00:00+02:00')

interface Countdown {
  days: number
  hours: number
  minutes: number
  isOver: boolean
}

export function useCountdown(): Countdown {
  const calc = (): Countdown => {
    const now = Date.now()
    const diff = WEDDING_DATE.getTime() - now
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, isOver: true }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return { days, hours, minutes, isOver: false }
  }

  const [countdown, setCountdown] = useState<Countdown>(calc)

  useEffect(() => {
    const id = setInterval(() => setCountdown(calc()), 30000)
    return () => clearInterval(id)
  }, [])

  return countdown
}
