import React from "react"
import { Box, Heading } from "theme-ui"
import Wrapper from "../Wrapper"
import LazyLoad from "react-lazyload"
import { dynamic } from "blitz"
const IdealDestinationBG = dynamic(() => import("./IdealDestinationBG"))
const IdealDestinationsSwiper = dynamic(() => import("./IdealDestinations"))

export default function IdealDestinations({ explores }) {
  return (
    <Box
      sx={{
        position: "relative",
        pb: 4,
      }}
    >
      <LazyLoad>
        <IdealDestinationBG />
      </LazyLoad>
      <Wrapper>
        <Heading sx={{ pt: 4, pb: 4, fontSize: [4, 5, 6], paddingInlineEnd: 20, color: "primary" }}>
          وجهات مثالية للجميع
        </Heading>

        <LazyLoad offset={150}>
          <IdealDestinationsSwiper explores={explores} />
        </LazyLoad>
      </Wrapper>
    </Box>
  )
}
