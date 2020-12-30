import React from "react"
import { Box, Grid, Heading } from "theme-ui"
import Wrapper from "./Wrapper"
import Slide from "react-reveal/Slide"
import { Partner } from "@prisma/client"
import CloudinaryImage from "./CloudinaryImage"

type PartnersCardProps = Partner

function PartnersCard({ image, name }: PartnersCardProps) {
  return (
    <Slide bottom>
      <Box sx={{ textAlign: "center", marginX: "auto", padding: 2 }}>
        <CloudinaryImage
          src={image}
          alt={name}
          objectFit="contain"
          height={200}
          width={200}
          layout="responsive"
        />
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
