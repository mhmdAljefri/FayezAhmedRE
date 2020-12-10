import React from "react"
import { BlitzPage, useParam, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Heading, Image } from "theme-ui"
import getOffer from "app/public/offers/queries/getOffer"

const WhatsNew: BlitzPage = () => {
  const offerTitle = useParam("title", "string")
  const [offer] = useQuery(getOffer, { where: { name: offerTitle } })
  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={offerTitle}>
      <Box sx={{ py: 6, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          <Image src={offer.image || ""} alt={offer.name} />
        </Wrapper>
        <Wrapper sx={{ paddingBottom: 5 }}>
          <Heading sx={{ fontSize: 6, fontWeight: 700 }}>{offer.name}</Heading>
          <Box dangerouslySetInnerHTML={{ __html: offer.details }} />
        </Wrapper>
      </Box>
      <Box sx={{ backgroundColor: "light", paddingY: 5 }}>
        <Wrapper>
          {/* <Link passHref href={`/countries/${offer.countryId}/projects/${offer.project.name}`}>
            <ThemeLink
              sx={{
                marginY: 4,
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-block",
              }}
            >
              <Box as="span" sx={{ paddingX: 5 }}>
                عرض المشروع
              </Box>
              <ArrowIcon />
            </ThemeLink>
          </Link> */}
        </Wrapper>
      </Box>
    </Layout>
  )
}

export default WhatsNew
