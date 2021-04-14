import React from "react"
import Slide, { SlideProps } from "app/components/Slide"
import { SxStyleProp } from "theme-ui"
import SwiperCore, { Swiper, SwiperSlide } from "./Sliders/Swiper"
import { EffectFade } from "swiper"

type HomeSliderProps = {
  slideStyle?: SxStyleProp
  onlyImages?: boolean
  data: SlideProps[]
}

SwiperCore.use([EffectFade])

const HomeSlider = ({ slideStyle, onlyImages, data }: HomeSliderProps) => {
  return (
    <Swiper
      autoplay={{
        disableOnInteraction: false,
      }}
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
    >
      {data.map((item, index) => (
        <SwiperSlide className="no-padding" key={index}>
          <Slide opacity={0} onlyImages={onlyImages} sx={slideStyle} {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HomeSlider
