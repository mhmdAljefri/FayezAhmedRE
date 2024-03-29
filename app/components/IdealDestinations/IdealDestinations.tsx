import { Link } from "blitz"
import React from "react"
import { Box, Text } from "theme-ui"
import OptmizationImage from "../OptmizationImage"
import { Swiper, SwiperSlide } from "../Sliders/Swiper"

export default function IdealDestinationsSwiper({ explores }) {
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        // when window width is >= 480px
        520: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        780: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
    >
      {explores.map(({ title, countryId, image, id }) => (
        <SwiperSlide key={id} virtualIndex={id}>
          <Link passHref href={`/countries/${countryId}/explore/${id}`}>
            <a style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  width: [200, 250],
                  height: [200, 250],
                  marginY: 10,
                  position: "relative",
                  display: "block",
                  mx: "auto",
                  borderWidth: [3, 4],
                  borderColor: "primary",
                  borderStyle: "solid",
                  borderRadius: 11111,
                  overflow: "hidden",
                  transition: "all 0.5s",
                  ":hover": {
                    marginY: 0,
                    width: [220, 270],
                    height: [220, 270],
                  },
                }}
              >
                <OptmizationImage objectFit="cover" layout="fill" alt={title} src={image} />
              </Box>
              <Text sx={{ mt: 4, textAlign: "center", color: "white", mb: 5 }}>{title}</Text>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
