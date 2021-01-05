import { Offer } from "@prisma/client"
import { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import { Link, useInfiniteQuery, useParam, useRouter, useRouterQuery } from "blitz"
import React, { useRef } from "react"
import { Grid, Image, Box, Heading, Text } from "theme-ui"

import FetchMoreButton from "app/components/FetchMoreButton"
import Fade from "react-reveal/Fade"
import getInfiniteOffersI from "app/public/offers/queries/getInfiniteOffers"
// import HTMLBox from "app/components/HTMLBox"

type OfferCardProps = Pick<Offer, "id" | "name" | "image" | "subTitle"> & {
  prefixPath?: string
  hideOfferLabel?: boolean
}

export function OfferCard({
  image,
  hideOfferLabel,
  subTitle,
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
