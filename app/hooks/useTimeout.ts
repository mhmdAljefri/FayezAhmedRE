import { useEffect, useRef } from "react"

export default function useTimeout(callback: () => any, delay: number, reseterValue?: any) {
  const savedCallback = useRef(() => {})
  const reseterValueRef = useRef<any>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback, reseterValue])

  // Set up the Timeout.
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }
    let id = setTimeout(tick, delay)

    console.log(reseterValueRef, reseterValue)

    // reset timer based on reseter values changes
    if (reseterValueRef.current !== reseterValueRef) {
      if (!reseterValueRef.current) clearTimeout(id) // if initlized
      reseterValueRef.current = reseterValueRef
    }
    return () => clearTimeout(id)
  }, [delay, reseterValue])
}
