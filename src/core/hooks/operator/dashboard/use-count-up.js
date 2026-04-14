"use client"

import { useEffect, useState } from "react"

export function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (target == null) return

    const startTime = performance.now()

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const current = Math.floor(progress * target)

      setValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [target, duration])

  return value
}
