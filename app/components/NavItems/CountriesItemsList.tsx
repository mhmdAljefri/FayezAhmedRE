import getCountries from "app/public/countries/queries/getCountries"
import { Link, useQuery } from "blitz"
import React from "react"
import { Box, Flex } from "theme-ui"
import Dropdown from "../Dropdown"
import OptmizationImage from "../OptmizationImage"

export default function CountriesItemsList() {
  const [{ countries }] = useQuery(getCountries, { select: { id: true, name: true, image: true } })
  return (
    <Dropdown
      outterStyle={{ marginInlineEnd: 20 }}
      title={
        <Box
          sx={{
            fontWeight: 700,
            fontSize: [1, 2, 2, 2],
            color: "primary",
            cursor: "pointer",
            whiteSpace: "nowrap",
            ":hover": {
              color: "white",
            },
          }}
        >
          المشاريع والعروض
        </Box>
      }
      onChange={() => {}}
      options={countries.map((country) => ({
        key: country.id,
        value: country.id,
        node: (
          <Link href={`/countries/${country.id}`}>
            <Flex
              sx={{
                marginY: 3,
                width: 180,
                fontWeight: 700,
                fontSize: [1],
                alignItems: "center",
              }}
              key={country.id}
            >
              <Box
                sx={{
                  boxShadow: "card",
                  borderRadius: 30,
                  marginInlineEnd: 10,
                  height: 30,
                  position: "relative",
                  width: 30,
                }}
              >
                <OptmizationImage objectFit="cover" layout="fill" src={country.image} />
              </Box>
              مشاريع وعروض {country.name}
            </Flex>
          </Link>
        ),
      }))}
    />
  )
}
