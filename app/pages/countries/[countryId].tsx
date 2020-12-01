import HomeSlider from "app/components/HomeSlider"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import Filter from "app/components/Forms/Filter"
import Carousel from "app/components/Slider"

import React from "react"
import { Box, Flex, Grid, Heading, Image, Text } from "theme-ui"
import { Icon } from "react-icons-kit"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"
import getCountry from "app/public/countries/queries/getCountry"
import { CityCreateInput } from "@prisma/client"
import { Link } from "blitz"
import ServicesForm from "app/components/Forms/ServicesForm"
import Contact from "app/components/Forms/Contact"
import getCarousels from "app/public/carousels/queries/getCarousels"
import getFurnishCategories from "app/public/furnishCategories/queries/getFurnishCategories"
import SlickSlider from "app/components/SlickSlider"

function HeadingWithMoreLink({ heading, href }) {
  return (
    <Flex sx={{ justifyContent: "space-between" }}>
      <Heading sx={{ fontSize: 6 }}>{heading}</Heading>

      <Link href={href}>
        <Flex sx={{ color: "primary" }}>
          <Text sx={{ color: "text" }}>المزيد</Text>
          <Icon style={{ marginRight: 15 }} icon={arrowLeft} />
        </Flex>
      </Link>
    </Flex>
  )
}
type CountryPropsType = {
  country: {
    name: string
    cities: CityCreateInput[]
    rooms: string[]
    id: number
    projects: {
      name: string
      image: string
      subTitle?: string
    }[]
  }
  furnishCategories: { name: string; image: string }[]
  carousels: []
}

export default function Country({ carousels, country, furnishCategories }: CountryPropsType) {
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
          data={carousels}
          onlyImages
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
        <Filter {...country} />
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
                    boxShadow: "default",
                  }}
                >
                  <Link passHref href={`/countries/${country.id}/projects/${project.name}`}>
                    <a>
                      <Image src={project.image} alt={project.name} />
                    </a>
                  </Link>
                </Box>
                <Text sx={{ textAlign: "center" }}>{project.name}</Text>
              </Box>
            ))}
          </Carousel>
        </Grid>
        <Box>
          <Image
            sx={{ borderRadius: "lg", overflow: "hidden", boxShadow: "default" }}
            src="/istanbul.jpg"
            alt="..."
          />
          <Text sx={{ fontSize: 4, textAlign: "center" }}>شقة فاخرة بمناظر جذابة</Text>
        </Box>
      </Wrapper>
      <Box sx={{ backgroundColor: "dark", paddingTop: 350, marginTop: -200, paddingBottom: 100 }}>
        <Wrapper>
          <Flex sx={{ justifyContent: "space-evenly" }}>
            <Box
              sx={{
                paddingY: 2,
                width: 200,
                textAlign: "center",
                backgroundColor: "primary",
                borderRadius: "md",
              }}
            >
              إستكشف
            </Box>
            <Box
              sx={{
                paddingY: 2,
                width: 200,
                textAlign: "center",
                backgroundColor: "primary",
                borderRadius: "md",
              }}
            >
              احصل على الإلهام
            </Box>
            <Box
              sx={{
                paddingY: 2,
                width: 200,
                textAlign: "center",
                backgroundColor: "primary",
                borderRadius: "md",
              }}
            >
              لا تسنى
            </Box>
          </Flex>
        </Wrapper>
      </Box>
      <Wrapper sx={{ marginTop: -80 }}>
        <Grid columns={3}>
          {[...Array(9)].map(() => (
            <Image
              sx={{ borderRadius: "lg", overflow: "hidden", boxShadow: "default" }}
              src="/istanbul.jpg"
              alt="..."
            />
          ))}
        </Grid>
      </Wrapper>

      <Wrapper sx={{ paddingY: 5 }}>
        <HeadingWithMoreLink href="/" heading="اثث منزلك" />
        <SlickSlider>
          {furnishCategories.map((furnishCategory) => (
            <Box
              key={furnishCategory.name}
              sx={{
                borderRadius: "lg",
                overflow: "hidden",
                boxShadow: "default",
              }}
            >
              <Image src={furnishCategory.image} alt={furnishCategory.name} />
              <Text sx={{ paddingY: 4, paddingX: 3 }}>{furnishCategory.name}</Text>
            </Box>
          ))}
        </SlickSlider>
      </Wrapper>

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
          <HeadingWithMoreLink href="/" heading="الاكثر مشاهدة" />
        </Wrapper>
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
  const { furnishCategories } = await getFurnishCategories({ select: { name: true, image: true } })
  const { carousels } = await getCarousels({})

  return {
    props: { country, carousels, furnishCategories }, // will be passed to the page component as props
  }
}
