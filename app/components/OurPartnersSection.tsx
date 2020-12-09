import React from "react"
import { Box, Grid, Heading, Image } from "theme-ui"
import Wrapper from "./Wrapper"
import Slide from "react-reveal/Slide"
import { Partner } from "@prisma/client"

type PartnersCardProps = Partner

function PartnersCard({ image, name }: PartnersCardProps) {
  return (
    <Slide bottom>
      <Box sx={{ textAlign: "center", margin: 2 }}>
        <Image src={image} alt={name} />
      </Box>
    </Slide>
  )
}

type OurPartnersSectionProps = {
  data: Partner[]
}
export default function OurPartnersSection(props: OurPartnersSectionProps) {
  return (
    <Box sx={{ paddingY: 5, marginTop: 6, backgroundColor: "light" }}>
      <Wrapper>
        <Heading sx={{ marginBottom: 5, fontSize: 6 }}>شركائنا</Heading>
        <Grid columns={[1, 2, 2, 4]} sx={{ justifyContent: "center", alignItems: "center" }}>
          {props.data.map((partner, index) => (
            <PartnersCard {...partner} key={index} />
          ))}
        </Grid>
      </Wrapper>
    </Box>
  )
}
