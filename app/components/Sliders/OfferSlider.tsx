import React from "react"
import { Box } from "theme-ui"
import { Swiper, SwiperSlide } from "./Swiper"
import { OfferCard } from "app/layouts/OfferssList"

export default function OfferSlider({ offers }) {
  return (
    <Swiper
      loop
      pagination={{ clickable: true }}
      autoHeight
      breakpoints={{
        1200: {
          slidesPerView: 3,
        },
        900: {
          slidesPerView: 2,
        },
      }}
    >
      {offers.map((offer) => (
        <SwiperSlide key={offer.id} virtualIndex={offer.id}>
          <Box sx={{ mb: 5 }}>
            <OfferCard
              key={offer.id}
              {...offer}
              prefixPath={`countries/${offer.countryId}/offers/`}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
