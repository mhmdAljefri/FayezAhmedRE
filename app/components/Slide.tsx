import React from "react"
import { Box, Flex, Heading, SxStyleProp, Text } from "theme-ui"
import OptmizationImage from "./OptmizationImage"

const defaultProps = {
  opacity: 0.5,
}
export type SlideProps = {
  image: string
  title?: string | null
  text?: string | null
  url?: string | null
  opacity?: number
}
type SlideTypeProps = SlideProps & {
  onlyImages?: boolean
  sx?: SxStyleProp
}

const Slide = ({ title, opacity, text, sx, image, url, onlyImages }: SlideTypeProps) => {
  const Wrapper = ({ children }) => (url ? <a href={url}>{children}</a> : <>{children}</>)
  return (
    <Wrapper>
      <Flex
        sx={{
          alignItems: "center",
          backgroundColor: "#eee",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "inherit",
          filter: "drop-shadow(0 0 60px black)",
          position: "relative",
          animation: `zoomIn 1s`,
          ":before": {
            content: '""',
            position: "absolute",
            backgroundColor: "#000",
            opacity,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          ...sx,
        }}
      >
        <OptmizationImage
          src={image}
          alt=".."
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
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
          </Box>
        )}
      </Flex>
    </Wrapper>
  )
}

Slide.defaultProps = defaultProps
export default Slide
