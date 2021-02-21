import React, { ComponentPropsWithRef, useState } from "react"
import { Image as ThemeImage, SxStyleProp } from "theme-ui"
import { makeS3Url } from "app/utils"
type Props = ComponentPropsWithRef<"img"> & {
  sx?: SxStyleProp
  imageMaxWidth: number
}
export default function Image({ imageMaxWidth, ...props }: Props) {
  const s3Url = makeS3Url(props.src)
  const [src, setSrc] = useState(s3Url)

  const handleImageError = (error) => {
    if (src === s3Url) setSrc(props.src || "")
  }

  return <ThemeImage {...props} onError={handleImageError} src={src} />
}

Image.defaultProps = {
  imageMaxWidth: 700,
}
