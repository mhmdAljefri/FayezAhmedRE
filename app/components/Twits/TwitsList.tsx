import React from "react"
import { Box } from "theme-ui"
import { useQuery } from "react-query"
import Wrapper from "app/components/Wrapper"
import { ArrowNext, ArrowPrev } from "app/components/Arrows/SliderArrows"
import TwitCard from "app/components/Cards/TwitCard"
import { SwiperSlide, Swiper } from "app/components/Sliders/Swiper"

const fetcher = () => fetch("/api/twits").then((res) => res.json())

export default function TwitsList() {
  const { data } = useQuery("/api/twits", fetcher)
  const twits = data?.data

  if (!twits) return <Box sx={{ px: 3, textAlign: "center", py: 4 }}>للاسف لاتوجد تغريدات</Box>

  return (
    <Wrapper sx={{ position: "relative" }}>
      <ArrowNext />
      <ArrowPrev />
      <Swiper
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        slidesPerView={4}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          480: {
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
        {twits.map(({ text, id }) => (
          <SwiperSlide key={id} virtualIndex={id}>
            <TwitCard id={id} text={text} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  )
}
