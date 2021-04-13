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
  zIndex: 100,
  color: "primary",
  position: "absolute",
  top: "50%",
  paddingTop: 10,
  px: 2,
  height: 40,
}

export const ArrowNext = ({ icon, className, iconSize, ...props }: ArrowProps) => (
  <Box
    {...props}
    className={className}
    sx={{
      ...SharedStyle,
      left: [-30, null, -40, -50],
      ...props.sx,
    }}
  >
    <Icon size={iconSize} icon={icon} />
  </Box>
)
export const ArrowPrev = ({ icon, className, iconSize, ...props }: ArrowProps) => (
  <Box
    {...props}
    className={className}
    sx={{
      ...SharedStyle,
      right: [-30, null, -40, -50],
      ...props.sx,
    }}
  >
    <Icon size={iconSize} icon={icon} />
  </Box>
)

ArrowNext.defaultProps = { ...defaultProps, className: "next", icon: thinLeft }
ArrowPrev.defaultProps = { ...defaultProps, className: "prev", icon: thinRight }
