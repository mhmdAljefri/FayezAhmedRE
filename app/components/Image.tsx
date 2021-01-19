import React, { ComponentPropsWithRef } from "react"
import { Image as ThemeImage, SxStyleProp } from "theme-ui"

type Props = ComponentPropsWithRef<"img"> & {
  sx?: SxStyleProp
}
export default function Image(props: Props) {
  const src = props.src?.replace("/upload/", `/upload/q_auto,w_${700}/`)

  return <ThemeImage {...props} src={src} />
}
