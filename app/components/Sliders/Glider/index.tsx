import React, { useEffect, useRef } from "react"
import Slider, { GliderMethods, GliderProps } from "react-glider"
import { Box } from "theme-ui"

type Props = GliderProps & {
  autoplay?: boolean
}
export default function Glider({ children, autoplay, ...props }: Props) {
  const gliderRef = useRef<GliderMethods>(null)
  const currentItemRef = useRef<number>(0)

  useEffect(() => {
    let timer
    if (autoplay) {
      currentItemRef.current += 1
      clearTimeout(timer)
      console.log({ autoplay, currentItemRef })
      timer = setTimeout(() => gliderRef.current?.scrollItem(currentItemRef.current), 5000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [autoplay])

  return (
    <Box sx={{ direction: "ltr" }}>
      <Slider {...props} ref={gliderRef}>
        {children}
      </Slider>
    </Box>
  )
}
