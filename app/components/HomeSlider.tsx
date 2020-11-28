import React, { useRef } from "react"
import Carousel from "app/components/Slider"
import Slide from "app/components/Slide"
import { Box, Flex, SxStyleProp, Text } from "theme-ui"

import { Icon } from "react-icons-kit"
import { chevronCircleLeft } from "react-icons-kit/fa/chevronCircleLeft"
import { chevronCircleRight } from "react-icons-kit/fa/chevronCircleRight"

type HomeSliderProps = {
  slideStyle?: SxStyleProp
}

const HomeSlider = ({ slideStyle }: HomeSliderProps) => {
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
          role="button"
          onClick={onClick}
          aria-label={`dots-${index + 1}`}
          sx={{
            top: active && top ? top - 5 : top,
            left: active && left ? left - 5 : left,
            position: "absolute",
            boxShadow: "default",
            backgroundColor: active ? "primary" : "transparent",
            borderColor: active ? "primary" : "#fefefe",
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
      <Box sx={{ position: "absolute", top: "50%", width: half * 2 * 25, left: 100 }}>
        <Box sx={{ position: "relative", marginLeft: 100 }}>{renderedDots}</Box>
        <Flex sx={{ position: "relative", marginLeft: 250, minWidth: 150 }}>
          <Text sx={{ fontSize: 4, color: "white" }}>{activeSlideRef.current + 1} \ </Text>
          <Text sx={{ fontSize: 6, fontWeight: "bolder", color: "primary" }}>{dots.length}</Text>
        </Flex>
      </Box>
    )
  }
  return (
    <Carousel
      slideStyle={slideStyle}
      nextArrow={
        <Box sx={{ color: "primary", position: "absolute", left: 50 }}>
          <Icon size={50} icon={chevronCircleLeft} />
        </Box>
      }
      prevArrow={
        <Box sx={{ color: "primary", position: "absolute", left: 7 * 25 + 250 }}>
          <Icon size={50} icon={chevronCircleRight} />
        </Box>
      }
      renderDots={renderDots}
    >
      {[...Array(7)].map((_, index) => (
        <Slide key={index} />
      ))}
    </Carousel>
  )
}

export default HomeSlider
