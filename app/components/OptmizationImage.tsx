import React from "react"
import { Image as BlitzImage, ImageProps } from "blitz"
import { makeS3Url } from "app/utils"
type Props = ImageProps & {
  localImage?: boolean
}
export default function OptmizationImage({ localImage = false, src, ...props }: Props) {
  const s3Url = makeS3Url(src)

  return <BlitzImage {...props} decoding="sync" src={localImage ? src : s3Url} />
}
