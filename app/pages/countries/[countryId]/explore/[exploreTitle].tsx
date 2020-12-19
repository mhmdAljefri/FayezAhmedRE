import React from "react"
import { BlitzPage, useParam, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Heading, Image } from "theme-ui"
import getExplore from "app/public/explores/queries/getExplore"
import { ConstractiongVideo } from "app/layouts/ProjectDetailsLayout"

const WhatsNew: BlitzPage = () => {
  const exploreTitle = useParam("exploreTitle", "string")
  const [offer] = useQuery(getExplore, { where: { title: exploreTitle } })
  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={exploreTitle}>
      <Box sx={{ py: 6, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          {offer.videoUrl ? (
            <ConstractiongVideo
              heading=""
              constructingUpdatePrview={offer.image}
              constructingUpdateVideo={offer.videoUrl}
            />
          ) : (
            <Image src={offer.image} alt={offer.title} />
          )}
        </Wrapper>
        <Wrapper sx={{ paddingBottom: 5 }}>
          <Heading sx={{ fontSize: 6, fontWeight: 700, textAlign: "center", marginY: 5 }}>
            {offer.title}
          </Heading>
          <Box dangerouslySetInnerHTML={{ __html: offer.description }} />
        </Wrapper>
      </Box>
    </Layout>
  )
}

export default WhatsNew
