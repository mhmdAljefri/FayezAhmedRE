import HomeSlider from "app/components/HomeSlider"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import Filter from "app/components/Forms/Filter"
import Carousel from "app/components/Slider"

import React from "react"
import { Box, Flex, Heading, Image, Text } from "theme-ui"
import { Icon } from "react-icons-kit"
import { mapMarker } from "react-icons-kit/fa/mapMarker"

export default function Country() {
  return (
    <Layout
      headerProps={{
        sx: { backgroundColor: "dark" },
      }}
      title="الدولة"
    >
      <Box
        sx={{
          paddingTop: 4,
          paddingBottom: 6,
          color: "white",
          backgroundColor: "dark",
        }}
      />
      <Wrapper sx={{ marginTop: -50 }}>
        <HomeSlider
          slideStyle={{
            borderRadius: "lg",
            overflow: "hidden",
          }}
        />
      </Wrapper>
      <Wrapper
        sx={{
          paddingX: [2, null, null, 6],
          marginTop: -5,
          position: "relative",
          zIndex: 222,
          marginBottom: 5,
        }}
      >
        <Filter />
      </Wrapper>
      <Wrapper>
        <Heading>إكتشف منزلك الجديد</Heading>
        <Carousel>
          {[...Array(3)].map(() => (
            <Flex>
              {[...Array(3)].map(() => (
                <Box
                  sx={{ borderRadius: "lg", margin: 4, overflow: "hidden", boxShadow: "default" }}
                >
                  <Image src="/istanbul.jpg" alt="..." />
                  <Box sx={{ margin: 3 }}>
                    <Heading>اسم المنزل</Heading>
                    <Box sx={{ marginTop: 4 }}>
                      <Text>
                        <Icon icon={mapMarker} />
                        اسنطنبول
                      </Text>
                      <Text sx={{ fontSize: 1 }}>وصف عن المنزل </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Flex>
          ))}
        </Carousel>
      </Wrapper>
    </Layout>
  )
}
