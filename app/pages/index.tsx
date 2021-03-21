import { BlitzPage, useRouter, InferGetStaticPropsType } from "blitz"
import dynamic from "next/dynamic"
import Layout from "app/layouts/Layout"
import { SyncLoader } from "react-spinners"
import { Box, Grid, Heading, Flex, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"

import getCarousels from "app/public/carousels/queries/getCarousels"
import getProjects from "app/public/projects/queries/getProjects"
import getCarouselVideo from "app/public/carouselvideos/queries/getCarouselvideo"
import getOffers from "app/public/offers/queries/getOffers"
import SkeltonLoaderCard from "app/components/Cards/SkeltonLoaderCard"

import LatestOffersSection from "app/components/LatestOffersSection"
import Twits from "app/components/Twits"
import MostViewd from "app/components/Cards/MostViewd"
import { Swiper, SwiperSlide } from "app/components/Sliders/Swiper"
import HeroSection from "app/components/HeroSection" // suspended component
import Filter from "app/components/Forms/Filter"
import getCountry from "app/public/countries/queries/getCountry"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import { useState } from "react"
import ExploreToggleButton from "app/components/Buttons/ExploreToggleButton"
import LazyLoad from "react-lazyload"
import HeadingWithMoreLink from "app/components/HeadingWithMoreLink"
import getFurnishCategories from "app/public/furnishCategories/queries/getFurnishCategories"
import ExploreCard from "app/components/ExploreCard"
import { Explore } from "@prisma/client"
import ServicesForm from "app/components/Forms/ServicesForm"
import FurnishCategoryCard from "app/components/FurnishCategoryCard"
import ProjectSlider from "app/components/Sliders/ProjectSlider"
import ShowMoreButton from "app/components/ShowMoreButton"
import AboutUSSection from "app/components/AboutUSSection"

const Contact = dynamic(() => import("app/components/Forms/Contact"), {
  ssr: false,
  loading: () => (
    <Box sx={{ height: 100, alignItems: "center", justifyContent: "center", color: "primary" }}>
      <SyncLoader />
    </Box>
  ),
})

export async function getStaticProps(context) {
  const { carousels } = await getCarousels({})
  const { offers } = await getOffers({}, context)
  const carouselVideo = await getCarouselVideo({})

  const { projects: qatarMostViewd } = await getProjects({
    where: {
      country: {
        isTurkey: false,
      },
    },
    take: 4,
    orderBy: {
      views: "desc",
    },
  })

  const { projects } = await getProjects({
    include: {
      country: {
        select: {
          name: true,
          isTurkey: true,
          id: true,
        },
      },
      roomsWithPrices: true,
      city: true,
    },

    take: 6,
    where: {
      isHousingComplex: true,
    },
  })

  /** remove turkey page changes */
  const country = await getCountry({
    where: { suspend: false },
  })
  const { propertyTypes } = await getPropertyTypes({})
  const { furnishCategories } = await getFurnishCategories({
    select: { name: true, image: true, id: true },
  })

  return {
    props: {
      propertyTypes,
      furnishCategories,
      country,
      offers,
      mostViewedProjects: qatarMostViewd,
      projects,
      carousels,
      carouselVideo,
    }, // will be passed to the page component as props
    revalidate: 60 * 15,
  }
}
type inpirationGallery = Explore["type"]

const Home: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  country,
  offers,
  projects,
  carouselVideo,
  propertyTypes,
  carousels,
  mostViewedProjects,
  furnishCategories,
}) => {
  const { push } = useRouter()
  const asPath = `/countries/${country.id}`

  const [showInspirationGallery, setShowInspirationGallery] = useState<inpirationGallery>(
    "exploreGallery"
  )
  const exploresArray = country.explores.filter(
    (explore) => explore.type === showInspirationGallery
  )
  const explores: typeof exploresArray[] = []
  while (exploresArray.length) explores.push(exploresArray.splice(0, 3))

  const handleFilter = (filter) => {
    push({ pathname: `${asPath}/projects`, query: filter })
  }

  return (
    <main>
      <HeroSection carousels={carousels} carouselVideo={carouselVideo} />

      <AboutUSSection />

      <Box sx={{ backgroundColor: "background" }}>
        <Wrapper
          sx={{
            paddingX: [2, null, null, 6],
            marginTop: 5,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Filter {...country} propertyTypes={propertyTypes} onFilter={handleFilter} />
        </Wrapper>
      </Box>

      <LatestOffersSection offers={offers} />
      <Wrapper>
        <HeadingWithMoreLink
          sx={{
            display: ["none", "none", "unset"],
          }}
          href={`${asPath}/projects`}
          heading="مشاريعنا"
        />
        <Text sx={{ mb: 3 }}>منزلك الجديد بانتظارك</Text>
        <ProjectSlider projects={projects} />
        <ShowMoreButton
          href={`${asPath}/projects`}
          sx={{
            display: ["auto", "none"],
          }}
        />
      </Wrapper>

      <Box
        sx={{
          backgroundColor: "dark",
          paddingTop: 350,
          marginTop: -200,
          paddingBottom: 100,
        }}
      >
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
      <Wrapper sx={{ marginTop: -80, marginBottom: 5 }}>
        <Swiper
          lazy
          pagination={{
            clickable: true,
          }}
        >
          {explores.map((nestedExplores, index) => (
            <SwiperSlide key={showInspirationGallery + index} virtualIndex={index}>
              <Grid columns={[1, 1, 3]} sx={{ mb: 5 }}>
                {nestedExplores.map(({ image, title, id }) => (
                  <ExploreCard
                    key={id}
                    href={`${asPath}/explore/${id}`}
                    image={image}
                    title={title}
                  />
                ))}
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>

      <LazyLoad once>
        <Wrapper sx={{ paddingY: 5 }}>
          <HeadingWithMoreLink href="/furniture" heading="اثث منزلك" />
          <Swiper
            pagination={{
              clickable: true,
            }}
            spaceBetween={20}
            breakpoints={{
              520: {
                slidesPerView: 2,
              },
              760: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {furnishCategories.map((furnishCategory) => (
              <SwiperSlide key={furnishCategory.id} virtualIndex={furnishCategory.id}>
                <Box sx={{ minHeight: 300 }}>
                  <FurnishCategoryCard {...furnishCategory} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Wrapper>
      </LazyLoad>

      <Wrapper
        id="ServicesForm"
        sx={{
          paddingTop: 5,
          zIndex: 1,
          position: "relative",
        }}
      >
        <ServicesForm cities={country.cities} />
      </Wrapper>
      <Twits />

      <Box sx={{ pt: 5, pb: 6, backgroundColor: "background" }}>
        <Wrapper>
          <Heading sx={{ fontSize: [4, 5, 6] }}>الاكثر مشاهدة</Heading>

          <Grid sx={{ paddingX: [1, 2, 4], marginTop: 5 }} columns={[1, 2, 2, 4]}>
            {mostViewedProjects
              .sort((first, second) => (first.views > second.views ? 1 : -1))
              .map((project) => (
                <MostViewd key={project.id} project={project} />
              ))}
          </Grid>
        </Wrapper>
      </Box>

      <Box
        sx={{
          pb: 100,
          backgroundColor: "background",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Contact />
      </Box>
    </main>
  )
}

Home.getLayout = (page) => (
  <Layout headerProps={{ sx: { position: "fixed" } }} title="الرئيسية">
    {page}
  </Layout>
)

export default Home
