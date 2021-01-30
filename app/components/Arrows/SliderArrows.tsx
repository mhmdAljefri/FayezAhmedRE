import React, { ComponentPropsWithoutRef } from "react"
import { Box, SxStyleProp } from "theme-ui"
import { Icon } from "react-icons-kit"
import { chevronRight } from "react-icons-kit/fa/chevronRight"
import { chevronLeft } from "react-icons-kit/fa/chevronLeft"

type ArrowProps = {
  sx?: SxStyleProp
} & ComponentPropsWithoutRef<"div">

const SharedStyle: SxStyleProp = {
  zIndex: 1,
  color: "primary",
  position: "absolute",
  top: "50%",
  paddingTop: 10,
  px: 3,
  height: 40,
  cursor: "pointer",
}

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
    <Icon size={24} icon={chevronLeft} />
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
    <Icon size={24} icon={chevronRight} />
  </Box>
)
