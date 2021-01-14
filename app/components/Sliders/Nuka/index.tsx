import React, { ReactNode } from "react"
import Carousel, { CarouselProps } from "nuka-carousel"

type Props = CarouselProps & {
  children: ReactNode[]
}
export default function NukaSLider(props: Props) {
  return <Carousel {...props} />
}
