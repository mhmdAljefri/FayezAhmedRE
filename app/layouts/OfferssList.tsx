import { Offer } from "@prisma/client"
import { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import { Link, useInfiniteQuery, useParam, useRouter, useRouterQuery } from "blitz"
import React, { useRef, useEffect, useState } from "react"
import { Grid, Box, Heading, Text } from "theme-ui"

import FetchMoreButton from "app/components/FetchMoreButton"
import getInfiniteOffersI from "app/public/offers/queries/getInfiniteOffers"
import OptmizationImage from "app/components/OptmizationImage"

type OfferCardProps = Pick<Offer, "id" | "name" | "image" | "subTitle" | "mainVideo"> & {
  prefixPath?: string
  hideOfferLabel?: boolean
}

export function OfferCard({
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

  useEffect(() => {
    if (isYoutube) {
      let timer
      const handleOnWindowLoaded = () => {
        timer = setTimeout(() => {
          setYoutubeUrl(mainVideo)
        }, 4000)
      }
      window.addEventListener("load", handleOnWindowLoaded)

      return () => {
        clearTimeout(timer)
        window.removeEventListener("load", handleOnWindowLoaded)
      }
    }
  }, [isYoutube, mainVideo])

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

type ProjectListTypes = Pick<Offer, "name" | "details">
export default function ProjectsList({ name, details }: ProjectListTypes) {
  const filter = useRouterQuery()
  const filterRef = useRef<filterValues>(filter)
  const countryId = parseInt(useParam("countryId") as string)
  const [
    groupedProjects,
    { isFetching, fetchMore, canFetchMore, isFetchingMore },
  ] = useInfiniteQuery(
    getInfiniteOffersI,
    (page = { take: 30, skip: 0 }) => ({
      ...page,
      where: {
        countryId,
        OR: [
          { name: { contains: filterRef.current?.search } },
          { details: { contains: filterRef.current?.search } },
        ],
      },
    }),
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
    }
  )

  return (
    <div>
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 7,
          color: "background",
          backgroundColor: "dark",
          marginBottom: 4,
        }}
      >
        <Wrapper>
          <Heading as="h1" sx={{ fontSize: 7, color: "background" }}>
            {name}
          </Heading>
          <Text sx={{ fontSize: 4 }}>{details}</Text>
        </Wrapper>
      </Box>
      <Box sx={{ marginTop: -7, position: "relative", zIndex: 2 }}>
        <Wrapper>
          <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
            {groupedProjects.map((group, i) => (
              <React.Fragment key={i}>
                {group.offers.map((offer) => (
                  <OfferCard hideOfferLabel {...offer} key={offer.id} />
                ))}
              </React.Fragment>
            ))}
          </Grid>

          <FetchMoreButton
            disabled={!canFetchMore || !!isFetchingMore}
            onClick={fetchMore}
            isFetchingMore={isFetchingMore || isFetching}
            canFetchMore={canFetchMore}
          />
        </Wrapper>
      </Box>
    </div>
  )
}
