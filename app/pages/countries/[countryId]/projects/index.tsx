import React, { useRef, useState } from "react"
import Layout from "app/layouts/Layout"
import {
  BlitzPage,
  useRouter,
  InferGetStaticPropsType,
  useRouterQuery,
  useParam,
  useQuery,
  useInfiniteQuery,
} from "blitz"
import getCountries from "app/public/countries/queries/getCountries"
import getCountry from "app/public/countries/queries/getCountry"
import getProjects from "app/public/projects/queries/getProjects"
import getPurposes from "app/public/purposes/queries/getPurposes"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import { Box, Heading, Text, Grid } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import ProjectCard from "app/components/Cards/ProjectCard"
import CitiesFilter, { SelectedCity } from "app/components/CitiesFilter"
import Filter, { filterValues } from "app/components/Forms/Filter"
import FetchMoreButton from "app/components/FetchMoreButton"
import getProjectsInfinite from "app/public/projects/queries/getInfiniteProjects"
import { getSearchQuery } from "app/utils"

export async function getStaticPaths() {
  const { countries } = await getCountries({})
  const paths = countries.map((country) => ({
    params: {
      countryId: `${country.id}`,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const countryId = parseInt(context.params.countryId)
  const { projects } = await getProjects({
    where: { countryId: countryId },
    include: {
      roomsWithPrices: true,
    },
  })
  const country = await getCountry({ where: { id: countryId } })
  const { purposes } = await getPurposes({})
  const { propertyTypes } = await getPropertyTypes({})

  return {
    props: {
      country,
      projects,
      purposes,
      propertyTypes,
    },
    revalidate: 60 * 15,
  }
}

const Projects: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  country,
  projects,
  purposes,
}) => {
  const router = useRouter()
  const filter = useRouterQuery()
  const filterRef = useRef<filterValues>(filter)
  const countryId = parseInt(useParam("countryId") as string)
  const { search, city, price, purpose, propertyType, status } = filterRef.current || {}
  const [{ propertyTypes }] = useQuery(getPropertyTypes, {})
  const [selected, setSelected] = useState<SelectedCity>({ id: "اظهار الكل", name: "اظهار الكل" })
  const [
    groupedProjects,
    { isFetching, refetch, fetchMore, canFetchMore, isFetchingMore },
  ] = useInfiniteQuery(
    getProjectsInfinite,
    (page = { take: 9, skip: 0 }) => ({
      ...page,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        countryId,
        OR: getSearchQuery(search, ["name", "subTitle"]),
        propertyType: {
          id: {
            equals:
              propertyType && !Number.isNaN(parseInt(propertyType))
                ? parseInt(propertyType)
                : undefined,
          },
        },
        purpose: {
          id: {
            equals: purpose ? parseInt(purpose) : undefined,
          },
        },

        status: status,
        //         propertyType
        // status
        city: {
          id: {
            equals:
              typeof selected.id !== "string" ? selected.id : parseInt(city || "") || undefined,
          },
        },
        roomsWithPrices: {
          some: {
            priceQatar: {
              lt: price?.[1]?.toString() || undefined,
              gte: price?.[0]?.toString() || undefined,
            },
          },
        },
      },
    }),
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
    }
  )

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 7,
          color: "heading",
          backgroundColor: "dark",
          marginBottom: 4,
        }}
      >
        <Wrapper>
          <Heading as="h1" sx={{ fontSize: 7, color: "heading" }}>
            مشاريعنا
          </Heading>
          <Text sx={{ fontSize: 4 }}>اكتشف منزل أحلامك</Text>
        </Wrapper>
      </Box>
      <Wrapper sx={{ marginTop: -7, marginBottom: 5 }}>
        <Filter
          purposes={purposes}
          propertyTypes={propertyTypes}
          initialValues={filter}
          isTurkey={country.isTurkey}
          rooms={country.rooms}
          cities={country.cities}
          onFilter={(data) => {
            filterRef.current = data
            refetch()
          }}
        />
      </Wrapper>

      <CitiesFilter
        selected={selected}
        onClick={(city) => setSelected({ name: city.name, id: city.id })}
        cities={country.cities}
      />

      <Box>
        <Wrapper>
          <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
            {groupedProjects.map((group, i) => (
              <React.Fragment key={i}>
                {group.projects.map((project) => (
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

Projects.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="مشاريعنا">
    {page}
  </Layout>
)

export default Projects
