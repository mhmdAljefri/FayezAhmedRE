import { useEffect, useState } from "react"

export default function useScroll() {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const isSSR = typeof window === "undefined"
    const handleScroll = () => {
      setScroll(window.pageYOffset)
    }
    if (!isSSR) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return scroll
}
