import React from "react"
import { Box, Heading } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import { Partner } from "@prisma/client"
import LazyLoad from "react-lazyload"
import { dynamic } from "blitz"
const PartenersSlider = dynamic(() => import("./PartenersSlider"))

type OurPartnersSectionProps = {
  data: Partner[]
}

export default function OurPartnersSection(props: OurPartnersSectionProps) {
  return (
    <Box sx={{ paddingTop: 5, paddingBottom: 5, backgroundColor: "light" }}>
      <Wrapper sx={{ position: "relative" }}>
        <Heading sx={{ marginBottom: 5, fontSize: [4, 5, 6] }}>شركائنا</Heading>

        <LazyLoad once offset={150} height={200}>
          <PartenersSlider parteners={props.data} />
        </LazyLoad>
      </Wrapper>
    </Box>
  )
}
