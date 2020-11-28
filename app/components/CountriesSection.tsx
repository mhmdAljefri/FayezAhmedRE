import { CountryCreateInput } from "@prisma/client"
import { Link } from "blitz"
import React from "react"
import { Icon } from "react-icons-kit"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"
import { Box, Flex, Heading, Text } from "theme-ui"

type CountryCardProps = {
  name: string
  nameEN: string
  id: number
  image: string
}

function CountryCard({ name, nameEN, id, image }: CountryCardProps) {
  return (
    <Flex
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
        height: 300,
        marginX: 5,
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
          backgroundColor: "rgba(0,0,0,0.5)",
          boxShadow: "2px 4px 22px black",
          zIndex: 0,
        },
      }}
    >
      <Link href={`/countries/${id}`}>
        <div>
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
              <Icon size={24} style={{ marginTop: 4, marginRight: 9 }} icon={arrowLeft} />
            </Box>
          </Flex>
        </div>
      </Link>
    </Flex>
  )
}

type CountriesSectionProps = {
  data: Pick<CountryCreateInput, "name" | "image">[]
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
