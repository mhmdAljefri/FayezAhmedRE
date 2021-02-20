import React from "react"
import Skeleton from "react-loading-skeleton"
import { Box } from "theme-ui"

export default function SkeltonLoaderCard() {
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Skeleton height={150} />
      </Box>
      <Box sx={{ mb: 2, my: 2 }}>
        <Skeleton />
        <Skeleton count={4} />
      </Box>
    </Box>
  )
}
