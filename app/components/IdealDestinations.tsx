import { Link } from "blitz"
import React from "react"
import { Box, Heading, Text } from "theme-ui"
import Image from "./Image"
import SlickSlider from "./Sliders/SlickSlider"
import Wrapper from "./Wrapper"

export default function IdealDestinations({ explores }) {
  return (
    <Box sx={{ backgroundColor: "dark", pb: 4 }}>
      <Wrapper>
        <Heading sx={{ pt: 4, pb: 4, fontSize: [4, 5, 6], paddingInlineEnd: 20, color: "primary" }}>
          وجهات مثالية للجميع
        </Heading>

        <SlickSlider
          arrows={false}
          infinite
          autoplay
          slidesToShow={3}
          slidesToScroll={3}
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
          {explores.map(({ title, countryId, image, id }) => (
            <Link passHref href={`/countries/${countryId}/explore/${id}`} key={id}>
              <a style={{ textDecoration: "none" }}>
                <Image
                  sx={{
                    width: [200, 250],
                    height: [200, 250],
                    marginY: 10,
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
                <Text sx={{ mt: 4, textAlign: "center", color: "white" }}>{title}</Text>
              </a>
            </Link>
          ))}
        </SlickSlider>
      </Wrapper>
    </Box>
  )
}
