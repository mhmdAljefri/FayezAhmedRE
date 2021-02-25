import useScreenSize from "app/hooks/useScreenSize"
import React, { useState } from "react"
import { Box, Heading, Text } from "theme-ui"
import OptmizationImage from "./OptmizationImage"

export type SlideProps = {
  image: string
  title?: string | null
  text?: string | null
  url?: string | null
  opacity?: number
}
type SlideTypeProps = SlideProps & {
  onlyImages?: boolean
}

const Slide = ({ title, opacity = 0.4, text, image, url, onlyImages }: SlideTypeProps) => {
  const isDisktop = useScreenSize() > 720
  const [loaded, setLoaded] = useState(false)
  const Wrapper = ({ children, ...props }) =>
    url ? (
      <a {...props} style={{ display: "block" }} href={url}>
        {children}
      </a>
    ) : (
      <div {...props}>{children}</div>
    )
  return (
    <Wrapper className={loaded ? "animate__animated animate__zoomIn" : undefined}>
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#000",
          opacity,
          top: 0,
          left: 0,
          zIndex: 1,
          right: 0,
          bottom: 0,
        }}
      />
      <OptmizationImage
        src={image}
        alt=".."
        onLoad={() => setLoaded(true)}
        width={1280}
        height={isDisktop ? 720 : 960}
        layout="responsive"
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
    </Wrapper>
  )
}

export default Slide
