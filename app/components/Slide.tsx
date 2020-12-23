import { Link } from "blitz"
import React from "react"
import { Box, Button, Flex, Heading, Text } from "theme-ui"

export type SlideProps = {
  image: string
  title?: string | null
  text?: string | null
  path?: string
}
type SlideTypeProps = SlideProps & {
  onlyImages?: boolean
}

const Slide = ({ title, text, image, path, onlyImages }: SlideTypeProps) => {
  return (
    <Flex
      sx={{
        alignItems: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundColor: "#eee",
        height: "100%",
        filter: "drop-shadow(0 0 60px black)",
        position: "relative",
        animation: `fadeIn 0.5s`,
        ":before": {
          content: '""',
          position: "absolute",
          backgroundColor: "#000",
          opacity: 0.5,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      {!onlyImages && (
        <Box
          sx={{
            position: "relative",
            zIndex: 222,
            maxWidth: 500,
            paddingY: 7,
            textShadow: "1px 1px 5px #000",
            marginX: [3, null, 5],
          }}
        >
          <Heading sx={{ marginBottom: 50, color: "primary", fontSize: 7 }}>{title}</Heading>
          <Text sx={{ color: "white", fontSize: 3, fontWeight: "900" }}>{text}</Text>
          {path && (
            <Link href={path}>
              <Button>التفاصيل </Button>
            </Link>
          )}
        </Box>
      )}
    </Flex>
  )
}

export default Slide
