import React, { useRef } from "react"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useQuery, useRouterQuery, InferGetStaticPropsType } from "blitz"
import { Box, Flex, Link as ThemeLink, Heading, Text, Grid } from "theme-ui"
import getProjects from "app/public/projects/queries/getProjects"
import ArrowIcon from "app/components/ArrowIcon"
import Image from "app/components/Image"
import Filter, { filterValues } from "app/components/Forms/Filter"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import getCountry from "app/public/countries/queries/getCountry"
import getOffers from "app/public/offers/queries/getOffers"
import { getSearchQuery, getListOfPrice } from "app/utils"
import getPurposes from "app/public/purposes/queries/getPurposes"
import { STATUS } from "db"
import ProjectCard from "app/components/Cards/ProjectCard"
import OfferCard from "app/components/Cards/OfferCard"

export const getStaticProps = async (context) => {
  const { propertyTypes } = await getPropertyTypes({})
  const { purposes } = await getPurposes({})
  const country = await getCountry({ where: { suspend: false } })

  return {
    props: {
      propertyTypes,
      purposes,
      country,
    },
  }
}

type SearchProps = InferGetStaticPropsType<typeof getStaticProps>
const Search: BlitzPage<SearchProps> = ({ propertyTypes, purposes, country }) => {
  const filter = useRouterQuery()
  const filterRef = useRef<filterValues>(filter)
  const { search, city, status, price, propertyType, purpose } = filterRef.current || {}
  const propertyTypeObj = propertyTypes.find(({ id }) => id === parseInt(propertyType || ""))

  const canFilterWithProject = price?.[1] && price?.[0]

  const [{ offers }] = useQuery(getOffers, {
    include: {
      city: true,
    },
    where: {
      OR: getSearchQuery(search, ["name", "subTitle"]),

      city: { id: parseInt(city || "") || undefined },
      project: canFilterWithProject
        ? {
            roomsWithPrices: {
              some: {
                roomPrice: {
                  lte: parseInt(`${price?.[1]}`) || undefined,
                  gte: parseInt(`${price?.[0]}`) || undefined,
                },
              },
            },
          }
        : undefined,

      status: {
        equals: status! as STATUS,
      },
      propertyType: {
        contains: propertyTypeObj?.name,
      },
      purpose: {
        id: {
          equals: purpose && parseInt(purpose) ? parseInt(purpose) : undefined,
        },
      },
    },
  })

  const [{ projects }, { refetch }] = useQuery(getProjects, {
    where: {
      OR: getSearchQuery(search, ["name", "subTitle"]),
      propertyType: {
        id: {
          equals: propertyType && parseInt(propertyType) ? parseInt(propertyType) : undefined,
        },
      },
      status: {
        equals: status! as STATUS,
      },
      city: { id: parseInt(city || "") || undefined },

      purpose: {
        id: {
          equals: purpose && parseInt(purpose) ? parseInt(purpose) : undefined,
        },
      },
      roomsWithPrices: {
        some: {
          roomPrice: {
            lte: parseFloat(`${price?.[1]}`) || undefined,
            gte: parseFloat(`${price?.[0]}`) || undefined,
          },
        },
      },
    },
  })

  return (
    <div>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Filter
            purposes={purposes}
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
      </Box>
      <Wrapper>
        <Box>
          {projects.length === 0 && offers.length === 0 && (
            <Box>
              <Text sx={{ fontSize: 5, paddingY: 5 }}>لا توجد بيانات مطابقة لعملية البحث!</Text>
            </Box>
          )}
          <Grid columns={[1, 1, 2, 3]}>
            {projects.map((item) => {
              return <ProjectCard key={`proj-${item.id}`} {...item} />
            })}
            {offers.map((item) => {
              return (
                <OfferCard
                  prefixPath={`countries/2/offers/`}
                  key={`offer-${item.id}`}
                  {...item}
                  city={item.city!}
                />
              )
            })}
          </Grid>
        </Box>
      </Wrapper>
    </div>
  )
}

Search.getLayout = (page) => (
  <Layout
    headerProps={{
      sx: { backgroundColor: "dark" },
    }}
    title="البحث"
  >
    {page}
  </Layout>
)

export default Search
