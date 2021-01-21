import { Link } from "blitz"
import React from "react"
import { Box, Flex, Grid, Heading, Text } from "theme-ui"
import HTMLBox from "./HTMLBox"
import Image from "./Image"
import SlickSlider from "./Sliders/SlickSlider"
import Wrapper from "./Wrapper"

export default function ComplexProjects({ projects }) {
  return (
    <Box>
      <Wrapper
        sx={{
          ".slick-dots": {
            top: 280,
            maxHeight: 30,

            alignItems: "flex-start",
            justifyContent: "flex-end",
            li: {
              width: [20, 30],
              height: [20, 30],
              "&button:before": {
                width: [20, 30],
                fontSize: [1, 2],
                height: [20, 30],
              },
            },
          },
        }}
      >
        <Heading sx={{ marginY: 5, fontSize: [5, 6] }}>مجمعات بارزة</Heading>
        <SlickSlider responsive={[]} arrows={false} infinite slidesToShow={1} slidesToScroll={1}>
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
              <Box key={id} sx={{ direction: "rtl", overflow: "hidden" }}>
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
                        <Image
                          sx={{ width: [50, 70], mx: 2 }}
                          src={housingComplexImage}
                          alt={housingComplexText || ""}
                        />
                      )}
                    </Flex>
                  </Box>
                  <Box>
                    <Link passHref href={`/countries/${country.id}/projects/${id}`}>
                      <Box
                        as="a"
                        sx={{
                          textAlign: "center",
                          cursor: "pointer",
                          marginRight: "auto",
                        }}
                      >
                        <Image
                          sx={{
                            objectFit: "contain",
                            mx: "auto",
                            maxWidth: 300,
                            width: "100%",
                          }}
                          src={image}
                          alt={name}
                        />
                      </Box>
                    </Link>
                    <Link passHref href={`/countries/${country.id}/projects/${id}`}>
                      <a style={{ textDecoration: "none" }}>
                        <Heading
                          sx={{ paddingTop: 3, textAlign: "center", paddingBottom: 4 }}
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
                      <Image
                        sx={{
                          objectFit: "contain",
                          height: [200, 300, 400],
                          maxWidth: 600,
                          mx: "auto",
                        }}
                        src={gallery?.[0] || ""}
                        alt={name}
                      />
                    </a>
                  </Link>
                </Box>
                <Box sx={{ pt: 3, textAlign: "center" }}>
                  <HTMLBox html={subTitle} />
                </Box>
              </Box>
            )
          )}
        </SlickSlider>
      </Wrapper>
    </Box>
  )
}
