import { useEffect, useRef, useState } from "react"

export default function useOnClickout(hover = true) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const isOnBrowser = typeof window !== "undefined"

    const handleOnMouseMove = (event): void => {
      if (!open) return // it already closed
      if (event.target === ref.current) return // we're clicking on the same element
      if (ref.current?.contains(event.target as Node)) return // we're clicking on element childrens

      setOpen(false)
    }

    if (isOnBrowser) {
      window.addEventListener("mousedown", handleOnMouseMove, { passive: true })
      if (hover) window.addEventListener("mousemove", handleOnMouseMove, { passive: true })
      return () => {
        window.removeEventListener("mousedown", handleOnMouseMove)
        if (hover) window.removeEventListener("mousemove", handleOnMouseMove)
      }
    }
  })

  return { ref, open, setOpen }
}
