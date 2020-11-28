import React from "react"
import { Box, Grid, Heading, Image } from "theme-ui"
import Wrapper from "./Wrapper"

type PartnersCardProps = {}

function PartnersCard(props: PartnersCardProps) {
  return (
    <Box sx={{ textAlign: "center", margin: 2 }}>
      <Image src="/logo.png" />
    </Box>
  )
}

type OurPartnersSectionProps = {}
export default function OurPartnersSection(props: OurPartnersSectionProps) {
  return (
    <Box sx={{ paddingY: 5, marginTop: 6, backgroundColor: "light" }}>
      <Wrapper>
        <Heading sx={{ marginBottom: 5 }}>شركائنا</Heading>
        <Grid columns={[1, 2, 2, 4]} sx={{ justifyContent: "center", alignItems: "center" }}>
          <PartnersCard />
          <PartnersCard />
          <PartnersCard />
          <PartnersCard />
          <PartnersCard />
          <PartnersCard />
        </Grid>
      </Wrapper>
    </Box>
  )
}
