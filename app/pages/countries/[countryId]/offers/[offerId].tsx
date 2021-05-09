import React from "react"
import { BlitzPage, dynamic, Link, useRouter, InferGetStaticPropsType } from "blitz"
import Layout from "app/layouts/Layout"
import Wrapper from "app/components/Wrapper"
import { Box, Heading, Link as ThemeLink } from "theme-ui"
import getOffer from "app/public/offers/queries/getOffer"
import getOffers from "app/public/offers/queries/getOffers"
import ArrowIcon from "app/components/ArrowIcon"
import { ConstractiongVideo, PaymentPlan } from "app/layouts/ProjectDetailsLayout"
import { Offer } from "@prisma/client"
import HTMLBox from "app/components/HTMLBox"
import Skeleton from "react-loading-skeleton"
import LazyLoad from "react-lazyload"
import SocialShare from "app/components/SocialShare"
import { AddOfferToFav } from "app/components/AddToFav"
import CurrencyPrice from "app/components/CurrencyPrice"
import OptmizationImage from "app/components/OptmizationImage"
import LabeldTexts from "app/components/LabeldTexts"
import usePriceType from "app/hooks/usePriceType"

const GalleryViewSlider = dynamic(() => import("app/components/Sliders/GalleryViewSlider"), {
  ssr: false,
  loading: () => <Skeleton height={250} />,
})

const GoogleMap = dynamic(() => import("app/components/GoogleMap"), {
  ssr: false,
  loading: () => <Skeleton height={250} />,
})

export async function getStaticPaths(context) {
  const { offers } = await getOffers({}, context)
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

const WhatsNew: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ offer }) => {
  const router = useRouter()
  const { priceTypeSign } = usePriceType()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title={offer.name}>
      <Box sx={{ pb: 6, pt: 4, backgroundColor: "dark" }}></Box>
      <Box sx={{ marginTop: -6 }}>
        <Wrapper sx={{ textAlign: "center" }}>
          <Box
            sx={{
              position: "absolute",
              marginTop: 22,
              zIndex: 22,
              px: 3,
              py: 2,
            }}
          >
            <SocialShare url={`/countries/${offer.countryId}/offers/${offer.id}`} />
            <AddOfferToFav isActive={false} offerId={offer.id} />
          </Box>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",

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
            {offer.mainVideo ? (
              offer.mainVideo.startsWith("https://www.youtube") ? (
                <iframe
                  style={{
                    position: "absolute",
                    inset: 0,
                  }}
                  width="100%"
                  height="100%"
                  title="any"
                  src={offer.mainVideo}
                ></iframe>
              ) : (
                <video
                  width="100%"
                  height="100%"
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
              )
            ) : (
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
                  src={offer.image || ""}
                  alt={offer.name}
                />
              </Box>
            )}
          </Box>
        </Wrapper>
        <Wrapper sx={{ paddingY: 5 }}>
          <Heading as="h1" sx={{ fontSize: [5, 6], fontWeight: 700, textAlign: "center" }}>
            {offer.name}
          </Heading>
          <Heading sx={{ fontSize: 3, mt: 3, fontWeight: 700, textAlign: "center" }}>
            {offer.subTitle}
          </Heading>
          {offer.price && (
            <Heading sx={{ fontSize: 6, mt: 4, color: "primary", textAlign: "center" }}>
              <CurrencyPrice price={offer.price} /> {priceTypeSign}
            </Heading>
          )}

          <Box mt={4}>
            <LabeldTexts small={false} {...offer} city={offer.city?.name} />
          </Box>
          <Heading sx={{ mt: 5 }}>الوصف</Heading>
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
        <Wrapper
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link passHref href={`/countries/${offer.countryId}/projects/${offer.project.id}`}>
            <ThemeLink
              sx={{
                variant: "links.outline",
                marginBottom: 4,
                marginTop: 2,
                marginX: "auto",
                textDecoration: "none",
                fontWeight: 700,
                display: "block",
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

      <Box
        sx={{
          maxWidth: [800, null, null, 900],
          mx: "auto",
        }}
      >
        {offer.location && <GoogleMap zoom={18} center={offer.location as any} />}
      </Box>

      {offer.gallery.length > 0 && (
        <LazyLoad once offset={200}>
          <GalleryViewSlider gallery={offer.gallery} />
        </LazyLoad>
      )}
    </Layout>
  )
}

export default WhatsNew
