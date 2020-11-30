import React from "react"
import Icon from "react-icons-kit"
import { rocket } from "react-icons-kit/fa/rocket"
import { Box, Grid, Heading } from "theme-ui"
import Wrapper from "./Wrapper"

type ServicesCardProps = {}

function ServicesCard(props: ServicesCardProps) {
  return (
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
        paddingInlineStart: 80,
        paddingInlineEnd: 10,
        paddingBottom: 3,
        paddingTop: 4,
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
      <Box
        sx={{
          position: "absolute",
          width: 80,
          height: 80,
          top: -20,
          right: -20,
          borderRadius: 1111,
          boxShadow: "default",
          backgroundColor: "primary",
        }}
      >
        <Icon size={40} style={{ marginTop: 20, marginRight: 20 }} icon={rocket} />
      </Box>
      <Heading
        sx={{
          fontSize: 3,
          color: "inherit",
        }}
      >
        text goes here
      </Heading>
    </Box>
  )
}

type OurServicesSectionProps = {
  data: any[]
}
export default function OurServicesSection(props: OurServicesSectionProps) {
  return (
    <Box>
      <Wrapper>
        <Heading sx={{ marginY: 5, fontSize: 6 }}>خدماتنا</Heading>
        <Grid columns={[1, 2, 2, 3]} sx={{ justifyContent: "center", alignItems: "center" }}>
          {props.data.map((_, index) => (
            <ServicesCard key={index} />
          ))}
        </Grid>
      </Wrapper>
    </Box>
  )
}
