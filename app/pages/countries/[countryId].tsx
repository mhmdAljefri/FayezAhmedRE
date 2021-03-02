import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import Filter from "app/components/Forms/Filter"
import { Swiper, SwiperSlide } from "app/components/Sliders/Swiper"
import React, { useState } from "react"
import { Box, Flex, Grid, Heading, Text, Link as ThemeLink } from "theme-ui"
import {
  City,
  Country,
  Explore,
  FurnishCategory,
  Offer,
  OprationCompanyPage,
  Project,
  PropertyType,
  RoomWithPrice,
} from "@prisma/client"
import { useRouter, dynamic } from "blitz"
import getCountry from "app/public/countries/queries/getCountry"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import getCountries from "app/public/countries/queries/getCountries"
import getProjects from "app/public/projects/queries/getProjects"
import getFurnishCategories from "app/public/furnishCategories/queries/getFurnishCategories"
import getExplores from "app/public/explores/queries/getExplores"

import ShowMoreButton, { showMoreButtonProps } from "app/components/ShowMoreButton"
import OptmizationImage from "app/components/OptmizationImage"
import useScreenSize from "app/hooks/useScreenSize"
import LazyLoad from "react-lazyload"

const ServicesForm = dynamic(() => import("app/components/Forms/ServicesForm"))
const Contact = dynamic(() => import("app/components/Forms/Contact"))
const FurnishCategoryCard = dynamic(() => import("app/components/FurnishCategoryCard"))
const OfferCard = dynamic(() => import("app/components/Cards/OfferCard"))
const ExploreCard = dynamic(() => import("app/components/ExploreCard"))
const ExploreToggleButton = dynamic(() => import("app/components/Buttons/ExploreToggleButton"))
const MostViewd = dynamic(() => import("app/components/Cards/MostViewd"))
const ProjectSlider = dynamic(() => import("app/components/Sliders/ProjectSlider"))

function HeadingWithMoreLink({ heading, href, sx }: showMoreButtonProps & { heading: string }) {
  return (
    <Flex sx={{ justifyContent: ["space-between", null, "flex-start"], alignItems: "center" }}>
      <Heading sx={{ fontSize: [4, 5, 5, 6], padding: 0, marginInlineEnd: 15 }}>{heading}</Heading>

      <ShowMoreButton href={href} sx={sx} />
    </Flex>
  )
}

type ProjectWitRooms = Project & { roomsWithPrices: RoomWithPrice[] }
export type CountryPropsType = {
  country: Country & {
    projects: ProjectWitRooms[]
    oprationCompanyPages: OprationCompanyPage[]
    cities: City[]
    offers: Offer[]
    explores: Explore[]
  }
  oceanViewProjects: ProjectWitRooms[]
  govProjects: ProjectWitRooms[]
  furnishCategories: Pick<FurnishCategory, "id" | "image" | "name">[]
  propertyTypes: PropertyType[]
}

type inpirationGallery = Explore["type"]

function CountryPage({
  country,
  propertyTypes,
  furnishCategories,
  oceanViewProjects,
  govProjects,
  ...props
}: CountryPropsType) {
  const isDesktopScreen = useScreenSize() > 720

  const { push, isFallback } = useRouter()
  const [showInspirationGallery, setShowInspirationGallery] = useState<inpirationGallery>(
    "dontMissitGallery"
  )

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (isFallback) {
    return <div>Loading...</div>
  }

  const asPath = `/countries/${country.id}`
  const handleFilter = (filter) => {
    push({ pathname: `${asPath}/projects`, query: filter })
  }

  const exploresArray = country?.explores.filter(
    (explore) => explore.type === showInspirationGallery
  )
  const explores: typeof exploresArray[] = []

  while (exploresArray.length) explores.push(exploresArray.splice(0, 3))

  const projectsUrl = `${asPath}/projects`
  const offersUrl = `${asPath}/offers`

  return (
    <Layout
      headerProps={{
        sx: { backgroundColor: "dark" },
      }}
      title={`مشاريع وعروض عقارات دولة ${country.name}`}
    >
      <Box
        sx={{
          paddingTop: 4,
          paddingBottom: 6,
          color: "white",
          backgroundColor: "dark",
        }}
      />
      <Wrapper
        sx={{
          marginTop: -100,
          overflow: "hidden",
        }}
      >
        {Array.isArray(country.carousel) ? (
          <Swiper
            autoHeight
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {country.carousel.map(({ image, url }: { image: string; url?: string }, index) => (
              <SwiperSlide key={index} virtualIndex={index}>
                <ThemeLink
                  target="blank"
                  rel="noopener noreferrer"
                  href={url}
                  sx={{
                    display: "block",
                    position: "relative",
                  }}
                >
                  <OptmizationImage
                    layout="responsive"
                    width={isDesktopScreen ? 210 : 160}
                    height={90}
                    objectFit="cover"
                    objectPosition="center"
                    // className="animate__animated animate__zoomIn"
                    alt="///"
                    src={image || ""}
                  />
                </ThemeLink>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </Wrapper>
      <Wrapper
        sx={{
          paddingX: [2, null, null, 6],
          marginTop: [-1, -5],
          position: "relative",
          zIndex: 1,
          marginBottom: 5,
        }}
      >
        <Filter {...country} propertyTypes={propertyTypes} onFilter={handleFilter} />
      </Wrapper>
      <Wrapper sx={{ mb: 5 }}>
        <HeadingWithMoreLink
          sx={{
            display: ["none", "none", "unset"],
          }}
          href={offersUrl}
          heading="جديدنا"
        />
        <Text>اكتشف احدث عروضنا الحصرية</Text>

        <Grid sx={{ mt: 5 }} columns={[1, 1, 2, 3]}>
          {country.offers.map((offer) => (
            <OfferCard key={offer.id} {...offer} prefixPath="/offers/" />
          ))}
        </Grid>
        <ShowMoreButton
          href={offersUrl}
          sx={{
            display: ["auto", "auto", "none"],
          }}
        />
      </Wrapper>
      <Wrapper>
        {country.isTurkey ? (
          <HeadingWithMoreLink
            sx={{
              display: ["none", "none", "unset"],
            }}
            href={projectsUrl}
            heading="مشاريع فاخرة"
          />
        ) : (
          <>
            <HeadingWithMoreLink
              sx={{
                display: ["none", "none", "unset"],
              }}
              href={projectsUrl}
              heading="مشاريعنا"
            />
            <Text sx={{ mb: 3 }}>منزلك الجديد بانتظارك</Text>
          </>
        )}
        <ProjectSlider projects={country.projects} />
        <ShowMoreButton
          href={projectsUrl}
          sx={{
            display: ["auto", "none"],
          }}
        />
      </Wrapper>

      {country.isTurkey && (
        <>
          <Wrapper>
            {govProjects.length > 0 && (
              <HeadingWithMoreLink
                sx={{
                  display: ["none", "none", "unset"],
                }}
                href={projectsUrl}
                heading="مشاريع بضمانة الحكومة"
              />
            )}
            <ProjectSlider projects={govProjects} />

            <ShowMoreButton
              href={projectsUrl}
              sx={{
                display: ["auto", "none"],
              }}
            />
          </Wrapper>
          <Wrapper sx={{}}>
            {oceanViewProjects.length > 0 && (
              <HeadingWithMoreLink
                sx={{
                  display: ["none", "none", "unset"],
                }}
                href={projectsUrl}
                heading="مشاريع باطلالة بحرية"
              />
            )}

            <ProjectSlider projects={oceanViewProjects} />

            <ShowMoreButton
              href={projectsUrl}
              sx={{
                display: ["auto", "none"],
              }}
            />
          </Wrapper>
        </>
      )}
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

      <Box
        sx={{
          backgroundColor: "light",
          paddingY: 350,
          marginTop: -250,
        }}
      >
        <Wrapper>
          <HeadingWithMoreLink href={projectsUrl} heading="الاكثر مشاهدة" />
          <Grid sx={{ paddingX: [1, 2, 4], marginTop: 5 }} columns={[1, 2, 3]}>
            {country.projects.map((project) => (
              <MostViewd key={project.id} project={project} />
            ))}
          </Grid>
          <ShowMoreButton
            href={projectsUrl}
            sx={{
              display: ["auto", "none"],
            }}
          />
        </Wrapper>
      </Box>

      <Wrapper sx={{ marginTop: -200, marginBottom: 100 }}>
        <Contact />
      </Wrapper>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { countries } = await getCountries({ select: {} })
  const paths = countries.map((c) => ({
    params: {
      countryId: `${c.id}`,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const countryId = parseInt(context.params.countryId)
  const country = await getCountry({ where: { id: countryId } })
  const { projects: mainProjects } = await getProjects({
    take: 3,
    orderBy: {
      id: "desc",
    },
    where: {
      countryId,
      isDelux: country.isTurkey,
    },
    include: {
      roomsWithPrices: true,
    },
  })
  let oceanViewProjects: any[] = []
  let govProjects: any[] = []

  if (country.isTurkey) {
    const { projects } = await getProjects({
      where: { isGrantedByGov: true },
      include: { roomsWithPrices: true },
      take: 3,
      orderBy: { id: "desc" },
    })
    const { projects: oceanViews } = await getProjects({
      where: {
        isWithSeaView: true,
      },
      include: { roomsWithPrices: true },
      take: 3,
      orderBy: { id: "desc" },
    })
    oceanViewProjects = oceanViews
    govProjects = projects
  }

  const { propertyTypes } = await getPropertyTypes({})
  const { furnishCategories } = await getFurnishCategories({
    select: { name: true, image: true, id: true },
  })
  const { explores: dontMissitGallery } = await getExplores({
    where: {
      type: "dontMissitGallery",
      countryId,
    },
    take: 9,
    orderBy: { id: "desc" },
  })
  const { explores: exploreGallery } = await getExplores({
    where: {
      type: "exploreGallery",
      countryId,
    },
    take: 9,
    orderBy: { id: "desc" },
  })
  const { explores: getInspiredGallery } = await getExplores({
    where: {
      type: "getInspiredGallery",
      countryId,
    },
    take: 9,
    orderBy: { id: "desc" },
  })

  return {
    props: {
      country: {
        ...country,
        projects: mainProjects,
        explores: [...dontMissitGallery, ...exploreGallery, ...getInspiredGallery],
      },
      furnishCategories,
      propertyTypes,
      oceanViewProjects,
      govProjects,
    },
    revalidate: 60 * 15,
  }
}

export default CountryPage
