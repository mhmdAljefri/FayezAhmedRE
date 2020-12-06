import React from "react"
import { Image, SxStyleProp } from "theme-ui"

type ArrowIconProps = {
  sx?: SxStyleProp
}

export default function ArrowIcon({ sx }: ArrowIconProps) {
  return <Image sx={sx} src="/arrow.png" alt="///" />
}
