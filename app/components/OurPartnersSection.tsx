import React from "react"
import { Box, Heading, Flex } from "theme-ui"
import Wrapper from "./Wrapper"
import { Partner } from "@prisma/client"
import SlickSlider from "./Sliders/SlickSlider"
import { ArrowNext, ArrowPrev } from "./Arrows/SliderArrows"
import OptmizationImage from "./OptmizationImage"

type PartnersCardProps = Partner

function PartnersCard({ image, name }: PartnersCardProps) {
  return (
    <Flex
      sx={{
        textAlign: "center",
        marginX: "auto",
        padding: 2,
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
          padding: 2,
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
    <Box sx={{ paddingTop: 5, paddingBottom: 7, marginTop: 6, backgroundColor: "light" }}>
      <Wrapper>
        <Heading sx={{ marginBottom: 5, fontSize: [4, 6] }}>شركائنا</Heading>

        <SlickSlider
          arrows
          infinite
          dots={false}
          slidesToShow={4}
          slidesToScroll={1}
          nextArrow={<ArrowNext />}
          prevArrow={<ArrowPrev />}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                rtl: true,
              },
            },
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                rtl: true,
              },
            },
            {
              breakpoint: 900,
              settings: {
                centerMode: false,
                vertical: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                rtl: true,
              },
            },
            {
              breakpoint: 600,
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
          {props.data.map((partner, index) => (
            <PartnersCard {...partner} key={index} />
          ))}
        </SlickSlider>
      </Wrapper>
    </Box>
  )
}
