import React, { ComponentPropsWithoutRef } from "react"
import { Box, SxStyleProp } from "theme-ui"
import { Icon } from "react-icons-kit"
import { arrows_right } from "react-icons-kit/linea/arrows_right"
import { arrows_left } from "react-icons-kit/linea/arrows_left"

type ArrowProps = {
  sx?: SxStyleProp
} & ComponentPropsWithoutRef<"div">

const SharedStyle: SxStyleProp = {
  zIndex: 1,
  backgroundColor: "background",
  color: "primary",
  position: "absolute",
  top: "50%",
} as const

export const ArrowNext = (props: ArrowProps) => (
  <Box
    {...props}
    className=""
    sx={{
      ...SharedStyle,
      left: 0,
      ...props.sx,
    }}
  >
    <Icon size={36} icon={arrows_left} />
  </Box>
)
export const ArrowPrev = (props: ArrowProps) => (
  <Box
    {...props}
    className=""
    sx={{
      ...SharedStyle,
      right: 0,
      ...props.sx,
    }}
  >
    <Icon size={36} icon={arrows_right} />
  </Box>
)
