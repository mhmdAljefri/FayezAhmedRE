import React, { Suspense } from "react"
import { Box, Heading } from "theme-ui"
import { useQuery } from "react-query"
import Wrapper from "./Wrapper"
import SlickSlider from "./Sliders/SlickSlider"
import { Icon } from "react-icons-kit"
import { twitter } from "react-icons-kit/fa/twitter"
import { ArrowNext, ArrowPrev } from "./Arrows/SliderArrows"
import TwitCard from "./Cards/TwitCard"
const fetcher = () => fetch("/api/twits").then((res) => res.json())

function TwitsList() {
  const { data } = useQuery("/api/twits", fetcher)
  const twits = data?.data

  if (!twits) return <Box sx={{ px: 3, textAlign: "center", py: 4 }}>للاسف لاتوجد تغريدات</Box>

  return (
    <SlickSlider
      arrows
      infinite
      autoplay
      dots={false}
      slidesToShow={3}
      slidesToScroll={1}
      nextArrow={<ArrowNext />}
      prevArrow={<ArrowPrev />}
      responsive={[
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            rtl: true,
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            rtl: true,
          },
        },
        {
          breakpoint: 900,
          settings: {
            centerMode: false,
            vertical: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            rtl: true,
          },
        },
      ]}
    >
      {twits.map(({ text, id }) => (
        <TwitCard key={id} id={id} text={text} />
      ))}
    </SlickSlider>
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
