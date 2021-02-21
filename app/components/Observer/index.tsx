import useIntersectionObserver from "@react-hook/intersection-observer"
import { useRef } from "react"
import { useEffect } from "react"

// don't use will lazy load component is exist
/**
 * instead of this
 * @example
 * import LazyLoad from 'react-lazyload';

 */
const Observer = ({ children }) => {
  const ref = useRef(null)
  const isChanged = useRef(false)
  const { isIntersecting } = useIntersectionObserver(ref, {
    useMutationObserver: false,
    rootMargin: "100% 0% 0% 0%",
  })

  useEffect(() => {
    if (isIntersecting && !isChanged.current) {
      isChanged.current = true
    }

    return () => {}
  }, [isIntersecting])

  return (
    <div style={{ minHeight: 10 }} ref={ref}>
      {isChanged.current && children}
    </div>
  )
}

export default Observer
