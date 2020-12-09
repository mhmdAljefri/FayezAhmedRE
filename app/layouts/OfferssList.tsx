import { Offer, Prisma } from "@prisma/client"
import Filter, { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import getCountry from "app/public/countries/queries/getCountry"
import { Link, useInfiniteQuery, useParam, useQuery, useRouter, useRouterQuery } from "blitz"
import React, { useRef } from "react"
import { Grid, Image, Box, Heading, Text } from "theme-ui"

import FetchMoreButton from "app/components/FetchMoreButton"
import Fade from "react-reveal/Fade"
import getInfiniteOffersI from "app/public/offers/queries/getInfiniteOffers"

type OfferCardProps = Pick<Offer, "title" | "image" | "subTitle">

export function OfferCard({ image, subTitle, title }: OfferCardProps) {
  const { asPath } = useRouter()
  return (
    <Fade bottom>
      <Box
        sx={{
          width: ["90vw", null, 370],
          backgroundColor: "white",
          marginX: "auto",
          boxShadow: "default",
          marginBottom: 2,
        }}
      >
        <Link href={asPath + "/" + title}>
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
                }}
              >
                العرض الحالي
              </Box>
            </Box>
          </a>
        </Link>
        <Box sx={{ paddingY: 3, paddingX: 3 }}>
          <Heading>{title}</Heading>
          <Text>{subTitle}</Text>
        </Box>
      </Box>
    </Fade>
  )
}

type ProjectListTypes = {
  orderBy?: Prisma.ProjectOrderByInput
  title: string
  subTitle: string
}

export default function ProjectsList({ orderBy, title, subTitle }: ProjectListTypes) {
  const filter = useRouterQuery()
  const filterRef = useRef<filterValues>(filter)
  const countryId = parseInt(useParam("countryId") as string)
  const [country] = useQuery(getCountry, { where: { id: countryId } })
  const [
    groupedProjects,
    { isFetching, refetch, fetchMore, canFetchMore, isFetchingMore },
  ] = useInfiniteQuery(
    getInfiniteOffersI,
    (page = { take: 3, skip: 0 }) => ({
      ...page,
      orderBy,
      where: {
        countryId,
        OR: [
          { title: { contains: filterRef.current?.search } },
          { subTitle: { contains: filterRef.current?.search } },
          { reachText: { contains: filterRef.current?.search } },
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
          color: "white",
          backgroundColor: "dark",
          marginBottom: 4,
        }}
      >
        <Wrapper>
          <Heading as="h1" sx={{ fontSize: 7, color: "white" }}>
            {title}
          </Heading>
          <Text>{subTitle}</Text>
        </Wrapper>
      </Box>
      {/* <Wrapper sx={{ marginTop: -7, marginBottom: 5 }}>
        <Filter
          initialValues={filter}
          isTurkey={country.isTurkey}
          rooms={country.rooms}
          cities={country.cities}
          onFilter={(data) => {
            filterRef.current = data
            refetch()
          }}
        />
      </Wrapper> */}
      <Box>
        <Wrapper>
          <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
            {groupedProjects.map((group, i) => (
              <React.Fragment key={i}>
                {group.offers.map((offer) => (
                  <OfferCard {...offer} key={offer.id} />
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
