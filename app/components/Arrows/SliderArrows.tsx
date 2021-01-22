import React from "react"
import { Box } from "theme-ui"
import { Icon } from "react-icons-kit"
import { chevronLeft } from "react-icons-kit/fa/chevronLeft"
import { chevronRight } from "react-icons-kit/fa/chevronRight"

export const ArrowNext = (props) => (
  <Box {...props} className="" sx={{ color: "primary", position: "absolute", top: "50%" }}>
    <Icon size={36} icon={chevronLeft} />
  </Box>
)
export const ArrowPrev = (props) => (
  <Box
    {...props}
    className=""
    sx={{ color: "primary", position: "absolute", right: 0, top: "50%" }}
  >
    <Icon size={36} icon={chevronRight} />
  </Box>
)
