import { Image } from "blitz"
import { ImageProps } from "next/image"
import React from "react"

// res.cloudinary.com/f_auto,c_limit,w_3840/http://res.cloudinary.com/dco7dcmbq/image/upload/v1609191146/19-copy_ustxoa.jpg
// res.cloudinary.com/f_auto,c_limit,w_3840/v1609191146/19-copy_ustxoa.jpg

type Props = ImageProps
export default function CloudinaryImage({ src, ...props }: Props) {
  const normlizedSrc = src.replace("http://res.cloudinary.com/dco7dcmbq/image/upload", "")

  return <Image src={normlizedSrc} {...props} />
}
