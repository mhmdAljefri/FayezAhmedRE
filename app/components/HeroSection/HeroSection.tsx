import React from "react"
import { Box, Heading } from "theme-ui"
import Wrapper from "app/components/Wrapper"

import YoutubeVid from "./YoutubeVid"

import HomeSlider from "app/components/HomeSlider"

export default function HeroSection({ carouselVideo, carousels }) {
  const secureVideoUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.ap-south-1.amazonaws.com/${carouselVideo?.videoUlr}`

  return (
    <Box
      sx={{
        position: "relative",
        maxHeight: "calc(100vh - 30px)",
        overflow: "hidden",
        marginTop: -50,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          insetInline: 0,
          height: 50,
          backgroundImage: "linear-gradient(180deg, #ffffff8c, #ffffff03)",
          zIndex: 1,
        }}
      />

      {carouselVideo.isActive ? ( // todo add video
        <>
          <YoutubeVid secureVideoUrl={secureVideoUrl} />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 1,
              right: 0,
              paddingY: [100, 50],
            }}
          >
            <Wrapper>
              <Heading
                as="h1"
                sx={{ fontSize: [5, 6], textShadow: "1px 2px 5px #000", color: "primary" }}
              >
                الارتقاء بالحياة
              </Heading>
              <Heading sx={{ color: "white", textShadow: "1px 2px 5px #000" }}>
                يتلاقى مع اهتمامنا
              </Heading>
            </Wrapper>
          </Box>
        </>
      ) : (
        <HomeSlider slideStyle={{ height: "100vh" }} onlyImages data={carousels} />
      )}
    </Box>
  )
}
