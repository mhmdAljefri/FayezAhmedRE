import { OfferCard } from "app/layouts/OfferssList"
import React from "react"
import { Box, Heading } from "theme-ui"
import SlickSlider from "./Sliders/SlickSlider"
import Wrapper from "./Wrapper"

export default function LatestOffersSection({ offers }) {
  return (
    <Box sx={{ py: 4 }}>
      <Wrapper>
        <Heading sx={{ pt: 5, pb: 4, fontSize: [4, 5, 6] }}>احدث عروضنا</Heading>

        <SlickSlider
          autoplay
          arrows={false}
          infinite
          slidesToShow={3}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                rtl: true,
              },
            },
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                rtl: true,
              },
            },
            {
              breakpoint: 900,
              settings: {
                centerMode: false,
                vertical: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                rtl: true,
              },
            },
          ]}
        >
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              {...offer}
              prefixPath={`countries/${offer.countryId}/offers/`}
            />
          ))}
        </SlickSlider>
      </Wrapper>
    </Box>
  )
}
