import React, { useState, useLayoutEffect } from "react"
import OptmizationImage from "app/components/OptmizationImage"
import { useRouter, Link } from "blitz"
import { Box, Heading, Text } from "theme-ui"
import { Offer } from "@prisma/client"

type OfferCardProps = Pick<Offer, "id" | "name" | "image" | "subTitle" | "mainVideo"> & {
  prefixPath?: string
  hideOfferLabel?: boolean
}
export default function OfferCard({
  image,
  hideOfferLabel,
  subTitle,
  mainVideo,
  id,
  name,
  prefixPath = "/",
}: OfferCardProps) {
  const { asPath } = useRouter()
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null)
  const href = asPath + prefixPath + id
  const isYoutube = mainVideo?.startsWith("https://www.youtube")

  useLayoutEffect(() => {
    const isSSR = typeof window === "undefined"
    let timer
    if (isYoutube && youtubeUrl !== mainVideo && !isSSR) {
      timer = setTimeout(() => {
        setYoutubeUrl(mainVideo)
      }, 8000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isYoutube, youtubeUrl, mainVideo])

  console.log({ youtubeUrl })
  return (
    <Box
      sx={{
        width: ["90vw", null, 370],
        backgroundColor: "background",
        marginX: "auto",
        boxShadow: "default",
        marginBottom: 2,
      }}
    >
      <Link href={href}>
        <a>
          <Box sx={{ position: "relative" }}>
            {mainVideo ? (
              <Box sx={{ height: 240, paddingBottom: hideOfferLabel ? 0 : 40 }}>
                {isYoutube ? (
                  youtubeUrl && (
                    <iframe width="100%" height="100%" title="any" src={youtubeUrl}></iframe>
                  )
                ) : (
                  <video
                    width="100%"
                    height="100%"
                    poster={image || "any"}
                    // poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
                    controls
                  >
                    <track kind="captions" />
                    <source src={mainVideo} type="video/mp4" />
                    <source src={mainVideo} type="video/ogg" />
                    <source src={mainVideo} type="video/webm" />
                    <object data={mainVideo}>
                      <embed src={mainVideo} />
                    </object>
                  </video>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  height: 240,
                  ":hover + div": {
                    backgroundColor: "primary",
                  },
                }}
              >
                <OptmizationImage objectFit="cover" layout="fill" src={image as string} />
              </Box>
            )}

            {!hideOfferLabel && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  textAlign: "center",
                  left: 0,
                  right: 0,
                  lineHeight: "40px",
                  height: 40,
                  backgroundColor: "dark",
                  color: "white",
                  transition: "all 0.5s linear",
                  ":hover": {
                    backgroundColor: "primary",
                  },
                }}
              >
                العرض الحالي
              </Box>
            )}
          </Box>
        </a>
      </Link>
      <Link href={href}>
        <Box sx={{ paddingY: 3, paddingX: 3, cursor: "pointer" }}>
          <Heading>{name}</Heading>
          <Text>{subTitle}</Text>
          {/* <HTMLBox html={details} /> */}
        </Box>
      </Link>
    </Box>
  )
}
