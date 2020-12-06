import React from "react"
import { Box, Button } from "theme-ui"
import Fade from "react-reveal/Fade"

export default function FetchMoreButton({ onClick, isFetchingMore, disabled, canFetchMore }) {
  return (
    <Fade>
      <Button
        variant="link"
        onClick={onClick}
        sx={{ display: "flex", alignItems: "center", marginX: "auto", marginBottom: 5 }}
        disabled={disabled}
      >
        <Box
          as="span"
          sx={{ width: 70, height: "4px", backgroundColor: "primary", display: "block" }}
        />
        <Box sx={{ paddingX: 3 }} as="span">
          {isFetchingMore
            ? "...جاري تحميل المزيد"
            : canFetchMore
            ? "تحميل المزيد"
            : "لا يوجد المزيد"}
        </Box>
        <Box
          as="span"
          sx={{ width: 70, height: "4px", backgroundColor: "primary", display: "block" }}
        />
      </Button>
    </Fade>
  )
}
