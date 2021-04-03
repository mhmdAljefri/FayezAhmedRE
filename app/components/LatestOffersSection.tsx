import React from "react"
import { Box, Heading, Grid } from "theme-ui"
import Wrapper from "./Wrapper"
import OfferCard from "./Cards/OfferCard"
import ShowMoreButton from "./ShowMoreButton"
import HeadingWithMoreLink from "./HeadingWithMoreLink"

export default function LatestOffersSection({ offers }) {
  return (
    <Box sx={{ py: 4, backgroundColor: "background" }}>
      <Wrapper>
        <HeadingWithMoreLink href="/countries/2/offers" heading="جديدنا" />
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
