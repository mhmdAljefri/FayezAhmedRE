import React from "react"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import { BlitzPage, useParam } from "blitz"
import { Box, Flex, Heading, Text } from "theme-ui"
import { Furnish } from "@prisma/client"
import getFurnish from "app/public/furnishes/queries/getFurnish"
import HTMLBox from "app/components/HTMLBox"
import Image from "app/components/Image"

type furnishesProps = {
  furnish: Furnish
}
const Search: BlitzPage<furnishesProps> = ({ furnish }) => {
  const furnishName = useParam("furnishName", "string")
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 6 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 7, color: "white" }}>{furnishName}</Heading>
        </Wrapper>
      </Box>
      <Wrapper>
        <Flex sx={{ flexWrap: ["wrap", "nowrap"] }}>
          <Box
            sx={{
              width: ["100%", "50%"],
              marginTop: -5,
            }}
          >
            <Image src={furnish.image} alt={furnish.name} />
          </Box>
          <Box
            sx={{
              backgroundColor: "light",
              width: ["100%", "40%"],
              borderTopRightRadius: "lg",
              borderTopLeftRadius: "lg",
              marginRight: "10%",
              marginTop: [3, 6],
              paddingY: 5,
              paddingX: 4,
            }}
          >
            <Heading sx={{ fontSize: 6 }}>{furnish.name}</Heading>
            <Text sx={{ fontSize: 6 }}>
              <Text as="span" sx={{ fontSize: 2, marginTop: -3, display: "inline-block" }}>
                $
              </Text>
              {furnish.price}
            </Text>
            <HTMLBox sx={{ fontSize: 3 }} html={furnish.description} />
          </Box>
        </Flex>
      </Wrapper>
    </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { query } = context
  const furnish = await getFurnish({
    where: {
      name: query.furnishName,
    },
  })
  // Pass data to the page via props
  return {
    props: {
      furnish,
    },
  }
}

Search.getLayout = (page) => (
  <Layout
    headerProps={{
      sx: { backgroundColor: "dark" },
    }}
    title="الاثاث"
  >
    {page}
  </Layout>
)

export default Search
