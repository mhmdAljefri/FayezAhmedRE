import React from "react"
import { ArrowNext, ArrowPrev } from "app/components/Arrows/SliderArrows"
import { arrows_slim_right } from "react-icons-kit/linea/arrows_slim_right"
import { arrows_slim_left } from "react-icons-kit/linea/arrows_slim_left"
import { SxStyleProp } from "theme-ui"

const sharedStyle: SxStyleProp = {
  opacity: 0.7,
  ":hover": {
    opacity: 1,
  },
}
export function ArrowLeft(props) {
  return <ArrowNext {...props} sx={{ ...sharedStyle }} iconSize={45} icon={arrows_slim_left} />
}
export function ArrowRight(props) {
  return <ArrowPrev {...props} sx={{ ...sharedStyle }} iconSize={45} icon={arrows_slim_right} />
}
