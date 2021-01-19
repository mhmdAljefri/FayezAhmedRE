import React from "react"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import { BlitzPage, useParam } from "blitz"
import { Box, Grid, Heading } from "theme-ui"
import { Furnish } from "@prisma/client"
import FurnishCard from "app/components/FurnishCard"
import getFurnishes from "app/public/furnishes/queries/getFurnishes"

type furnishesProps = {
  furnishes: Furnish[]
}
const Search: BlitzPage<furnishesProps> = ({ furnishes }) => {
  const categoryName = useParam("categoryName", "string")
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 6 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 7, color: "white" }}>{categoryName}</Heading>
        </Wrapper>
      </Box>
      <Wrapper sx={{ marginTop: furnishes.length > 0 ? -5 : 5, marginBottom: 5 }}>
        <Grid columns={[1, null, 3]}>
          {furnishes.length > 0 ? (
            furnishes.map((furnish) => <FurnishCard key={furnish.id} {...furnish} />)
          ) : (
            <Box sx={{ fontSize: 4, textAlign: "center", paddingY: 5 }}>لا توجد بيانات</Box>
          )}
        </Grid>
      </Wrapper>
    </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { query } = context
  const { furnishes, count } = await getFurnishes({
    where: {
      furnishCategory: {
        name: query.categoryName,
      },
    },
  })
  // Pass data to the page via props
  return {
    props: {
      furnishes,
      count,
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
