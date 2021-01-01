import { useEffect } from "react"
import usePriceType from "app/hooks/usePriceType"
import HomeSlider from "app/components/HomeSlider"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import Filter from "app/components/Forms/Filter"

import React, { useState } from "react"
import { Box, Flex, Grid, Heading, Image, Text, Link as ThemeLink, SxStyleProp } from "theme-ui"
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
import { ProjectCard } from "app/layouts/ProjectsList"
import { getPriceType } from "app/utils"

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
  furnishCategories: { name: string; image: string }[]
  propertyTypes: PropertyType[]
}

type inpirationGallery = Explore["type"]

export default function CountryPage({
  country,
  propertyTypes,
  furnishCategories,
  ...props
}: CountryPropsType) {
  const { push, asPath } = useRouter()
  const { changePriceType } = usePriceType()

  useEffect(() => {
    changePriceType(getPriceType(country))
  }, [changePriceType, country])

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
        <Heading sx={{ fontSize: 6 }}>مشاريعنا</Heading>
        <Text sx={{ mb: 3 }}>منزلك الجديد بانتظارك</Text>
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
          slidesToScroll={1}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              },
            },
            {
              breakpoint: 840,
              settings: {
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 1,
              },
            },
            {
              breakpoint: 580,
              settings: {
                centerMode: true,
                vertical: true,
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
        >
          {explores.map(({ image, title, id }, index) => (
            <Slide key={id} bottom>
              <Link href={`${asPath}/explore/${id}`}>
                <Box
                  sx={{
                    height: [200, "25vw", 250],
                    borderRadius: "lg",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "default",
                  }}
                >
                  <Image
                    sx={{ objectFit: "cover", width: "100%", minHeight: "100%" }}
                    src={image}
                    alt={title}
                  />
                  <Flex
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      textAlign: "center",
                      padding: 2,
                      backgroundColor: "primary",
                      color: "white",
                      fontSize: 3,
                      fontWeight: 700,
                      opacity: 0,
                      transition: "all 500ms linear",
                      ":hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    {title}
                  </Flex>
                </Box>
              </Link>
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
  const { propertyTypes } = await getPropertyTypes({})
  const { furnishCategories } = await getFurnishCategories({ select: { name: true, image: true } })

  return {
    props: {
      country,
      furnishCategories,
      propertyTypes,
    },
    revalidate: 60 * 2,
  }
}
