import BigIconText from "app/components/BigIconBox"
import SelectionBox from "app/components/SelectionBox"
import Wrapper from "app/components/Wrapper"
import React from "react"
import { Box, Flex, Heading, Image, Text } from "theme-ui"
import Layout from "./Layout"

import { building } from "react-icons-kit/fa/building"
import { money } from "react-icons-kit/fa/money"
import { dollar } from "react-icons-kit/fa/dollar"
import Contact from "app/components/Forms/Contact"

export default function ProjectDetailsLayout() {
  return (
    <Layout
      headerProps={{
        sx: {
          backgroundColor: "dark",
        },
      }}
    >
      <div>
        <Box
          sx={{
            paddingTop: 4,
            paddingBottom: 6,
            color: "white",
            backgroundColor: "dark",
          }}
        />
        <Wrapper>
          <Image sx={{ borderRadius: 15, marginTop: -6 }} src="/slide1.png" />
          <Heading sx={{ fontSize: 6, marginY: 3 }}>فهفمث</Heading>
          <Text sx={{ fontSize: 4 }}>نص هنا</Text>

          <Flex>
            <Box sx={{ marginInlineEnd: 30, width: 250 }}>
              <Text
                sx={{
                  fontSize: 4,
                  color: "primary",
                  borderBottom: "2px solid #eee",
                  borderColor: "primary",
                }}
              >
                AED price
              </Text>
              <Text>السعر يبداء من</Text>
            </Box>
            <Box sx={{ marginInlineEnd: 30, width: 250 }}>
              <Text
                sx={{
                  fontSize: 4,
                  color: "primary",
                  borderBottom: "2px solid #eee",
                  borderColor: "primary",
                }}
              >
                AED price
              </Text>
              <Text>السعر يبداء من</Text>
            </Box>
          </Flex>
          <Text sx={{ marginY: 5 }}>الوصف يكون هنا</Text>

          <Flex sx={{ justifyContent: "space-between", maxWidth: 600 }}>
            <SelectionBox />
            <SelectionBox />
          </Flex>

          <Box
            sx={{
              maxWidth: 800,
              marginTop: 5,
              marginBottom: -5,
              marginX: "auto",
              borderRadius: 15,
              paddingX: 3,
              paddingBottom: 5,
              paddingTop: 2,
              backgroundColor: "primary",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Heading sx={{ fontSize: 6, color: "white", marginBottom: 4 }}>title</Heading>
            <Flex sx={{ justifyContent: "space-evenly" }}>
              <BigIconText icon={building} text="text" />
              <BigIconText icon={money} text="text" />
              <BigIconText icon={dollar} text="text" />
              <BigIconText icon={dollar} text="text" />
              <BigIconText icon={dollar} text="text" />
            </Flex>
          </Box>
        </Wrapper>
        <Box sx={{ paddingY: 6, backgroundColor: "dark" }}>
          <Wrapper>
            <Heading sx={{ color: "white" }}>المعرض</Heading>
          </Wrapper>
        </Box>

        <Wrapper sx={{ marginTop: -5 }}>
          <Flex sx={{ justifyContent: "space-evenly" }}>
            <Image
              sx={{ width: 280, borderRadius: 15, boxShadow: "default", height: 280 }}
              src="/slide1.png"
            />
            <Image
              sx={{ width: 280, borderRadius: 15, boxShadow: "default", height: 280 }}
              src="/slide2.png"
            />
            <Image
              sx={{ width: 280, borderRadius: 15, boxShadow: "default", height: 280 }}
              src="/slide1.png"
            />
          </Flex>
        </Wrapper>
        <Wrapper sx={{ marginY: 6 }}>
          <Heading sx={{ paddingBottom: 5 }}>المخطوطات</Heading>
          <Flex sx={{ justifyContent: "space-evenly" }}>
            <Image
              sx={{
                borderColor: "primary",
                borderWidth: 2,
                borderStyle: "solid",
                width: 300,
                borderRadius: 15,
                boxShadow: "default",
                height: 300,
              }}
              src="/slide2.png"
            />
            <Image
              sx={{
                borderColor: "primary",
                borderWidth: 2,
                borderStyle: "solid",
                width: 300,
                borderRadius: 15,
                boxShadow: "default",
                height: 300,
              }}
              src="/slide1.png"
            />
          </Flex>
        </Wrapper>
        <Box sx={{ backgroundColor: "light", paddingY: 3 }}>
          <Wrapper>
            <Box>
              <Heading>وسائل الراحة والمزايا</Heading>
              <Text>عالم من الراحة الجمال في التصميم</Text>
            </Box>

            <Flex sx={{ justifyContent: "center", marginY: 3 }}>
              {[...Array(3)].map(() => (
                <Text
                  sx={{
                    margin: 2,
                    backgroundColor: "primary",
                    paddingX: 3,
                    paddingY: 4,
                    fontSize: 5,
                    color: "white",
                    boxShadow: "default",
                    width: 250,
                    borderRadius: "default",
                  }}
                >
                  الميزة
                </Text>
              ))}
            </Flex>
            <Box
              sx={{
                backgroundColor: "background",
                color: "heading",
                borderRadius: "md",
                maxWidth: 250,
                border: "primary",
                borderColor: "primary",
                marginX: "auto",
                marginBottom: 3,
                paddingY: 1,
                paddingX: 2,
                textAlign: "center",
              }}
            >
              تنزيل البروشور
            </Box>
          </Wrapper>

          <Wrapper>
            <Heading>بالجوار</Heading>
          </Wrapper>
        </Box>
        <Contact />
      </div>
    </Layout>
  )
}
