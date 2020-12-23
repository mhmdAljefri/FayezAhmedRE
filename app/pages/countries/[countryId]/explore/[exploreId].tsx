import React from "react"
import { BlitzPage, Link } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Button, Flex, Heading, Image } from "theme-ui"
import getExplore from "app/public/explores/queries/getExplore"
import { ConstractiongVideo } from "app/layouts/ProjectDetailsLayout"
import ArrowIcon from "app/components/ArrowIcon"
import getExplores from "app/public/explores/queries/getExplores"
import { Explore } from "@prisma/client"

type ExploreProps = {
  explore: Explore
  // next: Explore
  // prev: Explore
}
const WhatsNew: BlitzPage<ExploreProps> = ({ explore /** next, prev */ }) => {
  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={explore.title}>
      <Box sx={{ py: 6, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          {explore.videoUrl ? (
            <ConstractiongVideo
              heading=""
              constructingUpdatePrview={explore.image}
              constructingUpdateVideo={explore.videoUrl}
            />
          ) : (
            <Image src={explore.image} alt={explore.title} />
          )}
        </Wrapper>
        <Wrapper sx={{ paddingBottom: 5 }}>
          <Heading sx={{ fontSize: 6, fontWeight: 700, textAlign: "center", marginY: 5 }}>
            {explore.title}
          </Heading>
          <Box dangerouslySetInnerHTML={{ __html: explore.description }} />

          {/* <Flex>
            <Link href={`/countries/${prev.countryId}/explore/${prev?.id}`}>
              <Button variant="link" as="a">
                {prev?.title}
                <ArrowIcon sx={{ transform: "rotate(180deg)" }} />
              </Button>
            </Link>
            <Link href={`/countries/${next.countryId}/explore/${next?.id}`}>
              <Button variant="link" as="a">
                {next?.title}
                <ArrowIcon />
              </Button>
            </Link>
          </Flex> */}
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
    fallback: false,
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
