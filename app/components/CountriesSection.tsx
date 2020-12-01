import { Link } from "blitz"
import React from "react"
import { Icon } from "react-icons-kit"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"
import { Box, Flex, Heading, Text } from "theme-ui"

export type CountryCardProps = {
  name: string
  nameEN: string
  id: number
  image: string
}

function CountryCard({ name, id, image }: CountryCardProps) {
  return (
    <Link passHref href={`/countries/${id}`}>
      <a>
        <Flex
          key={id}
          sx={{
            borderRadius: 15,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            flexDirection: "column",
            justifyContent: "flex-end",
            color: "white",
            textShadow: "5px 5px 50px #000",
            padding: 4,
            width: 300,
            maxWidth: "95vw",
            height: 300,
            marginX: [1, null, 5],
            marginBottom: 5,
            boxShadow: "default",
            position: "relative",
            ":before": {
              content: '""',
              position: "absolute",
              display: "block",
              height: 80,
              bottom: 40,
              right: 50,
              left: 50,
              backgroundColor: "rgba(0,0,0,0.1)",
              boxShadow: "2px 4px 22px rgba(0,0,0,0.1)",
              zIndex: 0,
            },
          }}
        >
          <Text sx={{ filter: "drop-shadow(2px 4px 2px black)" }}>المشاريع العقارية</Text>
          <Flex>
            <Heading
              sx={{ fontSize: 6, color: "white", filter: "drop-shadow(2px 4px 22px black)" }}
            >
              {name}
            </Heading>
            <Box
              sx={{
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
      </a>
    </Link>
  )
}

type CountriesSectionProps = {
  data: CountryCardProps[]
}
export default function CountriesSection(props: CountriesSectionProps) {
  return (
    <Flex
      sx={{
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: -100,
        zIndex: 1000,
        position: "relative",
      }}
    >
      {props.data.map((counry) => (
        <CountryCard {...counry} />
      ))}
    </Flex>
  )
}
