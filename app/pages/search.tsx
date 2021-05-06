import React, { useRef } from "react"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useQuery, useRouterQuery, InferGetStaticPropsType } from "blitz"
import { Box, Flex, Link as ThemeLink, Heading, Text } from "theme-ui"
import getProjects from "app/public/projects/queries/getProjects"
import ArrowIcon from "app/components/ArrowIcon"
import Image from "app/components/Image"
import Filter, { filterValues } from "app/components/Forms/Filter"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import getCountry from "app/public/countries/queries/getCountry"
import getOffers from "app/public/offers/queries/getOffers"
import { getSearchQuery, getListOfPrice } from "app/utils"
import getPurposes from "app/public/purposes/queries/getPurposes"

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
  const { search, rooms, city, price, propertyType, purpose } = filterRef.current || {}

  const [{ offers }] = useQuery(getOffers, {
    where: {
      OR: getSearchQuery(search, ["name", "subTitle"]),

      purpose: {
        id: {
          equals: purpose ? parseInt(purpose) : undefined,
        },
      },
    },
  })

  const [{ projects }, { refetch }] = useQuery(getProjects, {
    where: {
      OR: getSearchQuery(search, ["name", "subTitle"]),
      propertyType: {
        id: {
          equals: propertyType ? parseInt(propertyType) : undefined,
        },
      },
      // status: status!,
      city: { id: parseInt(city || "") || undefined },

      purpose: {
        id: {
          equals: purpose ? parseInt(purpose) : undefined,
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
          {[...projects, ...offers].map((item) => {
            return (
              <Flex
                key={item.id}
                sx={{ maxWidth: 500, margin: 3, flexWrap: "wrap", alignItems: "flex-start" }}
              >
                <Box sx={{ width: ["100%", 200], boxShadow: "card" }}>
                  <Image
                    sx={{
                      objectFit: "cover",
                    }}
                    src={item.image as string}
                    alt={item.name}
                  />
                </Box>
                <Flex
                  sx={{
                    width: ["100%", 300],
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 3,
                  }}
                >
                  <Box>
                    <Heading sx={{ fontSize: [4, 6] }}>{item.name}</Heading>
                  </Box>
                  <Link
                    passHref
                    href={
                      /**
                       * project has isDelux field which can be true or false
                       */

                      `/countries/${item.countryId}/${
                        typeof item.isDelux === "undefined" ? "offers" : "projects"
                      }/${item.id}`
                    }
                  >
                    <ThemeLink>
                      {console.log(item)}
                      <Flex
                        sx={{
                          fontWeight: 700,
                          fontSize: [3, 4],
                          alignItems: "center",
                          textDecoration: "none",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>اعرف لمزيد</span>
                        <ArrowIcon sx={{ width: 30 }} />
                      </Flex>
                    </ThemeLink>
                  </Link>
                </Flex>
              </Flex>
            )
          })}
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
