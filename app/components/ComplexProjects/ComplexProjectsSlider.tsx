import React from "react"
import { Link } from "blitz"

import HTMLBox from "app/components/HTMLBox"
import OptmizationImage from "app/components/OptmizationImage"
import { SwiperSlide, Swiper } from "app/components/Sliders/Swiper"
import { Box, Grid, Text, Flex, Heading } from "theme-ui"

export default function ComplexProjectsSlider({ projects }) {
  return (
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
  )
}
