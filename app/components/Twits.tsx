import React, { Suspense } from "react"
import { Box, Heading } from "theme-ui"
import { useQuery } from "react-query"
import Wrapper from "./Wrapper"
import { Icon } from "react-icons-kit"
import { twitter } from "react-icons-kit/fa/twitter"
import { ArrowNext, ArrowPrev } from "./Arrows/SliderArrows"
import TwitCard from "./Cards/TwitCard"
import { SwiperSlide, Swiper } from "./Sliders/Swiper"
const fetcher = () => fetch("/api/twits").then((res) => res.json())

function TwitsList() {
  const { data } = useQuery("/api/twits", fetcher)
  const twits = data?.data

  if (!twits) return <Box sx={{ px: 3, textAlign: "center", py: 4 }}>للاسف لاتوجد تغريدات</Box>

  return (
    <Wrapper sx={{ position: "relative" }}>
      <Heading sx={{ marginBottom: 5, fontSize: [4, 6] }}>شركائنا</Heading>
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

export default function Twits() {
  return (
    <Box
      sx={{
        backgroundColor: "light",
      }}
    >
      <Wrapper>
        <Heading sx={{ pt: 5, pb: 4, fontSize: [4, 5, 6] }}>
          <Icon icon={twitter} size={32} style={{ marginInlineEnd: 15, color: "#1da1f2" }} />
          <span>اخر الاخبار</span>
        </Heading>
        <Suspense
          fallback={[
            ...Array(3).map((_, index) => (
              <TwitCard key={index} id={index} text="جاري التحميل..." />
            )),
          ]}
        >
          <TwitsList />
        </Suspense>
      </Wrapper>
    </Box>
  )
}
