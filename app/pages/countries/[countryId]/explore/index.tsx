import React, { useState } from "react"
import Layout from "app/layouts/Layout"
import getExplores from "app/public/explores/queries/getExplores"
import { Box, Flex, Grid } from "theme-ui"
import ExploreCard from "app/components/ExploreCard"
import { Explore } from "@prisma/client"
import getCountries from "app/public/countries/queries/getCountries"
import Wrapper from "app/components/Wrapper"
import { useRouter } from "blitz"
import ExploreToggleButton from "app/components/Buttons/ExploreToggleButton"

type Props = {
  explores: Explore[]
}
type inpirationGallery = Explore["type"]

function ExploresPage({ explores: ssgExplores }: Props) {
  const router = useRouter()
  const [showInspirationGallery, setShowInspirationGallery] = useState<inpirationGallery>(
    "dontMissitGallery"
  )
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const explores = ssgExplores.filter((explore: Explore) => explore.type === showInspirationGallery)

  return (
    <>
      <Box sx={{ py: 5, backgroundColor: "dark" }}>
        <Wrapper>
          <Flex
            sx={{
              justifyContent: "space-evenly",
              borderBottomWidth: 3,
              borderBlockColor: "primary",
              borderBottomStyle: "solid",
              paddingBottom: 3,
            }}
          >
            <ExploreToggleButton
              onClick={() => setShowInspirationGallery("exploreGallery")}
              isActive={showInspirationGallery === "exploreGallery"}
            >
              إستكشف
            </ExploreToggleButton>
            <ExploreToggleButton
              onClick={() => setShowInspirationGallery("getInspiredGallery")}
              isActive={showInspirationGallery === "getInspiredGallery"}
            >
              استمد الإلهام
            </ExploreToggleButton>
            <ExploreToggleButton
              onClick={() => setShowInspirationGallery("dontMissitGallery")}
              isActive={showInspirationGallery === "dontMissitGallery"}
            >
              لا يفوتك
            </ExploreToggleButton>
          </Flex>
        </Wrapper>
      </Box>
      <Wrapper sx={{ py: 5 }}>
        <Grid columns={[1, 2, 3]}>
          {explores.map(({ image, title, id, countryId }, index) => (
            <ExploreCard
              key={id}
              href={`/countries/${countryId}/explore/${id}`}
              image={image}
              title={title}
            />
          ))}
        </Grid>
      </Wrapper>
    </>
  )
}

ExploresPage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="جديدنا">
    {page}
  </Layout>
)

export async function getStaticPaths() {
  const { countries } = await getCountries({})
  const paths = countries.map((c) => ({
    params: {
      countryId: `${c.id}`,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const countryId = parseInt(context.params.countryId)
  const { explores } = await getExplores({
    where: { countryId: parseInt(`${countryId}`) },
    orderBy: { id: "desc" },
  })

  return {
    props: {
      explores,
    },
    revalidate: 60 * 2,
  }
}

export default ExploresPage
