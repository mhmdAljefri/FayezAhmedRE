import React from "react"
import { Box, Grid, Heading, Image } from "theme-ui"
import Wrapper from "./Wrapper"
import { Partner } from "@prisma/client"

type PartnersCardProps = Partner

function PartnersCard({ image, name }: PartnersCardProps) {
  return (
    <Box sx={{ textAlign: "center", marginX: "auto", padding: 2, maxWidth: 200 }}>
      <Image src={image} alt={name} />
    </Box>
  )
}

type OurPartnersSectionProps = {
  data: Partner[]
}
export default function OurPartnersSection(props: OurPartnersSectionProps) {
  return (
    <Box sx={{ paddingTop: 5, paddingBottom: 7, marginTop: 6, backgroundColor: "light" }}>
      <Wrapper>
        <Heading sx={{ marginBottom: 5, fontSize: [4, 6] }}>شركائنا</Heading>
        <Grid columns={[2, 2, 4]} sx={{ justifyContent: "center", alignItems: "center" }}>
          {props.data.map((partner, index) => (
            <PartnersCard {...partner} key={index} />
          ))}
        </Grid>
      </Wrapper>
    </Box>
  )
}
