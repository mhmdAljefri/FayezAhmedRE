import React from "react"
import { Image } from "blitz"
import { SxStyleProp, Box } from "theme-ui"

type ArrowIconProps = {
  sx?: SxStyleProp
}

export default function ArrowIcon({ sx }: ArrowIconProps) {
  return (
    <Box sx={sx}>
      <Image src="/arrow.png" alt="///" layout="fill" />
    </Box>
  )
}
