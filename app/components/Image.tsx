import React, { ComponentPropsWithRef } from "react"
import { Image as ThemeImage, SxStyleProp } from "theme-ui"

type Props = ComponentPropsWithRef<"img"> & {
  sx?: SxStyleProp
  imageMaxWidth: number
}
export default function Image({ imageMaxWidth, ...props }: Props) {
  const src = props.src?.replace("http://", "https://").replace(/(.jpg|.jpeg|.png)/, ".webp")

  return <ThemeImage {...props} src={src} />
}

Image.defaultProps = {
  imageMaxWidth: 700,
}
