import React, { ComponentPropsWithoutRef } from "react"
import { Box, SxStyleProp } from "theme-ui"
import { Icon, IconProp } from "react-icons-kit"
import { thinRight } from "react-icons-kit/entypo/thinRight"
import { thinLeft } from "react-icons-kit/entypo/thinLeft"

const defaultProps = {
  iconSize: 30,
}
type ArrowProps = {
  iconSize: number
  icon?: IconProp["icon"]
  sx?: SxStyleProp
} & ComponentPropsWithoutRef<"div">

const SharedStyle: SxStyleProp = {
  zIndex: 1,
  color: "primary",
  position: "absolute",
  top: "50%",
  paddingTop: 10,
  px: 1,
  height: 40,
  cursor: "pointer",
}

export const ArrowNext = ({ icon, iconSize, ...props }: ArrowProps) => (
  <Box
    {...props}
    className=""
    sx={{
      ...SharedStyle,
      left: 0,
      ...props.sx,
    }}
  >
    <Icon size={iconSize} icon={icon} />
  </Box>
)
export const ArrowPrev = ({ icon, iconSize, ...props }: ArrowProps) => (
  <Box
    {...props}
    className=""
    sx={{
      ...SharedStyle,
      right: 0,
      ...props.sx,
    }}
  >
    <Icon size={iconSize} icon={icon} />
  </Box>
)

ArrowNext.defaultProps = { ...defaultProps, icon: thinLeft }
ArrowPrev.defaultProps = { ...defaultProps, icon: thinRight }
