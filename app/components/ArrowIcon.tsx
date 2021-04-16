import React from "react"
import { Icon } from "react-icons-kit"
import { thinLeft } from "react-icons-kit/entypo/thinLeft"
import { Box, SxStyleProp } from "theme-ui"

type ArrowIconProps = {
  sx?: SxStyleProp
}

export default function ArrowIcon({ sx }: ArrowIconProps) {
  return (
    <Box sx={sx} as="span">
      <Icon icon={thinLeft} />
    </Box>
  )
}
