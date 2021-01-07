import { useEffect } from "react"
import usePriceType from "app/hooks/usePriceType"
import HomeSlider from "app/components/HomeSlider"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import Filter from "app/components/Forms/Filter"

import React, { useState } from "react"
import { Box, Flex, Grid, Heading, Text, Link as ThemeLink, SxStyleProp } from "theme-ui"
import getCountry from "app/public/countries/queries/getCountry"
import {
  City,
  Country,
  Explore,
  Offer,
  OprationCompanyPage,
  Project,
  PropertyType,
  RoomWithPrice,
} from "@prisma/client"
import { Link, useRouter } from "blitz"
import ServicesForm from "app/components/Forms/ServicesForm"
import getFurnishCategories from "app/public/furnishCategories/queries/getFurnishCategories"
import SlickSlider from "app/components/SlickSlider"
import Contact from "app/components/Forms/Contact"
import Slide from "react-reveal/Slide"
import FurnishCategoryCard from "app/components/FurnishCategoryCard"
import ArrowIcon from "app/components/ArrowIcon"
import { OfferCard } from "app/layouts/OfferssList"
import getPropertyTypes from "app/public/propertyTypes/queries/getPropertyTypes"
import getCountries from "app/public/countries/queries/getCountries"
import getProjects from "app/public/projects/queries/getProjects"
import { ProjectCard } from "app/layouts/ProjectsList"
import ExploreCard from "app/components/ExploreCard"
import getExplores from "app/public/explores/queries/getExplores"

type showMoreButton = {
  sx?: SxStyleProp
  href: string
}
function ShowMoreButton({ sx, href }: showMoreButton) {
  return (
    <Link passHref href={href}>
      <ThemeLink
        sx={{
          ...sx,
          paddingX: 3,
          paddingY: 2,
          textDecoration: "none",
          ":hover": {
            backgroundColor: "light",
            borderRadius: "lg",
            boxShadow: "default",
          },
        }}
      >
        <Flex sx={{ color: "primary", alignItems: "center", justifyContent: "center" }}>
          <Text sx={{ color: "text" }}>المزيد</Text>
          <ArrowIcon sx={{ width: 20, marginInlineStart: 20 }} />
        </Flex>
      </ThemeLink>
    </Link>
  )
}

function HeadingWithMoreLink({ heading, href, sx }: showMoreButton & { heading: string }) {
  return (
    <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
      <Heading sx={{ fontSize: [5, 6], padding: 0 }}>{heading}</Heading>

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
  furnishCategories: { name: string; image: string }[]
  propertyTypes: PropertyType[]
}

type inpirationGallery = Explore["type"]

export default function CountryPage({
  country,
  propertyTypes,
  furnishCategories,
  oceanViewProjects,
  govProjects,
  ...props
}: CountryPropsType) {
  const { push, asPath } = useRouter()
  const { changePriceType } = usePriceType()

  useEffect(() => {
    if (country.isTurkey) {
      changePriceType("priceTurkey")
    }
  }, [country.isTurkey, changePriceType])

  const handleFilter = (filter) => {
    push({ pathname: `${asPath}/projects`, query: filter })
  }

  const [showInspirationGallery, setShowInspirationGallery] = useState<inpirationGallery>(
    "dontMissitGallery"
  )
  const explores = country.explores.filter(
    (explore: Explore) => explore.type === showInspirationGallery
  )

  const projectsUrl = `${asPath}/projects`
  const offersUrl = `${asPath}/offers`

  return (
    <Layout
      headerProps={{
        sx: { backgroundColor: "dark" },
      }}
      title="الدولة"
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
          borderRadius: "lg",
          overflow: "hidden",
          maxHeight: [300, null, 600],
        }}
      >
        <HomeSlider
          data={country.carouselImages.map((image) => ({ image, opacity: 0 }))}
          slideStyle={{ maxHeight: [300, "100%"] }}
        />
      </Wrapper>
      <Wrapper
        sx={{
          paddingX: [2, null, null, 6],
          marginTop: [-3, -5],
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
            <OfferCard {...offer} prefixPath="offers/" />
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
          <Heading sx={{ fontSize: [5, 6] }}>مشاريع مميزة</Heading>
        ) : (
          <>
            <Heading sx={{ fontSize: [5, 6] }}>مشاريعنا</Heading>
            <Text sx={{ mb: 3 }}>منزلك الجديد بانتظارك</Text>
          </>
        )}
        <SlickSlider
          infinite={false}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                rtl: true,
              },
            },
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                rtl: true,
              },
            },
            {
              breakpoint: 900,
              settings: {
                centerMode: false,
                vertical: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                rtl: true,
              },
            },
          ]}
        >
          {[...country.projects].map((project, index) => (
            <Box sx={{ marginBottom: 4, direction: "rtl" }} key={project.name + index}>
              <ProjectCard {...project} roomWithPrices={project.roomsWithPrices} />
            </Box>
          ))}
        </SlickSlider>
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
              <Heading sx={{ fontSize: [5, 6] }}>مشاريع بضمانة الحكومة</Heading>
            )}
            <SlickSlider
              infinite={false}
              slidesToShow={3}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    rtl: true,
                  },
                },
                {
                  breakpoint: 1100,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    rtl: true,
                  },
                },
                {
                  breakpoint: 900,
                  settings: {
                    centerMode: false,
                    vertical: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rtl: true,
                  },
                },
              ]}
            >
              {[...govProjects].map((project, index) => (
                <Box sx={{ marginBottom: 4, direction: "rtl" }} key={project.name + index}>
                  <ProjectCard {...project} roomWithPrices={project.roomsWithPrices} />
                </Box>
              ))}
            </SlickSlider>
            <ShowMoreButton
              href={projectsUrl}
              sx={{
                display: ["auto", "none"],
              }}
            />
          </Wrapper>
          <Wrapper sx={{}}>
            {oceanViewProjects.length > 0 && (
              <Heading sx={{ fontSize: [5, 6] }}>مشاريع باطلالة بحرية</Heading>
            )}
            <SlickSlider
              infinite={false}
              slidesToShow={3}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    rtl: true,
                  },
                },
                {
                  breakpoint: 1100,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    rtl: true,
                  },
                },
                {
                  breakpoint: 900,
                  settings: {
                    centerMode: false,
                    vertical: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rtl: true,
                  },
                },
              ]}
            >
              {[...oceanViewProjects].map((project, index) => (
                <Box sx={{ marginBottom: 4, direction: "rtl" }} key={project.name + index}>
                  <ProjectCard {...project} roomWithPrices={project.roomsWithPrices} />
                </Box>
              ))}
            </SlickSlider>
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
            <Box
              onClick={() => setShowInspirationGallery("exploreGallery")}
              sx={{
                paddingY: 2,
                width: 200,
                textAlign: "center",
                backgroundColor: showInspirationGallery === "exploreGallery" ? "primary" : "dark",
                borderRadius: "md",
              }}
            >
              إستكشف
            </Box>
            <Box
              onClick={() => setShowInspirationGallery("getInspiredGallery")}
              sx={{
                paddingY: 2,
                width: 200,
                textAlign: "center",
                backgroundColor:
                  showInspirationGallery === "getInspiredGallery" ? "primary" : "dark",
                borderRadius: "md",
              }}
            >
              استمد الإلهام
            </Box>
            <Box
              onClick={() => setShowInspirationGallery("dontMissitGallery")}
              sx={{
                paddingY: 2,
                width: 200,
                textAlign: "center",
                backgroundColor:
                  showInspirationGallery === "dontMissitGallery" ? "primary" : "dark",
                borderRadius: "md",
              }}
            >
              لا يفوتك
            </Box>
          </Flex>
        </Wrapper>
      </Box>
      <Wrapper sx={{ marginTop: -80, marginBottom: 5 }}>
        <SlickSlider
          slidesToScroll={-1}
          arrows
          slidesToShow={explores.length > 3 ? 3 : explores.length}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: explores.length > 3,
              },
            },
            {
              breakpoint: 840,
              settings: {
                infinite: explores.length > 3,
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 1,
              },
            },
            {
              breakpoint: 580,
              settings: {
                vertical: true,
                infinite: explores.length > 3,
                slidesToShow: 3,
                slidesToScroll: -3,
              },
            },
          ]}
        >
          {explores.map(({ image, title, id }, index) => (
            <Slide key={id} bottom>
              <ExploreCard href={`${asPath}/explore/${id}`} image={image} title={title} />
            </Slide>
          ))}
        </SlickSlider>
      </Wrapper>

      <Slide right>
        <Wrapper sx={{ paddingY: 5 }}>
          <HeadingWithMoreLink href="/furniture" heading="اثث منزلك" />
          <SlickSlider>
            {furnishCategories.map((furnishCategory) => (
              <FurnishCategoryCard {...furnishCategory} />
            ))}
          </SlickSlider>
        </Wrapper>
      </Slide>

      <Wrapper
        sx={{
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
              <Grid
                columns={3}
                sx={{
                  border: "1px solid #eee",
                  borderColor: "primary",
                  borderRadius: "sm",
                  // flexWrap: ["nowrap", "wrap"],
                  flexDirection: ["row", "column"],
                  backgroundColor: "background",
                }}
                key={project.name}
              >
                <Link passHref href={`/countries/${project.countryId}/projects/${project.id}`}>
                  <a>
                    <Box
                      sx={{
                        overflow: "hidden",
                        maxWidth: ["auto"],
                        height: "100%",
                        backgroundPosition: "center",
                        backgroundImage: `url(${project.image || undefined})`,
                        backgroundSize: "cover",
                      }}
                    ></Box>
                  </a>
                </Link>
                <Box sx={{ gridColumn: "span 2", p: [2, 3], flex: 1 }}>
                  <Link passHref href={`/countries/${project.countryId}/projects/${project.id}`}>
                    <a style={{ textDecoration: "none" }}>
                      <Heading sx={{ fontSize: 2, color: "primary" }}>{project.name}</Heading>
                    </a>
                  </Link>{" "}
                  <Link passHref href={`/countries/${project.countryId}/projects/${project.id}`}>
                    <a style={{ textDecoration: "none" }}>
                      <Text sx={{ fontSize: [0, 1], color: "primary" }}>{project.subTitle}</Text>
                    </a>
                  </Link>
                  <Text as="small">{project.views} مشاهدة</Text>
                </Box>
              </Grid>
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

      <Wrapper sx={{ marginTop: -200, marginBottom: 100, position: "relative", zIndex: 1 }}>
        <Contact />
      </Wrapper>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { countries } = await getCountries({})
  const paths = countries.map((c) => ({
    params: {
      countryId: `${c.id}`,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const countryId = parseInt(context.params.countryId)
  const country = await getCountry({ where: { id: countryId } })
  let oceanViewProjects: any[] = []
  let govProjects: any[] = []

  if (country.isTurkey) {
    const { projects } = await getProjects({
      where: { isGrantedByGov: true },
      include: { roomsWithPrices: true },
      take: 3,
    })
    const { projects: oceanViews } = await getProjects({
      where: {
        isWithSeaView: true,
      },
      include: { roomsWithPrices: true },
      take: 3,
    })
    oceanViewProjects = oceanViews
    govProjects = projects
  }

  const { propertyTypes } = await getPropertyTypes({})
  const { furnishCategories } = await getFurnishCategories({ select: { name: true, image: true } })
  const { explores: dontMissitGallery } = await getExplores({
    where: {
      type: "dontMissitGallery",
      countryId,
    },
  })
  const { explores: exploreGallery } = await getExplores({
    where: {
      type: "exploreGallery",
      countryId,
    },
  })
  const { explores: getInspiredGallery } = await getExplores({
    where: {
      type: "getInspiredGallery",
      countryId,
    },
  })

  return {
    props: {
      country: {
        ...country,
        explores: [...dontMissitGallery, ...exploreGallery, ...getInspiredGallery],
      },
      furnishCategories,
      propertyTypes,
      oceanViewProjects,
      govProjects,
    },
    revalidate: 60 * 2,
  }
}
