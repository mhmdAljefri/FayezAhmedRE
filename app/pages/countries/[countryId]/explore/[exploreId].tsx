import React from "react"
import { BlitzPage, Link, useRouter } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Button, Heading } from "theme-ui"
import getExplore from "app/public/explores/queries/getExplore"
import { ConstractiongVideo } from "app/layouts/ProjectDetailsLayout"
import getExplores from "app/public/explores/queries/getExplores"
import { Explore } from "@prisma/client"
import HTMLBox from "app/components/HTMLBox"
import OptmizationImage from "app/components/OptmizationImage"

type ExploreProps = {
  explore: Explore
  // next: Explore
  // prev: Explore
}
const WhatsNew: BlitzPage<ExploreProps> = ({ explore /** next, prev */ }) => {
  const router = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={explore.title}>
      <Box sx={{ py: 5, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          {explore.videoUrl ? (
            <ConstractiongVideo
              heading=""
              constructingUpdatePrview={explore.image}
              constructingUpdateVideo={explore.videoUrl}
            />
          ) : (
            <Box
              sx={{
                marginTop: -6,
                overflow: "hidden",
                textAlign: "center",
                position: "relative",

                ":after": {
                  display: "block",
                  content: '""',
                  /* 16:9 aspect ratio */
                  paddingBottom: "38.25%",
                  boxSizing: "border-box",
                  minHeight: [200, null, 250],
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                }}
              >
                <OptmizationImage
                  layout="fill"
                  objectPosition="center"
                  objectFit="cover"
                  src={explore.image}
                  alt={explore.title}
                />
              </Box>
            </Box>
          )}
        </Wrapper>
        <Wrapper sx={{ paddingBottom: 5, img: { maxWidth: "100%" } }}>
          <Heading as="h1" sx={{ fontSize: 6, fontWeight: 700, textAlign: "center", marginY: 5 }}>
            {explore.title}
          </Heading>
          <HTMLBox html={explore.description} />

          <Link href={`/countries/${explore.countryId}/explore`}>
            <Button>المزيد</Button>
          </Link>
        </Wrapper>
      </Box>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { explores } = await getExplores({})
  const paths = explores.map((explore: Explore) => ({
    params: {
      countryId: `${explore.countryId}`,
      exploreId: `${explore.id}`,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const exploreId = parseInt(context.params.exploreId)
  const explore = await getExplore({ where: { id: exploreId } })
  // const next = await getExplore({ where: { id: explore.id + 1 } })
  // const prev = await getExplore({ where: { id: explore.id - 1 } })

  return {
    props: {
      explore,
      // next,
      // prev,
    },
    revalidate: 60 * 2,
  }
}

export default WhatsNew
