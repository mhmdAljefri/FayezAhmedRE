import { useEffect, useRef } from "react"

export default function useInterval(callback, delay, shouldReset = false) {
  const savedCallback = useRef(() => {})

  // Remember the latest callback.
  useEffect(() => {
    if (callback && callback !== savedCallback.current) savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      if (shouldReset) clearTimeout(id)
      return () => clearInterval(id)
    }
  }, [delay, shouldReset])
}
