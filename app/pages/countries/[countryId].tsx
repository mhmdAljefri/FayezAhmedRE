import HomeSlider from "app/components/HomeSlider"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import Filter from "app/components/Forms/Filter"
import Carousel from "app/components/Slider"

import React, { useState } from "react"
import { Box, Flex, Grid, Heading, Image, Text, Link as ThemeLink } from "theme-ui"
import getCountry from "app/public/countries/queries/getCountry"
import { City, Country, Explore, Offer, OprationCompanyPage, PropertyType } from "@prisma/client"
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

function HeadingWithMoreLink({ heading, href }) {
  return (
    <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
      <Heading sx={{ fontSize: 6, padding: 0 }}>{heading}</Heading>

      <Link passHref href={href}>
        <ThemeLink
          sx={{
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
          <Flex sx={{ color: "primary", alignItems: "center" }}>
            <Text sx={{ color: "text" }}>المزيد</Text>
            <ArrowIcon sx={{ width: 20, marginInlineStart: 20 }} />
          </Flex>
        </ThemeLink>
      </Link>
    </Flex>
  )
}

export type CountryPropsType = {
  country: Country & {
    projects: {
      name: string
      image: string
      subTitle?: string
    }[]
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
      <Wrapper sx={{ marginTop: -50 }}>
        <HomeSlider
          data={country.oprationCompanyPages.map(({ image, title, id }) => ({
            title,
            image,
            path: `${asPath}/oprationCompanies/${id}`,
          }))}
          slideStyle={{
            borderRadius: "lg",
            overflow: "hidden",
          }}
        />
      </Wrapper>
      <Wrapper
        sx={{
          paddingX: [2, null, null, 6],
          marginTop: -5,
          position: "relative",
          zIndex: 222,
          marginBottom: 5,
        }}
      >
        <Filter {...country} propertyTypes={propertyTypes} onFilter={handleFilter} />
      </Wrapper>
      <Wrapper>
        <HeadingWithMoreLink href={offersUrl} heading="جديدنا" />

        <Grid sx={{ my: 5 }} columns={[1, null, 3]}>
          {country.offers.map((offer) => (
            <OfferCard {...offer} prefixPath="offers/" />
          ))}
        </Grid>
      </Wrapper>
      <Wrapper>
        <Heading sx={{ fontSize: 6 }}>مشاريعنا</Heading>
        <Grid columns={[1, null, 2]}>
          <Box>
            <Heading sx={{ fontSize: 6, padding: 4, maxWidth: 350 }}>إكتشف منزلك الجديد</Heading>
            <Heading sx={{ fontSize: 6, padding: 4, color: "text" }}>{country.name}</Heading>
          </Box>
          <Carousel autoplay nextArrow prevArrow>
            {country.projects.map((project, index) => (
              <Box sx={{ marginBottom: 4 }} key={project.name + index}>
                <Box
                  sx={{
                    borderRadius: "lg",
                    marginTop: 4,
                    overflow: "hidden",
                    maxWidth: 350,
                    maxHeight: 350,
                    marginInlineStart: "auto",
                    boxShadow: "default",
                  }}
                >
                  <Link passHref href={`${projectsUrl}/${project.name}`}>
                    <a>
                      <Image src={project.image} alt={project.name} />
                    </a>
                  </Link>
                  <Text sx={{ textAlign: "center" }}>{project.name}</Text>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Grid>
        <Box>
          <Image
            sx={{
              borderRadius: "lg",
              width: "100%",
              maxHeight: 500,
              objectFit: "cover",
              overflow: "hidden",
              boxShadow: "default",
            }}
            src="/istanbul.jpg"
            alt="..."
          />
          <Text sx={{ fontSize: 4, textAlign: "center" }}>شقة فاخرة بمناظر جذابة</Text>
        </Box>
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
              احصل على الإلهام
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
              لا تسنى
            </Box>
          </Flex>
        </Wrapper>
      </Box>
      <Wrapper sx={{ marginTop: -80, marginBottom: 5 }}>
        <Grid columns={3}>
          {explores.map(({ image, title }, index) => (
            <Slide key={index} bottom>
              <Link href={`${asPath}/explore/${title}`}>
                <Image
                  sx={{ borderRadius: "lg", overflow: "hidden", boxShadow: "default" }}
                  src={image}
                  alt="..."
                />
              </Link>
            </Slide>
          ))}
        </Grid>
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
        <ServicesForm />
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
          <Grid sx={{ paddingX: 4 }} columns={[1, 2, 3]}>
            {country.projects.map((project) => (
              <Box
                key={project.name}
                sx={{
                  minWidth: 200,
                  margin: 4,
                  borderRadius: "lg",
                  backgroundColor: "background",
                  overflow: "hidden",
                  boxShadow: "default",
                }}
              >
                <Image src={project.image} alt={project.name} />
                <Text sx={{ paddingTop: 2, paddingX: 3 }}>{project.name}</Text>
                <Text sx={{ paddingY: 2, paddingX: 3 }}>{project.subTitle}</Text>
              </Box>
            ))}
          </Grid>
        </Wrapper>
      </Box>

      <Wrapper sx={{ marginTop: -200, marginBottom: 100, position: "relative", zIndex: 1 }}>
        <Contact />
      </Wrapper>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const { countries } = await getCountries({})
//   const paths = countries.map((c) => ({
//     params: {
//       countryId: `${c.id}`,
//     },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

// export async function getStaticProps({ params }) {
//   // You can fetch external data here
//   return {
//     props: {
//       countryId: params.countryId,
//       updatedAt: Date.now(),
//     },
//     notFound: true,

//     revalidate: 10,
//   }
// }

export async function getServerSideProps(context) {
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
  }
}
