import { useEffect, useRef, useState } from "react"

export default function useScreenSize() {
  const [size, setSize] = useState(0)
  const prevSizeRef = useRef(0)

  useEffect(() => {
    const isSSR = typeof window === "undefined"
    if (!isSSR) {
      const handelSize = () => {
        const windowSize = window.innerWidth
        if (prevSizeRef.current !== windowSize) {
          prevSizeRef.current = windowSize
          setSize(windowSize)
        }
      }

      handelSize()
      window.addEventListener("resize", handelSize)
      return () => {
        window.removeEventListener("resize", handelSize)
      }
    }
  }, [setSize])

  return size
}
