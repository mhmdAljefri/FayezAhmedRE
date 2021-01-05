import React from "react"
import { BlitzPage, Link } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Heading, Image, Link as ThemeLink } from "theme-ui"
import getOffer from "app/public/offers/queries/getOffer"
import getOffers from "app/public/offers/queries/getOffers"
import ArrowIcon from "app/components/ArrowIcon"
import { ConstractiongVideo, GalleryView, PaymentPlan } from "app/layouts/ProjectDetailsLayout"
import { Offer, Project } from "@prisma/client"
import HTMLBox from "app/components/HTMLBox"

const WhatsNew: BlitzPage<{ offer: Offer & { project?: Project } }> = ({ offer }) => {
  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={offer.name}>
      <Box sx={{ py: 6, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          <Image src={offer.image || ""} alt={offer.name} />
        </Wrapper>
        <Wrapper sx={{ paddingY: 5 }}>
          <Heading sx={{ fontSize: [5, 6], fontWeight: 700 }}>{offer.name}</Heading>
          <Heading sx={{ fontSize: 4, fontWeight: 700 }}>{offer.subTitle}</Heading>
          <HTMLBox html={offer.details} />
        </Wrapper>
      </Box>
      <Wrapper>
        <PaymentPlan installmentPlan={offer.installmentPlan} />
      </Wrapper>
      <ConstractiongVideo
        heading=""
        constructingUpdateVideo={offer.constructingUpdateVideo}
        constructingUpdatePrview={offer.constructingUpdatePrview}
      />

      {offer.brochure && (
        <ThemeLink
          download={offer.name}
          target="_blank"
          rel="noopener "
          href={offer.brochure}
          sx={{
            variant: "links.outline",
            opacity: 1,
            maxWidth: 250,
            marginX: "auto",
            marginY: 5,
            textAlign: "center",
          }}
        >
          تنزيل البروشور
        </ThemeLink>
      )}
      {offer.project && (
        <Box sx={{ backgroundColor: "light", paddingY: 5 }}>
          <Wrapper>
            <Link passHref href={`/countries/${offer.countryId}/projects/${offer.project?.name}`}>
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
            </Link>
          </Wrapper>
        </Box>
      )}
      {offer.gallery.length > 0 && <GalleryView gallery={offer.gallery} />}
    </Layout>
  )
}

export async function getStaticPaths() {
  const { offers } = await getOffers({})
  const paths = offers.map((offer: Offer) => ({
    params: {
      countryId: `${offer.countryId}`,
      offerId: `${offer.id}`,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const offerId = parseInt(context.params.offerId)
  const offer = await getOffer({ where: { id: offerId } })

  return {
    props: {
      offer,
    },
    revalidate: 60 * 2,
  }
}

export default WhatsNew
