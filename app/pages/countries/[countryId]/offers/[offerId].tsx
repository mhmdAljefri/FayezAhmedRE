import React from "react"
import { BlitzPage, dynamic, Link, useRouter } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Heading, Link as ThemeLink } from "theme-ui"
import getOffer from "app/public/offers/queries/getOffer"
import getOffers from "app/public/offers/queries/getOffers"
import ArrowIcon from "app/components/ArrowIcon"
import { ConstractiongVideo, PaymentPlan } from "app/layouts/ProjectDetailsLayout"
import { Offer, Project } from "@prisma/client"
import HTMLBox from "app/components/HTMLBox"
import Image from "app/components/Image"
import Skeleton from "react-loading-skeleton"
import LazyLoad from "react-lazyload"

const GalleryViewSlider = dynamic(() => import("app/components/Sliders/GalleryViewSlider"), {
  ssr: false,
  loading: () => <Skeleton height={250} />,
})

const WhatsNew: BlitzPage<{ offer: Offer & { project?: Project } }> = ({ offer }) => {
  const router = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={offer.name}>
      <Box sx={{ py: 6, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          {offer.mainVideo ? (
            <Box sx={{ height: [240, 350, 450, 550] }}>
              {offer.mainVideo.startsWith("https://www.youtube") ? (
                <iframe width="100%" height="100%" title="any" src={offer.mainVideo}></iframe>
              ) : (
                <video
                  width="100%"
                  height="100%"
                  style={{ height: "100%", width: "100%", minHeight: "100vh", objectFit: "cover" }}
                  poster={offer.image || "any"}
                  // poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
                  controls
                >
                  <track kind="captions" />
                  <source src={offer.mainVideo.replace("http://", "https://")} type="video/mp4" />
                  <source src={offer.mainVideo.replace("http://", "https://")} type="video/ogg" />
                  <source src={offer.mainVideo.replace("http://", "https://")} type="video/webm" />
                  <object data={offer.mainVideo.replace("http://", "https://")}>
                    <embed src={offer.mainVideo.replace("http://", "https://")} />
                  </object>
                </video>
              )}
            </Box>
          ) : (
            <Image src={offer.image || ""} alt={offer.name} />
          )}
        </Wrapper>
        <Wrapper sx={{ paddingY: 5 }}>
          <Heading as="h1" sx={{ fontSize: [5, 6], fontWeight: 700 }}>
            {offer.name}
          </Heading>
          <Heading sx={{ fontSize: 3, mt: 3, fontWeight: 700 }}>{offer.subTitle}</Heading>
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
        <Wrapper>
          <Link passHref href={`/countries/${offer.countryId}/projects/${offer.project.id}`}>
            <ThemeLink
              sx={{
                variant: "links.outline",
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
      )}
      {offer.gallery.length > 0 && (
        <LazyLoad once offset={200}>
          <GalleryViewSlider gallery={offer.gallery} />
        </LazyLoad>
      )}
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
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const offerId = parseInt(context.params.offerId)
  const offer = await getOffer({ where: { id: offerId } })

  return {
    props: {
      offer,
    },
    revalidate: 60 * 15,
  }
}

export default WhatsNew
