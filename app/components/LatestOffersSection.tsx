import React from "react"
import { Box, Heading } from "theme-ui"
import Wrapper from "./Wrapper"
import OfferSlider from "./Sliders/OfferSlider"

export default function LatestOffersSection({ offers }) {
  return (
    <Box sx={{ py: 4 }}>
      <Wrapper>
        <Heading sx={{ pt: 5, pb: 4, fontSize: [4, 5, 6] }}>احدث عروضنا</Heading>

        <OfferSlider offers={offers} />
      </Wrapper>
    </Box>
  )
}
