import React from "react"
import { Box, Heading, Flex } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import { Partner } from "@prisma/client"
import { ArrowNext, ArrowPrev } from "app/components/Arrows/SliderArrows"
import OptmizationImage from "app/components/OptmizationImage"
import { SwiperSlide, Swiper } from "app/components/Sliders/Swiper"

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

type OurPartnersSectionProps = {
  data: Partner[]
}

export default function OurPartnersSection(props: OurPartnersSectionProps) {
  return (
    <Box sx={{ paddingTop: 5, paddingBottom: 5, backgroundColor: "light" }}>
      <Wrapper sx={{ position: "relative" }}>
        <Heading sx={{ marginBottom: 5, fontSize: [4, 6] }}>شركائنا</Heading>
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
          {props.data.map((partner, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <PartnersCard {...partner} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
    </Box>
  )
}
