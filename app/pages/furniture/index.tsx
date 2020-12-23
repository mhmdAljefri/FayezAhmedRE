import React from "react"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
import { Box, Heading } from "theme-ui"
import { FurnishCategory } from "@prisma/client"
import getFurnishCategories from "app/public/furnishCategories/queries/getFurnishCategories"
import FurnishCategoryCard from "app/components/FurnishCategoryCard"
import SlickSlider from "app/components/SlickSlider"

type furnishCategoriesProps = {
  furnishCategories: FurnishCategory[]
}
const Search: BlitzPage<furnishCategoriesProps> = ({ furnishCategories }) => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 6 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 7, color: "white" }}>أنواع الاثاث</Heading>
        </Wrapper>
      </Box>
      <Wrapper sx={{ marginTop: -5, marginBottom: 5 }}>
        <SlickSlider rtl>
          {furnishCategories.map((furnishCategory) => (
            <FurnishCategoryCard {...furnishCategory} />
          ))}
        </SlickSlider>
      </Wrapper>
    </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { furnishCategories, count } = await getFurnishCategories({
    where: {},
  })
  // Pass data to the page via props
  return {
    props: {
      furnishCategories,
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
