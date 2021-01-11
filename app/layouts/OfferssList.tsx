import { Offer } from "@prisma/client"
import { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import { Link, useInfiniteQuery, useParam, useRouter, useRouterQuery } from "blitz"
import React, { useRef } from "react"
import { Grid, Image, Box, Heading, Text } from "theme-ui"

import FetchMoreButton from "app/components/FetchMoreButton"
import Fade from "react-reveal/Fade"
import getInfiniteOffersI from "app/public/offers/queries/getInfiniteOffers"
import { ConstractiongVideo } from "./ProjectDetailsLayout"
// import HTMLBox from "app/components/HTMLBox"

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
  prefixPath = "",
}: OfferCardProps) {
  const { asPath } = useRouter()
  return (
    <Fade bottom>
      <Box
        sx={{
          width: ["90vw", null, 370],
          backgroundColor: "background",
          marginX: "auto",
          boxShadow: "default",
          marginBottom: 2,
        }}
      >
        <Link href={asPath + "/" + prefixPath + id}>
          <a>
            <Box sx={{ position: "relative" }}>
              {mainVideo ? (
                <Box sx={{ height: 240 }}>
                  {mainVideo.startsWith("https://www.youtube") ? (
                    <iframe width="100%" height="100%" title="any" src={mainVideo}></iframe>
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
                <Image
                  sx={{
                    height: 240,
                    width: "100%",
                    objectFit: "cover",
                    ":hover + div": {
                      backgroundColor: "primary",
                    },
                  }}
                  src={image as string}
                />
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
        <Box sx={{ paddingY: 3, paddingX: 3 }}>
          <Heading>{name}</Heading>
          <Text>{subTitle}</Text>
          {/* <HTMLBox html={details} /> */}
        </Box>
      </Box>
    </Fade>
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
