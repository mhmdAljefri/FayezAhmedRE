import React, { ComponentPropsWithRef } from "react"
import { Image as ThemeImage, SxStyleProp } from "theme-ui"

type Props = ComponentPropsWithRef<"img"> & {
  sx?: SxStyleProp
}
export default function Image(props: Props) {
  const src = props.src?.replace("/upload/", `/upload/q_auto:low,w_${500}/`)

  return <ThemeImage {...props} src={src} />
}
