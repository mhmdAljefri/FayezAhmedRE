import BigIconText from "app/components/BigIconBox"
// import SelectionBox from "app/components/SelectionBox"
import Wrapper from "app/components/Wrapper"
import React, { useState } from "react"
import { Box, Button, Flex, Heading, Image, Link, Text } from "theme-ui"
import Layout from "./Layout"

import { building } from "react-icons-kit/fa/building"
import { money } from "react-icons-kit/fa/money"
import { minusSquare } from "react-icons-kit/fa/minusSquare"
import { mapMarker } from "react-icons-kit/fa/mapMarker"
import { key } from "react-icons-kit/fa/key"
import { checkSquare } from "react-icons-kit/fa/checkSquare"
import Contact from "app/components/Forms/Contact"
import SlickSlider from "app/components/SlickSlider"

export default function ProjectDetailsLayout({
  name,
  details,
  subTitle,
  status,
  image,
  gallery,
  floorplan,
  brochure,
  country,
  features,
  constructingUpdateVideo,
  constructingUpdatePrview,
  nearBy,
  roomsWithPrices,
  location,
}) {
  const isCompleted = status === "completed"
  const statusText = isCompleted ? "مكتمل" : "قيد البناء"

  const [room, setRoom] = useState(0)
  const roomWithPrice = roomsWithPrices[room]

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
          <Image sx={{ borderRadius: 15, marginTop: -6, width: "100%" }} src="/slide1.png" />
          <Heading sx={{ fontSize: 6, marginY: 3 }}>{name}</Heading>
          <Text sx={{ fontSize: 4 }}>{subTitle}</Text>

          <Flex sx={{ marginBottom: 2, marginTop: 4 }}>
            {roomsWithPrices.map((item, index) => (
              <Button onClick={() => setRoom(index)} variant="link">
                {item.room}
              </Button>
            ))}
          </Flex>
          <Flex>
            <Box sx={{ marginInlineEnd: 30, width: 250 }}>
              <Text
                sx={{
                  fontSize: 5,
                  color: "primary",
                  borderBottom: "2px solid #eee",
                  borderColor: "primary",
                }}
              >
                AED price
              </Text>
              <Text sx={{ paddingY: 3, fontSize: 3 }}>
                السعر يبداء من <span>{roomWithPrice?.price}</span>
              </Text>
            </Box>
            <Box sx={{ marginInlineEnd: 30, width: 250 }}>
              <Text
                sx={{
                  fontSize: 5,
                  color: "primary",
                  borderBottom: "2px solid #eee",
                  borderColor: "primary",
                }}
              >
                <span>{statusText}</span>
              </Text>
              <Text sx={{ paddingY: 3, fontSize: 3 }}>حالة المشروع</Text>
            </Box>
          </Flex>
          <Text sx={{ marginY: 5 }}>{details}</Text>

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
            <Heading sx={{ fontSize: 6, color: "white", marginBottom: 4, marginTop: 3 }}>
              {name}
            </Heading>
            <Flex sx={{ justifyContent: "space-evenly" }}>
              <BigIconText icon={building} text="شقق وفلل" />
              <BigIconText icon={money} text="كاش" />
              <BigIconText icon={mapMarker} text={country.name} />
              <BigIconText icon={key} text={new Date().getFullYear()} />
              <BigIconText icon={isCompleted ? checkSquare : minusSquare} text={statusText} />
            </Flex>
          </Box>
        </Wrapper>
        <Box sx={{ paddingY: 6, backgroundColor: "dark" }}>
          <Wrapper>
            <Heading sx={{ color: "white", fontSize: [5, null, 6] }}>المعرض</Heading>
          </Wrapper>
        </Box>

        <Wrapper sx={{ marginTop: -5 }}>
          <Flex sx={{ justifyContent: "center", overflow: "auto" }}>
            {gallery.map((item, index) => (
              <Image
                key={item + "_" + index}
                sx={{
                  width: "30%",
                  maxWidth: 350,
                  minWidth: 280,
                  borderRadius: 15,
                  margin: 3,
                  boxShadow: "default",
                  height: "30vw",
                  maxHeight: 350,
                }}
                src={item}
              />
            ))}
          </Flex>
        </Wrapper>
        {constructingUpdateVideo && (
          <Wrapper sx={{ marginY: 5 }}>
            <Heading sx={{ marginBottom: 4, fontSize: [5, null, 6] }}>حالة المشروع</Heading>
            <Box
              sx={{
                marginX: [1, null, 6],
                borderRadius: "default",
                boxShadow: "card",
                height: [250, 300, 350, 450],
              }}
            >
              <video
                width="100%"
                height="100%"
                poster={constructingUpdatePrview}
                // poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
                controls
              >
                <track kind="captions" />
                <source src={constructingUpdateVideo} type="video/mp4" />
                <source src={constructingUpdateVideo} type="video/ogg" />
                <source src={constructingUpdateVideo} type="video/webm" />
                <object data={constructingUpdateVideo}>
                  <embed src={constructingUpdateVideo} />
                </object>
              </video>
            </Box>
          </Wrapper>
        )}
        <Wrapper sx={{ marginY: 6 }}>
          <Heading sx={{ paddingBottom: 5, fontSize: [5, null, 6] }}>المخططات</Heading>
          <Flex sx={{ justifyContent: "space-evenly", overflow: "auto" }}>
            {floorplan.map((item, index) => (
              <Image
                key={item + "_" + index}
                sx={{
                  borderColor: "primary",
                  objectFit: "cover",
                  marginX: 2,
                  width: ["90vw", 350],
                  minWidth: ["90vw", 300],
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderRadius: 15,
                  boxShadow: "default",
                  height: [300, 350],
                }}
                src={item}
              />
            ))}
          </Flex>
        </Wrapper>
        <Box sx={{ backgroundColor: "light", paddingY: 5 }}>
          <Wrapper>
            <Box>
              <Heading sx={{ fontSize: [5, null, 6] }}>وسائل الراحة والمزايا</Heading>
              <Text sx={{ fontSize: 3, marginBottom: 5 }}>عالم من الراحة الجمال في التصميم</Text>
            </Box>

            <SlickSlider
              slidesToShow={3}
              slidesToScroll={3}
              sx={{ justifyContent: "center", marginY: 3 }}
            >
              {features.map((feat) => (
                <Text
                  sx={{
                    margin: 2,
                    backgroundColor: "primary",
                    textAlign: "center",
                    fontWeight: 700,
                    paddingX: 3,
                    paddingY: 5,
                    fontSize: 5,
                    color: "white",
                    boxShadow: "default",
                    width: 250,
                    borderRadius: "default",
                  }}
                >
                  {feat}
                </Text>
              ))}
            </SlickSlider>
            <Link
              download={name}
              target="_blank"
              rel="noopener "
              href={brochure}
              sx={{
                opacity: brochure ? 1 : 0.3,
                backgroundColor: "background",
                color: "heading",
                borderRadius: "md",
                maxWidth: 250,
                display: "block",
                border: "primary",
                borderColor: "primary",
                marginX: "auto",
                marginY: 5,
                paddingY: 1,
                paddingX: 2,
                textAlign: "center",
              }}
            >
              تنزيل البروشور
            </Link>
          </Wrapper>

          <Wrapper>
            <Heading>بالجوار</Heading>
            <SlickSlider slidesToShow={1} slidesToScroll={1} responsive={[]} centerMode>
              {nearBy.map((item) => (
                <Box sx={{ textAlign: "center" }}>
                  <Image
                    sx={{
                      marginX: "auto",
                      width: [200, 300, 350],
                      height: [200, 300, 350],
                      borderRadius: 350,
                      borderWidth: 2,
                      borderColor: "primary",
                      borderStyle: "solid",
                    }}
                    src={item.image}
                    alt={item.name}
                  />
                  <Heading sx={{ marginTop: 4, marginBottom: 3 }} as="h3">
                    {item.name}
                  </Heading>
                  <Text>{item.description}</Text>
                </Box>
              ))}
            </SlickSlider>
          </Wrapper>
        </Box>
        <Wrapper>
          <Contact />
        </Wrapper>
      </div>
    </Layout>
  )
}