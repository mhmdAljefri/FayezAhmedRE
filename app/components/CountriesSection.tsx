import { Link } from "blitz"
import React from "react"
import { Icon } from "react-icons-kit"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"
import { Box, Flex, Grid, Heading, Link as ThemeLink, Text } from "theme-ui"
import Fade from "react-reveal/Fade"
import { Country } from "@prisma/client"

export type CountryCardProps = Country

function CountryCard({ name, id, image, isTurkey }: CountryCardProps) {
  const bgImageSecureUrl = image.replace("http://", "https://")
  return (
    <Link passHref href={`/countries/${id}`}>
      <ThemeLink
        sx={{
          textDecoration: "none",
        }}
      >
        <Flex
          key={id}
          sx={{
            backgroundImage: `url(${bgImageSecureUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundAttachment: "fixed",
            flexDirection: "column",
            justifyContent: "flex-end",
            color: "heading",
            textShadow: "5px 5px 50px #000",
            paddingX: [2, 4],
            paddingY: [4],
            height: 200,
            boxShadow: "default",
            position: "relative",
            ":before": {
              content: '""',
              position: "absolute",
              display: "block",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: isTurkey ? "#051e1e94" : "#98000091",
              boxShadow: "2px 4px 22px rgba(0,0,0,0.1)",
              zIndex: 0,
            },
          }}
        >
          <Text
            sx={{
              filter: "drop-shadow(2px 4px 2px #000000bd)",
              fontWeight: 900,
              margin: 0,
              padding: 0,
              fontSize: [2, 3],
            }}
          >
            مشاريع وعقارات
          </Text>
          <Flex>
            <Heading
              sx={{ fontSize: [5, 6], color: "white", filter: "drop-shadow(2px 4px 22px black)" }}
            >
              {name}
            </Heading>
            {/** mobile view icon */}
            <Box
              sx={{
                display: ["block", "none"],
                borderRadius: 100,
                position: "relative",
                zIndex: 1,
                height: 30,
                width: 30,
                marginX: 3,
                marginTop: 13,
                backgroundColor: "primary",
              }}
            >
              <Icon
                size={12}
                style={{ color: "white", marginTop: 3, marginRight: 10 }}
                icon={arrowLeft}
              />
            </Box>
            {/** end mobile view icon */}

            <Box
              sx={{
                display: ["none", "block"],
                borderRadius: 100,
                position: "relative",
                zIndex: 1,
                height: 40,
                width: 40,
                marginX: 3,
                marginTop: 13,
                backgroundColor: "primary",
              }}
            >
              <Icon
                size={24}
                style={{ color: "white", marginTop: 4, marginRight: 9 }}
                icon={arrowLeft}
              />
            </Box>
          </Flex>
        </Flex>
      </ThemeLink>
    </Link>
  )
}

type CountriesSectionProps = {
  data: CountryCardProps[]
}
export default function CountriesSection(props: CountriesSectionProps) {
  return (
    <Grid gap={0} columns={[1, null, 2]}>
      {props.data.map((counry) => (
        <Fade key={counry.id}>
          <CountryCard {...counry} />
        </Fade>
      ))}
    </Grid>
  )
}
