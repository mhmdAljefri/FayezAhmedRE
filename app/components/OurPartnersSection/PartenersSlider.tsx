import React from "react"

import { ArrowNext, ArrowPrev } from "app/components/Arrows/SliderArrows"
import { SwiperSlide, Swiper } from "app/components/Sliders/Swiper"
import OptmizationImage from "../OptmizationImage"
import { Flex } from "theme-ui"
import { Partner } from "@prisma/client"

type PartnersCardProps = Partner

function PartnersCard({ image, name }: PartnersCardProps) {
  return (
    <Flex
      sx={{
        textAlign: "center",
        marginX: "auto",
        paddingX: 4,
        width: [170, 220],
        height: [170, 220],
        backgroundColor: "background",
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "md",
        position: "relative",
      }}
    >
      <OptmizationImage
        sx={{
          width: [150, 190],
          height: [150, 190],
          objectFit: "contain",
          objectPosition: "center",
        }}
        objectFit="contain"
        width={200}
        height={200}
        src={image}
        alt={name}
      />
    </Flex>
  )
}

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
