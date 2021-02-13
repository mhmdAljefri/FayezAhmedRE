import { Link } from "blitz"
import React from "react"
import { Box, Heading, Text } from "theme-ui"
import Image from "./Image"
import { Swiper, SwiperSlide } from "./Sliders/Swiper"
import Wrapper from "./Wrapper"

export default function IdealDestinations({ explores }) {
  return (
    <Box
      sx={{
        backgroundColor: "dark",
        pb: 4,
        backgroundAttachment: "fixed",
        backgroundImage: "url(/back2.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Wrapper>
        <Heading sx={{ pt: 4, pb: 4, fontSize: [4, 5, 6], paddingInlineEnd: 20, color: "primary" }}>
          وجهات مثالية للجميع
        </Heading>

        <Swiper
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
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          pagination={{
            clickable: true,
          }}
        >
          {explores.map(({ title, countryId, image, id }) => (
            <SwiperSlide key={id} virtualIndex={id}>
              <Link passHref href={`/countries/${countryId}/explore/${id}`}>
                <a style={{ textDecoration: "none" }}>
                  <Image
                    sx={{
                      width: [200, 250],
                      height: [200, 250],
                      marginY: 10,
                      display: "block",
                      mx: "auto",
                      borderWidth: [3, 4],
                      borderColor: "primary",
                      borderStyle: "solid",
                      borderRadius: 11111,
                      objectFit: "cover",
                      transition: "all 0.5s",
                      ":hover": {
                        marginY: 0,
                        width: [220, 270],
                        height: [220, 270],
                      },
                    }}
                    alt={title}
                    src={image}
                  />
                  <Text sx={{ mt: 4, textAlign: "center", color: "white", mb: 5 }}>{title}</Text>
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
    </Box>
  )
}
