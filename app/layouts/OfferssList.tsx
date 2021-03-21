import { Offer } from "@prisma/client"
import { filterValues } from "app/components/Forms/Filter"
import Wrapper from "app/components/Wrapper"
import { useInfiniteQuery, useParam, useRouterQuery } from "blitz"
import React, { useRef, useState } from "react"
import { Grid, Box, Heading, Text } from "theme-ui"

import FetchMoreButton from "app/components/FetchMoreButton"
import getInfiniteOffersI from "app/public/offers/queries/getInfiniteOffers"
import OfferCard from "app/components/Cards/OfferCard"
import CitiesFilter, { SelectedCity } from "app/components/CitiesFilter"
import { OffersPageProps } from "app/pages/countries/[countryId]/offers"

type OfferListTypes = Pick<Offer, "name" | "details"> & OffersPageProps
export default function OffersList({ name, details, country, offers }: OfferListTypes) {
  const [selected, setSelected] = useState<SelectedCity>({ id: "اظهار الكل", name: "اظهار الكل" })

  const countryId = parseInt(useParam("countryId") as string)
  const [groupedOffers, { isFetching, fetchMore, canFetchMore, isFetchingMore }] = useInfiniteQuery(
    getInfiniteOffersI,
    (page = { take: 30, skip: 0 }) => ({
      ...page,
      where: {
        countryId,
        cityId: typeof selected.id === "string" ? undefined : selected.id,
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
          <CitiesFilter
            selected={selected}
            onClick={(city) => setSelected(city)}
            cities={country.cities}
          />
          <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
            {groupedOffers.map((group, i) => (
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
