import React from "react"
import { Box, Flex, Heading, Text } from "theme-ui"

type SlideProps = {}

const Slide = (props: SlideProps) => {
  return (
    <Flex
      sx={{
        alignItems: "center",
        backgroundImage: "url(/slide1.png)",
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
          backgroundColor: "rgba(0,0,0,0.3)",
          boxShadow: "0 0 30px 30px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 222,
          maxWidth: 500,
          textShadow: "1px 1px 5px #000",
          marginX: [2, null, null, 3, 5],
        }}
      >
        <Heading sx={{ marginBottom: 50, color: "primary", fontSize: 7 }}>العنوان</Heading>
        <Text sx={{ color: "white", fontSize: 3, fontWeight: "900" }}>
          النص النص النصالنصالنص النصالنصالنص النص النصالنصالنصالنصالنص النصالنصال نصالنصالنصالنص
          نصالنصالنصالنصنصالنصالنصالنص نصالنصالنصالنص نصالنصالنصالنص نصالنصالنصالنص نصالنصالنصالنص
          النص النص النص
        </Text>
      </Box>
    </Flex>
  )
}

export default Slide
