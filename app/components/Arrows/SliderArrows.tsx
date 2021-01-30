import React, { ComponentPropsWithoutRef } from "react"
import { Box, SxStyleProp } from "theme-ui"
import { Icon } from "react-icons-kit"
import { arrows_right } from "react-icons-kit/linea/arrows_right"
import { arrows_left } from "react-icons-kit/linea/arrows_left"

type ArrowProps = {
  sx?: SxStyleProp
} & ComponentPropsWithoutRef<"div">

export const ArrowNext = (props: ArrowProps) => (
  <Box
    {...props}
    className=""
    sx={{ zIndex: 1, color: "primary", position: "absolute", top: "50%", ...props.sx }}
  >
    <Icon size={36} icon={arrows_left} />
  </Box>
)
export const ArrowPrev = (props: ArrowProps) => (
  <Box
    {...props}
    className=""
    sx={{ zIndex: 1, color: "primary", position: "absolute", right: 0, top: "50%", ...props.sx }}
  >
    <Icon size={36} icon={arrows_right} />
  </Box>
)
