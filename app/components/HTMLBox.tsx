import React from "react"
import { SxStyleProp, Text } from "theme-ui"

type Props = {
  html: string
  sx?: SxStyleProp
}
export default function HTMLBox({ html, sx }: Props) {
  return (
    <Text
      sx={{
        ...sx,
        "*": {
          backgroundColor: (t) => `${t.colors.background} !important`,
          color: (t) => `${t.colors.text} !important`,
          fontFamily: "inherit",
        },
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
