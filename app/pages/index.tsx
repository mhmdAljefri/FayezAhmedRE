import { BlitzPage, Link, Image } from "blitz"
import Layout from "app/layouts/Layout"
import HomeSlider from "app/components/HomeSlider"
import CountriesSection, { CountryCardProps } from "app/components/CountriesSection"
import OurPartnersSection from "app/components/OurPartnersSection"
import getCountries from "app/public/countries/queries/getCountries"
import getPartners from "app/public/partners/queries/getPartners"
import { Carousel, City, Country, Partner, Project } from "@prisma/client"
import getCarousels from "app/public/carousels/queries/getCarousels"
import { Box, Flex, Grid, Heading, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import SlickSlider from "app/components/SlickSlider"
import getProjects from "app/public/projects/queries/getProjects"
import HTMLBox from "app/components/HTMLBox"
import CloudinaryImage from "app/components/CloudinaryImage"

type CountryWithCityAndCountry = Project & {
  city: City
  country: Country
}
type HomeProps = {
  countries: CountryCardProps[]
  carousels: Carousel[]
  partners: Partner[]
  projects: CountryWithCityAndCountry[]
}

const Home: BlitzPage<HomeProps> = ({ countries, projects, carousels, partners }) => {
  return (
    <main>
      <Box sx={{ position: "relative", maxHeight: "100vh", overflow: "hidden" }}>
        <HomeSlider slideStyle={{ height: "100vh" }} onlyImages data={carousels} />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingY: [100, 50],
          }}
        >
          <Wrapper>
            <Heading sx={{ fontSize: [5, 6], color: "primary" }}>الارتقاء بالحياة</Heading>
            <Heading sx={{ color: "white", textShadow: "1px 2px 5px #000" }}>
              يتلاقى مع اهتمامنا
            </Heading>
          </Wrapper>
        </Box>
      </Box>
      <CountriesSection data={countries} />
      <Box>
        <Wrapper
          sx={{
            ".slick-dots": {
              top: 180,
              alignItems: "flex-start",
              justifyContent: "flex-end",
            },
          }}
        >
          <Heading sx={{ marginY: 5, fontSize: [5, 6] }}>مجمعات بارزة</Heading>
          <SlickSlider autoplay infinite slidesToShow={1} slidesToScroll={1} responsive={[]}>
            {projects.map(
              ({
                id,
                country,
                city,
                name,
                housingComplexText,
                housingComplexImage,
                image,
                gallery,
                subTitle,
              }) => (
                <Box sx={{ direction: "rtl", overflow: "hidden" }}>
                  <Grid columns={2}>
                    <Box>
                      <Text
                        sx={{
                          fontSize: 4,
                          marginBottom: 3,
                          color: "heading",
                          fontWeight: 700,
                        }}
                      >
                        <span>{country.name}</span>, <span>{city.name}</span>
                      </Text>
                      <Flex sx={{ alignItems: "center" }}>
                        <Text>{housingComplexText}</Text>
                        {housingComplexImage && (
                          <Box sx={{ width: [50, 70], mx: 2 }}>
                            <CloudinaryImage
                              width={50}
                              height={70}
                              objectFit="contain"
                              src={housingComplexImage}
                              alt={housingComplexText || ""}
                              layout="responsive"
                            />
                          </Box>
                        )}
                      </Flex>
                    </Box>
                    <Box>
                      <Link href={`/countries/${country.id}/projects/${id}`}>
                        <Box
                          sx={{
                            cursor: "pointer",
                            marginRight: "auto",
                          }}
                        >
                          <CloudinaryImage
                            height={250}
                            width={250}
                            objectFit="contain"
                            src={image}
                            alt={name}
                            layout="responsive"
                          />
                        </Box>
                      </Link>
                      <Heading sx={{ paddingTop: 3, paddingBottom: 4 }} as="h3">
                        {name}
                      </Heading>
                    </Box>
                  </Grid>
                  <Box
                    sx={{
                      cursor: "pointer",
                      textAlign: "center",
                      height: 400,
                      maxWidth: 800,
                      mx: "auto",
                    }}
                  >
                    <CloudinaryImage src={gallery?.[0] || ""} alt={name} layout="fill" />
                  </Box>
                  <Box sx={{ pt: 3, textAlign: "center" }}>
                    <HTMLBox html={subTitle} />
                  </Box>
                </Box>
              )
            )}
          </SlickSlider>
        </Wrapper>
      </Box>
      <OurPartnersSection data={partners} />
    </main>
  )
}

export async function getStaticProps(context) {
  const { countries } = await getCountries({})
  const { partners } = await getPartners({})
  const { carousels } = await getCarousels({})
  const { projects } = await getProjects({
    select: {
      id: true,
      name: true,
      subTitle: true,
      image: true,
      gallery: true,
      housingComplexText: true,
      housingComplexImage: true,

      country: {
        select: {
          name: true,
          isTurkey: true,
          id: true,
        },
      },
      city: true,
    },
    where: {
      isHousingComplex: true,
    },
  })

  return {
    props: { countries, partners, projects, carousels }, // will be passed to the page component as props
    revalidate: 60 * 2,
  }
}

Home.getLayout = (page) => (
  <Layout headerProps={{ sx: { position: "fixed" } }} title="الرئيسية">
    {page}
  </Layout>
)

export default Home
