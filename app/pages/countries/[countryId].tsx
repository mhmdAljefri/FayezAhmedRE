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
  country: { name: string; cities: CityCreateInput[]; rooms: string[] }
  carousels: []
}

export default function Country({ carousels, country }: CountryPropsType) {
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
          <Carousel nextArrow prevArrow>
            {[...Array(3)].map(() => (
              <Box>
                <Box
                  sx={{ borderRadius: "lg", margin: 4, overflow: "hidden", boxShadow: "default" }}
                >
                  <Image src="/istanbul.jpg" alt="..." />
                </Box>
                <Text>text</Text>
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
        <Grid columns={3}>
          {[...Array(3)].map(() => (
            <Box sx={{ borderRadius: "lg", margin: 4, overflow: "hidden", boxShadow: "default" }}>
              <Image src="/istanbul.jpg" alt="..." />
              <Text sx={{ paddingY: 4, paddingX: 3 }}>Category</Text>
            </Box>
          ))}
        </Grid>
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
          zIndex: 0,
          position: "relative",
        }}
      >
        <Wrapper>
          <HeadingWithMoreLink href="/" heading="الاكثر مشاهدة" />
          <Grid columns={3}>
            <Box sx={{ borderRadius: "lg", margin: 4, overflow: "hidden", boxShadow: "default" }}>
              <Image src="/istanbul.jpg" alt="..." />
              <Text sx={{ paddingTop: 2, paddingX: 3 }}>Category</Text>
              <Text sx={{ paddingY: 2, paddingX: 3 }}>Category</Text>
            </Box>
            <Box sx={{ borderRadius: "lg", margin: 4, overflow: "hidden", boxShadow: "default" }}>
              <Image src="/istanbul.jpg" alt="..." />
              <Text sx={{ paddingTop: 2, paddingX: 3 }}>Category</Text>
              <Text sx={{ paddingY: 2, paddingX: 3 }}>Category</Text>
            </Box>
            <Box sx={{ borderRadius: "lg", margin: 4, overflow: "hidden", boxShadow: "default" }}>
              <Image src="/istanbul.jpg" alt="..." />
              <Text sx={{ paddingTop: 2, paddingX: 3 }}>Category</Text>
              <Text sx={{ paddingY: 2, paddingX: 3 }}>Category</Text>
            </Box>
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

  const { carousels } = await getCarousels({})

  return {
    props: { country, carousels }, // will be passed to the page component as props
  }
}
