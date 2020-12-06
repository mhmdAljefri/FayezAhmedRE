import React from "react"
import { Box, Grid, Heading, Image } from "theme-ui"
import Wrapper from "./Wrapper"
import Slide from "react-reveal/Slide"

type PartnersCardProps = {}

function PartnersCard(props: PartnersCardProps) {
  return (
    <Slide bottom>
      <Box sx={{ textAlign: "center", margin: 2 }}>
        <Image src="/logo.png" />
      </Box>
    </Slide>
  )
}

type OurPartnersSectionProps = {
  data: any[]
}
export default function OurPartnersSection(props: OurPartnersSectionProps) {
  return (
    <Box sx={{ paddingY: 5, marginTop: 6, backgroundColor: "light" }}>
      <Wrapper>
        <Heading sx={{ marginBottom: 5, fontSize: 6 }}>شركائنا</Heading>
        <Grid columns={[1, 2, 2, 4]} sx={{ justifyContent: "center", alignItems: "center" }}>
          {props.data.map((_, index) => (
            <PartnersCard key={index} />
          ))}
        </Grid>
      </Wrapper>
    </Box>
  )
}
