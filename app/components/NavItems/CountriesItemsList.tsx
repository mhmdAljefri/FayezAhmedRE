import getCountries from "app/public/countries/queries/getCountries"
import { Link, useQuery } from "blitz"
import React from "react"
import { Avatar, Box, Flex } from "theme-ui"
import Dropdown from "../Dropdown"

export default function CountriesItemsList() {
  const [{ countries }] = useQuery(getCountries, { select: { id: true, name: true, image: true } })
  return (
    <Dropdown
      title={
        <Box sx={{ width: 180, fontWeight: 700, marginInlineEnd: [10, 15, 20], fontSize: [3] }}>
          المشاريع والعروض
        </Box>
      }
      onChange={() => {}}
      options={countries.map((country) => ({
        key: country.id,
        value: country.id,
        node: (
          <Link href={`/countries/${country.id}`}>
            <Flex sx={{ marginY: 3, width: 180 }} key={country.id}>
              <Avatar
                sx={{ boxShadow: "card", marginInlineEnd: 10, height: 30, width: 30 }}
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
