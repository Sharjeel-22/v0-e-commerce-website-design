"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days,
    hours,
    minutes,
    seconds,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1

        if (newSeconds >= 0) {
          return { ...prevTime, seconds: newSeconds }
        }

        const newMinutes = prevTime.minutes - 1
        if (newMinutes >= 0) {
          return { ...prevTime, minutes: newMinutes, seconds: 59 }
        }

        const newHours = prevTime.hours - 1
        if (newHours >= 0) {
          return { ...prevTime, hours: newHours, minutes: 59, seconds: 59 }
        }

        const newDays = prevTime.days - 1
        if (newDays >= 0) {
          return { ...prevTime, days: newDays, hours: 23, minutes: 59, seconds: 59 }
        }

        clearInterval(timer)
        return prevTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold">{formatTime(timeLeft.days)}</div>
        <div className="text-xs text-gray-500">Days</div>
      </div>
      <div className="text-xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold">{formatTime(timeLeft.hours)}</div>
        <div className="text-xs text-gray-500">Hours</div>
      </div>
      <div className="text-xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold">{formatTime(timeLeft.minutes)}</div>
        <div className="text-xs text-gray-500">Minutes</div>
      </div>
      <div className="text-xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold">{formatTime(timeLeft.seconds)}</div>
        <div className="text-xs text-gray-500">Seconds</div>
      </div>
    </div>
  )
}
