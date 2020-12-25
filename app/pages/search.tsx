import React, { useState } from "react"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useQuery, useRouter } from "blitz"
import { Box, Flex, Link as ThemeLink, Image, Heading, Input, Text } from "theme-ui"
import getProjects from "app/public/projects/queries/getProjects"
import { Project } from "@prisma/client"
import { Icon } from "react-icons-kit"
import { search } from "react-icons-kit/fa/search"
import useTimeout from "app/hooks/useTimeout"
import ArrowIcon from "app/components/ArrowIcon"
import HTMLBox from "app/components/HTMLBox"

const select = {
  name: true,
  details: true,
  countryId: true,
  image: true,
}
type SearchProps = {
  projects: Project[]
}
const Search: BlitzPage<SearchProps> = ({ projects: ssrProjects }) => {
  const { query } = useRouter()
  const searchQuery: string = query.q as string
  const [value, setValue] = useState<string>(searchQuery)
  const [{ projects }, { refetch }] = useQuery(
    getProjects,
    {
      where: {
        name: { contains: value },
      },
      select,
    },
    { initialData: { projects: ssrProjects }, enabled: true }
  )

  useTimeout(refetch, 3000, value)

  return (
    <div>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Flex
            sx={{
              position: "relative",
              maxWidth: 800,
              color: "white",
            }}
          >
            <Input
              variant="none"
              sx={{
                height: 150,
                borderWidth: 0,
                fontSize: 7,
                paddingInlineEnd: 80,
                paddingY: 4,
                ":focus": {
                  borderWidth: 0,
                },
              }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              name="search"
              placeholder="البحث عن"
            />
            <Box sx={{ position: "absolute", left: 15, top: 65 }}>
              <Icon size={30} icon={search} />
            </Box>
          </Flex>
        </Wrapper>
      </Box>
      <Wrapper>
        <Box>
          {projects.length === 0 && (
            <Box>
              <Text sx={{ fontSize: 5, paddingY: 5 }}>لا توجد بيانات مطابقة لعملية البحث!</Text>
            </Box>
          )}
          {projects.map((item) => {
            return (
              <Flex sx={{ maxWidth: 500, margin: 3, flexWrap: "wrap", alignItems: "flex-start" }}>
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
                    <HTMLBox html={item.details} />
                  </Box>
                  <Link passHref href={`/countries/${item.countryId}/projects/${item.name}`}>
                    <ThemeLink>
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

export async function getServerSideProps(context) {
  const { query } = context
  console.log({ query })
  // Fetch data from external API
  const { projects, count } = await getProjects({
    where: {
      name: {
        contains: query.q,
      },
    },
    select,
  })
  // Pass data to the page via props
  return {
    props: {
      projects,
      count,
    },
  }
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
