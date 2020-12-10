import { Carousel } from "@prisma/client"
import React from "react"
import { Box, Flex, Heading, Text } from "theme-ui"

export type SlideProps = Carousel
type SlideTypeProps = SlideProps & {
  onlyImages?: boolean
}

const Slide = ({ title, text, image, onlyImages }: SlideTypeProps) => {
  return (
    <Flex
      sx={{
        alignItems: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        height: 700,
        maxHeight: "90vh",
        backgroundColor: "#eee",
        filter: "drop-shadow(0 0 60px black)",
        position: "relative",
        ":before": {
          content: '""',
          position: "absolute",
          top: 100,
          left: 100,
          right: 100,
          bottom: 100,
        },
      }}
    >
      {!onlyImages && (
        <Box
          sx={{
            position: "relative",
            zIndex: 222,
            maxWidth: 500,
            textShadow: "1px 1px 5px #000",
            marginX: [2, null, null, 3, 5],
          }}
        >
          <Heading sx={{ marginBottom: 50, color: "primary", fontSize: 7 }}>{title}</Heading>
          <Text sx={{ color: "white", fontSize: 3, fontWeight: "900" }}>{text}</Text>
        </Box>
      )}
    </Flex>
  )
}

export default Slide
