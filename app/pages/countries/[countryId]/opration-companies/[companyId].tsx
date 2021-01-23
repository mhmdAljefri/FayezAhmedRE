import React from "react"
import { BlitzPage, useParam, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Heading } from "theme-ui"
import getOprationCompanyPage from "app/public/oprationCompanyPages/queries/getOprationCompanyPage"
import {
  ConstractiongVideo,
  ContructionCompaniesDetails,
  GalleryView,
} from "app/layouts/ProjectDetailsLayout"
import HTMLBox from "app/components/HTMLBox"
import Image from "app/components/Image"

const OprationCompanyPage: BlitzPage = () => {
  const companyId = useParam("companyId", "number")
  const [oprationCompanyPage] = useQuery(getOprationCompanyPage, { where: { id: companyId } })
  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={oprationCompanyPage.title}>
      <Box sx={{ py: 6, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          <Image src={oprationCompanyPage.image || ""} alt={oprationCompanyPage.title} />
        </Wrapper>
        <Wrapper sx={{ paddingBottom: 5 }}>
          <Heading sx={{ fontSize: 6, fontWeight: 700 }}>{oprationCompanyPage.title}</Heading>
          <HTMLBox html={oprationCompanyPage.description} />
        </Wrapper>
      </Box>

      <GalleryView gallery={oprationCompanyPage.galleryImages} />

      <ConstractiongVideo
        heading=""
        constructingUpdateVideo={oprationCompanyPage.constructingUpdateVideo}
        constructingUpdatePrview={oprationCompanyPage.constructingUpdatePrview}
      />

      <ContructionCompaniesDetails {...(oprationCompanyPage.oprationCompanies as any)} />
    </Layout>
  )
}

export default OprationCompanyPage
