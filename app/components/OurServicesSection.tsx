import React from "react"
import { Box, Grid, Heading } from "theme-ui"
import Wrapper from "./Wrapper"
import Fade from "react-reveal/Fade"
import { Feature } from "@prisma/client"

type ServicesCardProps = Pick<Feature, "image" | "name">

function ServicesCard({ name, image }: ServicesCardProps) {
  return (
    <Fade bottom>
      <Box
        sx={{
          boxShadow: "default",
          position: "relative",
          color: "white",
          marginTop: 50,
          marginRight: "auto",
          marginLeft: "auto",
          borderRadius: "15px 0",
          width: 200,
          paddingBottom: 3,
          paddingTop: 4,
          textAlign: "center",
          backgroundColor: "primary",
          ":after": {
            content: '""',
            position: "absolute",
            bottom: -21,
            left: 0,
            borderWidth: 10,
            borderColor: "primary",
            borderStyle: "solid",
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
          },
        }}
      >
        <Heading
          sx={{
            paddingX: 2,
            paddingY: 3,
            fontSize: 3,
            color: "inherit",
          }}
        >
          {name}
        </Heading>
      </Box>
    </Fade>
  )
}

type OurServicesSectionProps = {
  data: any[]
}
export default function OurServicesSection(props: OurServicesSectionProps) {
  return (
    <Box>
      <Wrapper>
        <Grid columns={[1, 2, 2, 3]} sx={{ justifyContent: "center", alignItems: "center" }}>
          {props.data.map((feat, index) => (
            <ServicesCard {...feat} key={index} />
          ))}
        </Grid>
      </Wrapper>
    </Box>
  )
}
