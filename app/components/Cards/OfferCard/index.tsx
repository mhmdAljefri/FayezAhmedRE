import React from "react"
import { useRouter, Link, dynamic } from "blitz"
import { Box, Heading, Text } from "theme-ui"
import { Offer } from "@prisma/client"
import LazyLoad from "react-lazyload"

const OfferCardYoutube = dynamic(() => import("./OfferCardYoutube"))
const OfferCardPureVideo = dynamic(() => import("./OfferCardPureVideo"))
const OfferCardImage = dynamic(() => import("./OfferCardImage"))
const OfferCardLabel = dynamic(() => import("./OfferCardLabel"))

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
  const href = asPath + prefixPath + id
  const isYoutube = mainVideo?.startsWith("https://www.youtube")

  return (
    <Box
      sx={{
        width: ["100%", null, 300, 300, 350],
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
              <Box sx={{ height: 190, paddingBottom: hideOfferLabel ? 0 : 25 }}>
                <LazyLoad offset={100}>
                  {isYoutube ? (
                    <OfferCardYoutube src={mainVideo} />
                  ) : (
                    <OfferCardPureVideo poster={image || undefined} src={mainVideo} />
                  )}
                </LazyLoad>
              </Box>
            ) : (
              <OfferCardImage image={image} />
            )}

            {!hideOfferLabel && <OfferCardLabel />}
          </Box>
        </a>
      </Link>
      <Link href={href}>
        <Box sx={{ paddingY: 3, paddingX: 3, cursor: "pointer" }}>
          <Heading>{name}</Heading>
          <Text>{subTitle}</Text>
        </Box>
      </Link>
    </Box>
  )
}
