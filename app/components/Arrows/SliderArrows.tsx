import React from "react"
import { Box } from "theme-ui"
import { Icon } from "react-icons-kit"
import { arrows_right } from "react-icons-kit/linea/arrows_right"
import { arrows_left } from "react-icons-kit/linea/arrows_left"

export const ArrowNext = (props) => (
  <Box
    {...props}
    className=""
    sx={{ zIndex: 1, color: "primary", position: "absolute", top: "50%" }}
  >
    <Icon size={36} icon={arrows_left} />
  </Box>
)
export const ArrowPrev = (props) => (
  <Box
    {...props}
    className=""
    sx={{ zIndex: 1, color: "primary", position: "absolute", right: 0, top: "50%" }}
  >
    <Icon size={36} icon={arrows_right} />
  </Box>
)
