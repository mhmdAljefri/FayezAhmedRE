import React from "react"
import { Box, Heading, Grid } from "theme-ui"
import Wrapper from "./Wrapper"
import OfferCard from "./Cards/OfferCard"
import ShowMoreButton from "./ShowMoreButton"

export default function LatestOffersSection({ offers }) {
  return (
    <Box sx={{ py: 4, backgroundColor: "background" }}>
      <Wrapper>
        <Heading sx={{ pt: 5, fontSize: [4, 5, 6] }}>جديدنا</Heading>
        <Heading sx={{ pb: 4, fontSize: 2 }}>اكتشف أحدث عروضنا الحصرية</Heading>
        <Grid columns={[1, null, 3]}>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              {...offer}
              prefixPath={`countries/${offer.countryId}/offers/`}
            />
          ))}
        </Grid>
        <ShowMoreButton
          href={`/countries/2/offers`}
          sx={{
            display: ["auto", null, "none"],
          }}
        />
      </Wrapper>
    </Box>
  )
}
