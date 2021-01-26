import getCountries from "app/public/countries/queries/getCountries"
import { Link, useQuery } from "blitz"
import React from "react"
import { Box, Flex } from "theme-ui"
import Dropdown from "../Dropdown"
import Image from "../Image"

export default function CountriesItemsList() {
  const [{ countries }] = useQuery(getCountries, { select: { id: true, name: true, image: true } })
  return (
    <Dropdown
      title={
        <Box sx={{ width: 160, fontWeight: 700, marginInlineEnd: [10, 15, 20], fontSize: [1, 2] }}>
          المشاريع والعروض
        </Box>
      }
      onChange={() => {}}
      options={countries.map((country) => ({
        key: country.id,
        value: country.id,
        node: (
          <Link href={`/countries/${country.id}`}>
            <Flex sx={{ marginY: 3, width: 180, fontSize: [0, 1] }} key={country.id}>
              <Image
                sx={{
                  boxShadow: "card",
                  borderRadius: 30,
                  marginInlineEnd: 10,
                  height: 30,
                  width: 30,
                }}
                src={country.image}
              />
              مشاريع وعروض {country.name}
            </Flex>
          </Link>
        ),
      }))}
    />
  )
}
