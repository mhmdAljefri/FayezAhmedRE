import { BlitzPage, useRouter, InferGetStaticPropsType } from "blitz"
import dynamic from "next/dynamic"
import Layout from "app/layouts/Layout"
import { SyncLoader } from "react-spinners"
import { Box, Grid, Heading, Flex } from "theme-ui"
import Wrapper from "app/components/Wrapper"

import getCarousels from "app/public/carousels/queries/getCarousels"
import getProjects from "app/public/projects/queries/getProjects"
import getCarouselVideo from "app/public/carouselvideos/queries/getCarouselvideo"
import getOffers from "app/public/offers/queries/getOffers"

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
import getFurnishCategories from "app/public/furnishCategories/queries/getFurnishCategories"
import ExploreCard from "app/components/ExploreCard"
import { Explore } from "@prisma/client"
import AboutUSSection from "app/components/AboutUSSection"
import getCurrencyRate from "app/utils/getCurrencyRate"
import getExplores from "app/public/explores/queries/getExplores"
import getPurposes from "app/public/purposes/queries/getPurposes"
import ProjectsSection from "app/components/ProjectsSection"

const Contact = dynamic(() => import("app/components/Forms/Contact"), {
  ssr: false,
  loading: () => (
    <Box sx={{ height: 100, alignItems: "center", justifyContent: "center", color: "primary" }}>
      <SyncLoader />
    </Box>
  ),
})

export async function getStaticProps(context) {
  const rates = await getCurrencyRate()
  const { carousels } = await getCarousels({})
  const { offers } = await getOffers({ take: 9 }, context)
  const carouselVideo = await getCarouselVideo({})

  const { projects: qatarMostViewd } = await getProjects({
    where: {
      country: {
        isTurkey: false,
        suspend: false,
      },
    },
    take: 4,
    orderBy: {
      views: "desc",
    },
  })

  /** remove turkey page changes */
  const country = await getCountry({
    where: { suspend: false },
  })

  // find projects per city
  const projects = await Promise.all(
    country.cities.map(async (city) => {
      const { projects: cityProjects } = await getProjects({
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

        where: {
          cityId: city.id,
        },
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      })

      return cityProjects
    })
  )

  /**
   * start add all explore types to country instance
   */
  const { explores: exploreGalleryExplores } = await getExplores({
    where: { type: "exploreGallery", countryId: country.id },
    take: 9,
  })
  const { explores: getInspiredGalleryExplores } = await getExplores({
    where: { type: "getInspiredGallery", countryId: country.id },
    take: 9,
  })
  country.explores = [...country.explores, ...exploreGalleryExplores, ...getInspiredGalleryExplores]
  /**
   * end add all explore types to country instance
   */

  const { propertyTypes } = await getPropertyTypes({})
  const { purposes } = await getPurposes({})
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
      projects: projects.flat(),
      purposes,
      carousels,
      carouselVideo,
      rates,
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
  purposes,
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
    push({ pathname: `/search`, query: filter })
  }

  return (
    <>
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
          <Filter
            {...country}
            purposes={purposes}
            propertyTypes={propertyTypes}
            onFilter={handleFilter}
          />
        </Wrapper>
      </Box>

      <LatestOffersSection offers={offers} />

      <ProjectsSection
        projects={projects}
        cities={country.cities}
        projectsPagePath={`${asPath}/projects`}
      />

      <Box
        sx={{
          backgroundColor: "dark",
          paddingTop: 200,
          marginTop: -200,
          paddingBottom: 100,
        }}
      >
        <Wrapper>
          <Flex
            sx={{
              justifyContent: "space-evenly",
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
      <Wrapper sx={{ marginTop: -80, marginBottom: 4 }}>
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
          pb: 1,
          backgroundColor: "background",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Contact />
      </Box>
    </>
  )
}

Home.getLayout = (page) => (
  <Layout
    headerProps={{ sx: { position: "sticky", backgroundColor: "transparent" } }}
    title="الرئيسية"
  >
    {page}
  </Layout>
)

export default Home
