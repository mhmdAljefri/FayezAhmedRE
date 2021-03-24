import React from "react"
import { Box, Heading, Grid } from "theme-ui"
import Wrapper from "./Wrapper"
import OfferCard from "./Cards/OfferCard"

export default function LatestOffersSection({ offers }) {
  return (
    <Box sx={{ py: 4, backgroundColor: "background" }}>
      <Wrapper>
        <Heading sx={{ pt: 5, pb: 4, fontSize: [4, 5, 6] }}>احدث عروضنا</Heading>

        <Grid columns={[1, null, 3]}>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              {...offer}
              prefixPath={`countries/${offer.countryId}/offers/`}
            />
          ))}
        </Grid>
      </Wrapper>
    </Box>
  )
}
