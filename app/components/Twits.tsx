import React from "react"
import { Heading } from "theme-ui"
import { useQuery } from "react-query"
import Wrapper from "./Wrapper"
import SlickSlider from "./Sliders/SlickSlider"
import { Icon } from "react-icons-kit"
import { twitter } from "react-icons-kit/fa/twitter"

const fetcher = () => fetch("/api/twits").then((res) => res.json())
export default function Twits() {
  const { data } = useQuery("/api/twits", fetcher)
  const twits = data?.data || []

  return (
    <Wrapper>
      <Heading sx={{ pt: 5, pb: 4, fontSize: [4, 5, 6] }}>
        <Icon icon={twitter} size={32} style={{ marginInlineEnd: 15, color: "#1da1f2" }} />
        <span>تغريدات حديثة</span>
      </Heading>
      <SlickSlider
        arrows={false}
        infinite
        dots={false}
        slidesToShow={3}
        slidesToScroll={1}
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
          <Heading key={id} sx={{ mt: 4, fontSize: [1, 1, 2], color: "text", textAlign: "center" }}>
            {text}
          </Heading>
        ))}
      </SlickSlider>
    </Wrapper>
  )
}
