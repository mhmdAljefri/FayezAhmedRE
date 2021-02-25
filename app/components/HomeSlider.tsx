import React from "react"
import Carousel from "app/components/Slider"
import Slide, { SlideProps } from "app/components/Slide"
import { SxStyleProp } from "theme-ui"

type HomeSliderProps = {
  slideStyle?: SxStyleProp
  onlyImages?: boolean
  data: SlideProps[]
}

const HomeSlider = ({ slideStyle, onlyImages, data }: HomeSliderProps) => {
  return (
    <Carousel autoplay nextArrow={<div />} prevArrow={<div />}>
      {data.map((item, index) => (
        <Slide onlyImages={onlyImages} sx={slideStyle} {...item} key={index} />
      ))}
    </Carousel>
  )
}

export default HomeSlider
