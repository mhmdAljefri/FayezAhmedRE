import React from "react"
import { Box } from "theme-ui"

export default function OfferCardLabel() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        textAlign: "center",
        left: 0,
        right: 0,
        lineHeight: "40px",
        height: 40,
        backgroundColor: "dark",
        color: "primary",
        transition: "all 0.5s linear",
        ":hover": {
          color: "white",
          backgroundColor: "primary",
        },
      }}
    >
      العرض الحالي
    </Box>
  )
}
