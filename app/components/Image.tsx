import React, { ComponentPropsWithRef } from "react"
import { Image as ThemeImage, SxStyleProp } from "theme-ui"
import { makeS3Url } from "app/utils/aws"

type Props = ComponentPropsWithRef<"img"> & {
  sx?: SxStyleProp
  imageMaxWidth: number
}
export default function Image({ imageMaxWidth, ...props }: Props) {
  const src = makeS3Url(props.src)

  return <ThemeImage {...props} src={src} />
}

Image.defaultProps = {
  imageMaxWidth: 700,
}
