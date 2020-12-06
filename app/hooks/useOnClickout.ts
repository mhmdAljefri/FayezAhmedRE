import { useEffect, useRef, useState } from "react"

export default function useOnClickout() {
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
      window.addEventListener("mousedown", handleOnMouseMove, false)
      return () => {
        window.removeEventListener("mousedown", handleOnMouseMove, false)
      }
    }
  })

  return { ref, open, setOpen }
}
