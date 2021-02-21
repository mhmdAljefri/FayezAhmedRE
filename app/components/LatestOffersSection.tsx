import React from "react"
import { Box, Heading } from "theme-ui"
import Wrapper from "./Wrapper"
import { dynamic } from "blitz"
import SkeltonLoaderCard from "./Cards/SkeltonLoaderCard"
import LazyLoad from "react-lazyload"

const OfferSlider = dynamic(() => import("./Sliders/OfferSlider"), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: "flex" }}>
      <SkeltonLoaderCard />
      <SkeltonLoaderCard />
      <SkeltonLoaderCard />
    </Box>
  ),
})

export default function LatestOffersSection({ offers }) {
  return (
    <Box sx={{ py: 4, backgroundColor: "background" }}>
      <Wrapper>
        <Heading sx={{ pt: 5, pb: 4, fontSize: [4, 5, 6] }}>احدث عروضنا</Heading>

        <LazyLoad offset={200} height={300}>
          <OfferSlider offers={offers} />
        </LazyLoad>
      </Wrapper>
    </Box>
  )
}
