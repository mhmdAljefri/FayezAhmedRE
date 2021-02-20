import { Link } from "blitz"
import React from "react"
import { Box, Flex, Grid, Heading, Text } from "theme-ui"
import HTMLBox from "./HTMLBox"
import OptmizationImage from "./OptmizationImage"
import { SwiperSlide, Swiper } from "./Sliders/Swiper"
import Wrapper from "./Wrapper"

export default function ComplexProjects({ projects }) {
  return (
    <Box sx={{ backgroundColor: "light", py: 4 }}>
      <Wrapper
        sx={{
          ".upper--bullets": {
            top: [220, 280],
            maxHeight: 30,

            alignItems: "flex-start",
            justifyContent: "flex-end",
            ".swiper-pagination-bullet": {
              marginX: "8px",
            },
          },
        }}
      >
        <Heading sx={{ marginY: 5, fontSize: [5, 6] }}>مجمعات بارزة</Heading>
        <Swiper
          pagination={{
            modifierClass: "upper--",
            clickable: true,
          }}
          autoHeight
          slidesPerView={1}
        >
          {projects.map(
            ({
              id,
              country,
              city,
              name,
              housingComplexText,
              housingComplexImage,
              image,
              gallery,
              subTitle,
            }) => (
              <SwiperSlide key={id} virtualIndex={id}>
                <Box sx={{ overflow: "hidden" }}>
                  <Grid columns={2}>
                    <Box sx={{ height: 300 }}>
                      <Text
                        sx={{
                          fontSize: [3, 4],
                          marginBottom: 3,
                          color: "heading",
                          fontWeight: 700,
                        }}
                      >
                        <span>{country.name}</span>, <span>{city.name}</span>
                      </Text>
                      <Flex sx={{ alignItems: "center", flexWrap: ["wrap", "nowrap"] }}>
                        <Text sx={{ mb: 4 }}>{housingComplexText}</Text>
                        {housingComplexImage && (
                          <OptmizationImage
                            width={55}
                            height={60}
                            objectFit="contain"
                            src={housingComplexImage}
                            alt={housingComplexText || ""}
                          />
                        )}
                      </Flex>
                    </Box>
                    <Box sx={{ height: 300 }}>
                      <Link passHref href={`/countries/${country.id}/projects/${id}`}>
                        <Box
                          as="a"
                          sx={{
                            textAlign: "center",
                            cursor: "pointer",
                            marginRight: "auto",
                            display: "block",
                            mx: "auto",
                          }}
                        >
                          <OptmizationImage
                            width={250}
                            height={200}
                            objectFit="contain"
                            layout="intrinsic"
                            src={image}
                            alt={name}
                          />
                        </Box>
                      </Link>
                      <Link passHref href={`/countries/${country.id}/projects/${id}`}>
                        <a style={{ textDecoration: "none" }}>
                          <Heading
                            sx={{ paddingTop: 2, textAlign: "center", paddingBottom: 4 }}
                            as="h3"
                          >
                            {name}
                          </Heading>
                        </a>
                      </Link>
                    </Box>
                  </Grid>
                  <Box sx={{ cursor: "pointer", textAlign: "center", mx: "auto" }}>
                    <Link passHref href={`/countries/${country.id}/projects/${id}`}>
                      <a style={{ textDecoration: "none" }}>
                        <OptmizationImage
                          width={800}
                          height={400}
                          objectFit="contain"
                          src={gallery?.[0]}
                          alt={name}
                        />
                      </a>
                    </Link>
                  </Box>
                  <Box sx={{ pt: 3, textAlign: "center" }}>
                    <HTMLBox html={subTitle} />
                  </Box>
                </Box>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </Wrapper>
    </Box>
  )
}
