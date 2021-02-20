import useIntersectionObserver from "@react-hook/intersection-observer"
import { useRef } from "react"
import { useEffect } from "react"

const Observer = ({ children }) => {
  const ref = useRef(null)
  const isChanged = useRef(false)
  const { isIntersecting } = useIntersectionObserver(ref, { useMutationObserver: false })

  useEffect(() => {
    if (isIntersecting && !isChanged.current) {
      isChanged.current = true
    }

    return () => {}
  }, [isIntersecting])

  return (
    <div style={{ minHeight: 100 }} ref={ref}>
      {isChanged.current && children}
    </div>
  )
}

export default Observer
