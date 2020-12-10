import React, { useRef } from "react"
import Carousel from "app/components/Slider"
import Slide from "app/components/Slide"
import { Box, Flex, SxStyleProp, Text } from "theme-ui"

import { Icon } from "react-icons-kit"
import { chevronCircleLeft } from "react-icons-kit/fa/chevronCircleLeft"
import { chevronCircleRight } from "react-icons-kit/fa/chevronCircleRight"
import { Carousel as CarouselProps } from "@prisma/client"

type HomeSliderProps = {
  slideStyle?: SxStyleProp
  onlyImages?: boolean
  data: CarouselProps[]
}

const HomeSlider = ({ slideStyle, onlyImages, data }: HomeSliderProps) => {
  const activeSlideRef = useRef(0)
  const renderDots = (dots) => {
    const half = Math.floor(dots.length / 2)
    const renderedDots = dots.map(({ index, active, onClick }) => {
      if (active) activeSlideRef.current = index
      const top = (half - index) * 30
      const left = index >= half ? -((half - index) * 15) : (half - index) * 15
      const size = active ? 25 : 15

      return (
        <Box
          key={index}
          role="button"
          onClick={onClick}
          aria-label={`dots-${index + 1}`}
          sx={{
            top: active && top ? top - 5 : top,
            left: active && left ? left - 5 : left,
            // left: active ? 45 : 50,
            position: "absolute",
            boxShadow: active && "default",
            backgroundColor: active ? "primary" : "transparent",
            borderColor: active ? "primary" : "#fefefe33",
            borderWidth: 2,
            borderStyle: "solid",
            borderRadius: size,
            height: size,
            width: size,
            "&:before": {
              content: '""',
              display: "inline-block",
              height: size + 3,
              width: size + 3,
              borderRadius: 555,
              marginRight: "-6px",
              marginTop: "-6px",

              borderStyle: "solid",
              borderColor: active ? "primary" : "transparent",
              borderWidth: 3,
            },
          }}
        />
      )
    })

    return (
      <Box
        sx={{
          display: ["none", null, "block"],
          position: "absolute",
          textShadow: "1px 1px 2px #000",
          top: "50%",
          width: half * 2 * 25,
          left: 100,
        }}
      >
        <Box sx={{ position: "relative", marginLeft: 100 }}>{renderedDots}</Box>
        <Flex sx={{ position: "relative", marginLeft: 250, minWidth: 150 }}>
          <Text sx={{ fontSize: 3, color: "white" }}>0{dots.length} \ </Text>
          <Text sx={{ fontSize: 6, fontWeight: "bolder", color: "primary" }}>
            0{activeSlideRef.current + 1}
          </Text>
        </Flex>
      </Box>
    )
  }
  return (
    <Carousel
      autoplay
      slideStyle={slideStyle}
      nextArrow={
        <Box sx={{ color: "primary", position: "absolute", left: [0, null, 100] }}>
          <Icon size={50} icon={chevronCircleLeft} />
        </Box>
      }
      prevArrow={
        <Box sx={{ color: "primary", position: "absolute", left: [100, null, 7 * 25 + 200] }}>
          <Icon size={50} icon={chevronCircleRight} />
        </Box>
      }
      renderDots={renderDots}
    >
      {data.map((item, index) => (
        <Slide onlyImages={onlyImages} {...item} key={index} />
      ))}
    </Carousel>
  )
}

export default HomeSlider
