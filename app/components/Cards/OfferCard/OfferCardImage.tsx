import React from "react"
import { Box } from "theme-ui"
import OptmizationImage from "app/components/OptmizationImage"

export default function OfferCardImage({ image }) {
  return (
    <Box
      sx={{
        height: 240,
        ":hover + ": {
          backgroundColor: "primary",
        },
      }}
    >
      <OptmizationImage objectFit="cover" layout="fill" src={image as string} />
    </Box>
  )
}
