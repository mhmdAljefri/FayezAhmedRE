import Filter, { filterValues } from "app/components/Forms/Filter"
import FetchMoreButton from "app/components/FetchMoreButton"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import Wrapper from "app/components/Wrapper"
import getProjectsInfinite from "app/public/projects/queries/getInfiniteProjects"
import { useInfiniteQuery, useParam, useQuery, useRouterQuery } from "blitz"
import React, { useRef, useState } from "react"
import { Flex, Grid, Box, Heading, Text } from "theme-ui"

import { City, Country } from "@prisma/client"
import { getSearchQuery } from "app/utils"
import ProjectCard, { ProjectCardProps } from "app/components/Cards/ProjectCard"

export const getListOfPrice = (price?: number[]): number[] => {
  if (!price) return []
  const arr = price.toString().split(",") // wtf
  const firstPrice = parseInt(arr[0], 10)
  const lastPrice = parseInt(arr[0], 10)
  return [firstPrice, lastPrice]
}

type ProjectListTypes = {
  title: string
  subTitle: string
  country: Country & { cities: City[] }
  projects: ProjectCardProps[]
}

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
        color: isSelected ? "primary" : "heading",
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
interface SelectedCity {
  id: number | string
  name: string
}

export default function ProjectsList({ country, projects, title, subTitle }: ProjectListTypes) {
  const filter = useRouterQuery()
  const filterRef = useRef<filterValues>(filter)
  const countryId = parseInt(useParam("countryId") as string)
  const { search, city, price, propertyType, status } = filterRef.current || {}
  const [{ propertyTypes }] = useQuery(getPropertyTypes, {})
  const [selected, setSelected] = useState<SelectedCity>({ id: "اظهار الكل", name: "اظهار الكل" })
  const [
    groupedProjects,
    { isFetching, refetch, fetchMore, canFetchMore, isFetchingMore },
  ] = useInfiniteQuery(
    getProjectsInfinite,
    (page = { take: 9, skip: 0 }) => ({
      ...page,
      where: {
        countryId,
        OR: getSearchQuery(search, ["name", "subTitle"]),
        propertyType: {
          id: {
            equals: propertyType ? parseInt(propertyType) : undefined,
          },
        },
        status: status,
        //         propertyType
        // status
        city: { id: parseInt(city || "") || undefined },
        roomsWithPrices: {
          some: {
            price: {
              lt: price?.[1]?.toString() || undefined,
            },
            OR: {
              price: {
                gt: price?.[0]?.toString() || undefined,
              },
            },
          },
        },
      },
    }),
    {
      initialData: [{ projects, nextPage: 2 }],
      getFetchMore: (lastGroup) => lastGroup.nextPage,
    }
  )

  return (
    <div>
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 7,
          color: "white",
          backgroundColor: "dark",
          marginBottom: 4,
        }}
      >
        <Wrapper>
          <Heading as="h1" sx={{ fontSize: 7, color: "white" }}>
            {title}
          </Heading>
          <Text sx={{ fontSize: 4 }}>{subTitle}</Text>
        </Wrapper>
      </Box>
      <Wrapper sx={{ marginTop: -7, marginBottom: 5 }}>
        <Filter
          propertyTypes={propertyTypes}
          initialValues={filter}
          isTurkey={country.isTurkey}
          rooms={country.rooms}
          cities={country.cities}
          onFilter={(data) => {
            const getList = getListOfPrice(data.price) // wtf
            const newData = {
              ...data,
              price: getList,
            }

            filterRef.current = newData
            refetch()
          }}
        />
      </Wrapper>

      {country.isTurkey && (
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
            {country.cities &&
              [...[{ id: "اظهار الكل", name: "اظهار الكل" }], ...country.cities].map((city) => (
                <CityButton
                  isSelected={selected.id === city.id}
                  key={city.id}
                  onClick={() => setSelected({ id: city.id, name: city.name })}
                >
                  {city.name}
                </CityButton>
              ))}
          </Flex>
        </Wrapper>
      )}

      <Box>
        <Wrapper>
          <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
            {groupedProjects.map((group, i) => (
              <React.Fragment key={i}>
                {country.isTurkey
                  ? selected.id === "اظهار الكل"
                    ? group.projects.map((project) => (
                        <ProjectCard
                          {...project}
                          roomsWithPrices={project.roomsWithPrices}
                          key={project.id}
                        />
                      ))
                    : group.projects
                        .filter((pro) => pro.cityId === selected.id)
                        .map((project) => (
                          <ProjectCard
                            {...project}
                            roomsWithPrices={project.roomsWithPrices}
                            key={project.id}
                          />
                        ))
                  : group.projects.map((project) => (
                      <ProjectCard
                        {...project}
                        roomsWithPrices={project.roomsWithPrices}
                        key={project.id}
                      />
                    ))}
              </React.Fragment>
            ))}
          </Grid>

          <FetchMoreButton
            disabled={!canFetchMore || !!isFetchingMore}
            onClick={fetchMore}
            isFetchingMore={isFetchingMore || isFetching}
            canFetchMore={canFetchMore}
          />
        </Wrapper>
      </Box>
    </div>
  )
}
