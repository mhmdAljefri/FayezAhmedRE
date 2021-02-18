import React from "react"
import { Box, Heading } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import dynamic from "next/dynamic"

const HomeSlider = dynamic(() => import("app/components/HomeSlider"), {
  ssr: false,
})

export default function HeroSection({ carouselVideo, carousels }) {
  const secureVideoUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.ap-south-1.amazonaws.com/${carouselVideo?.videoUlr}`

  return (
    <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {carouselVideo.isActive ? ( // todo add video
        <Box
          sx={{
            position: "relative",
            ":after": {
              position: "absolute",
              content: '""',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,

              backgroundColor: "#000",
              opacity: 0.5,
            },
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{ height: "100%", width: "100%", minHeight: "100vh", objectFit: "cover" }}
            controls={false}
          >
            <track kind="captions" />
            <source src={secureVideoUrl} type="video/mp4" />
            <source src={secureVideoUrl} type="video/ogg" />
            <source src={secureVideoUrl} type="video/webm" />
            <object data={secureVideoUrl}>
              <embed src={secureVideoUrl} />
            </object>
          </video>
        </Box>
      ) : (
        <HomeSlider slideStyle={{ height: "100vh" }} onlyImages data={carousels} />
      )}
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
          <Heading sx={{ fontSize: [5, 6], color: "primary" }}>الارتقاء بالحياة</Heading>
          <Heading sx={{ color: "white", textShadow: "1px 2px 5px #000" }}>
            يتلاقى مع اهتمامنا
          </Heading>
        </Wrapper>
      </Box>
    </Box>
  )
}
