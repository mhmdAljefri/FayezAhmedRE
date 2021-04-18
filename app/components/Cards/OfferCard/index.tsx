import React, { useMemo } from "react"
import { useRouter, Link, dynamic } from "blitz"
import { Box, Heading, Text, Flex } from "theme-ui"
import { Offer, City } from "@prisma/client"
import LazyLoad from "react-lazyload"
import SocialShare from "app/components/SocialShare"
import { AddOfferToFav } from "app/components/AddToFav"
import LabeldTexts from "../../LabeldTexts"

const OfferCardYoutube = dynamic(() => import("./OfferCardYoutube"))
const OfferCardPureVideo = dynamic(() => import("./OfferCardPureVideo"))
const OfferCardImage = dynamic(() => import("./OfferCardImage"))
const OfferCardLabel = dynamic(() => import("./OfferCardLabel"))

type OfferCardProps = Pick<
  Offer,
  | "id"
  | "name"
  | "image"
  | "subTitle"
  | "mainVideo"
  | "areaSize"
  | "numberOfBathrooms"
  | "numberOfRooms"
  | "propertyType"
> & {
  prefixPath?: string
  hideOfferLabel?: boolean
  hasFav?: boolean
  city?: City
}
export default function OfferCard({
  image,
  hideOfferLabel,
  subTitle,
  mainVideo,
  id,
  name,
  prefixPath = "/",
  hasFav = false,
  ...offer
}: OfferCardProps) {
  const { asPath } = useRouter()
  const href = asPath + prefixPath + id
  const isYoutube = mainVideo?.startsWith("https://www.youtube")
  const cardWidths = useMemo(() => [300, 300, 350], [])
  const cardVideoHieghts = useMemo(() => cardWidths.map((w) => w * (9 / 16)), [cardWidths])

  return (
    <Box
      sx={{
        width: ["100%", null, ...cardWidths],
        backgroundColor: "background",
        marginX: "auto",
        boxShadow: "default",
        position: "relative",
        marginBottom: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          marginTop: 22,
          zIndex: 22,
          px: 3,
          py: 2,
        }}
      >
        <SocialShare url={href} />
        <AddOfferToFav isActive={hasFav} offerId={id} />
      </Box>
      <Link href={href}>
        <a>
          <Box sx={{ position: "relative", paddingBottom: hideOfferLabel ? 0 : 25 }}>
            {mainVideo ? (
              <LazyLoad once height={200} offset={100}>
                <Box sx={{ height: [`${100 * (9 / 16)}vmin`, null, ...cardVideoHieghts] }}>
                  {isYoutube ? (
                    <OfferCardYoutube src={mainVideo} />
                  ) : (
                    <OfferCardPureVideo poster={image || undefined} src={mainVideo} />
                  )}
                </Box>
              </LazyLoad>
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
          <Flex sx={{ justifyContent: "space-evenly", mt: 2 }}>
            <LabeldTexts {...offer} city={offer.city?.name} />
          </Flex>
        </Box>
      </Link>
    </Box>
  )
}
