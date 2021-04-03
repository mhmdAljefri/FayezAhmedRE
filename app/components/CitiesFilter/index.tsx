import React from "react"
import Wrapper from "../Wrapper"
import { Flex, Box } from "theme-ui"
import { City } from "@prisma/client"

function CityButton({ children, isSelected, onClick }) {
  return (
    <Box
      onClick={onClick}
      role="button"
      aria-label={children}
      sx={{
        cursor: "pointer",
        borderRadius: "md",
        backgroundColor: isSelected ? "white" : "primary",
        borderWidth: 3,
        paddingY: 2,
        paddingX: 3,
        fontWeight: "700",
        textAlign: "center",
        color: isSelected ? "primary" : "white",
        borderColor: "primary",
        borderStyle: "solid",
        marginTop: 2,
        width: 120,
      }}
    >
      {children}
    </Box>
  )
}

export type SelectedCity = {
  id: number | string
  name: string
}

type Props = {
  cities: City[]
  selected: SelectedCity
  onClick: (city: SelectedCity) => any
}

export default function CitiesFilter({ cities, selected, onClick }: Props) {
  return (
    <Wrapper>
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        {cities &&
          [...[{ id: "اظهار الكل", name: "اظهار الكل" }], ...cities].map((city) => (
            <CityButton
              isSelected={selected.id === city.id}
              key={city.id}
              onClick={() => onClick({ name: city.name, id: city.id })}
            >
              {city.name}
            </CityButton>
          ))}
      </Flex>
    </Wrapper>
  )
}
