import React from "react"

import { ArrowNext, ArrowPrev } from "app/components/Arrows/SliderArrows"
import { SwiperSlide, Swiper } from "app/components/Sliders/Swiper"
import PartnersCard from "./PartnerCard"

export default function PartenersSlider({ parteners }) {
  return (
    <>
      <ArrowNext />
      <ArrowPrev />
      <Swiper
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        loop
        slidesPerView={4}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          500: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {parteners.map((partner, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <PartnersCard {...partner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
