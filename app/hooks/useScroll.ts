import { useEffect, useRef, useState } from "react"

export default function useScroll() {
  const prevScroll = useRef(0)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const isSSR = typeof window === "undefined"
    const handleScroll = () => {
      setScroll(window.pageYOffset)
    }
    if (!isSSR) {
      window.addEventListener("scroll", handleScroll)
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return scroll
}
