import { Offer } from "@prisma/client"
import { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import { useInfiniteQuery, useParam, useRouterQuery } from "blitz"
import React, { useRef } from "react"
import { Grid, Box, Heading, Text } from "theme-ui"

import FetchMoreButton from "app/components/FetchMoreButton"
import getInfiniteOffersI from "app/public/offers/queries/getInfiniteOffers"
import OfferCard from "app/components/Cards/OfferCard"

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
