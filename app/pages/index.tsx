import { BlitzPage, Link } from "blitz"
import Layout from "app/layouts/Layout"
import HomeSlider from "app/components/HomeSlider"
import CountriesSection, { CountryCardProps } from "app/components/CountriesSection"
import OurPartnersSection from "app/components/OurPartnersSection"
import getCountries from "app/public/countries/queries/getCountries"
import getPartners from "app/public/partners/queries/getPartners"
import { Carousel, CarouselVideo, City, Country, Partner, Project } from "@prisma/client"
import getCarousels from "app/public/carousels/queries/getCarousels"
import { Box, Flex, Grid, Heading, Image, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import SlickSlider from "app/components/SlickSlider"
import getProjects from "app/public/projects/queries/getProjects"
import HTMLBox from "app/components/HTMLBox"
import getCarouselVideo from "app/public/carouselvideos/queries/getCarouselvideo"

type CountryWithCityAndCountry = Project & {
  city: City
  country: Country
}
type HomeProps = {
  countries: CountryCardProps[]
  carouselVideo: CarouselVideo
  carousels: Carousel[]
  partners: Partner[]
  projects: CountryWithCityAndCountry[]
}

const Home: BlitzPage<HomeProps> = ({
  countries,
  projects,
  carouselVideo,
  carousels,
  partners,
}) => {
  return (
    <main>
      <Box sx={{ position: "relative", maxHeight: "100vh", overflow: "hidden" }}>
        {carouselVideo ? ( // todo add video
          <Box
            sx={{
              position: "relative",
              ":after": {
                position: "absolute",
                content: '""',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,

                backgroundColor: "#000",
                opacity: 0.5,
              },
            }}
          >
            <video autoPlay loop width="100%" height="100%" controls={false}>
              <track kind="captions" />
              <source src={carouselVideo.videoUlr} type="video/mp4" />
              <source src={carouselVideo.videoUlr} type="video/ogg" />
              <source src={carouselVideo.videoUlr} type="video/webm" />
              <object data={carouselVideo.videoUlr}>
                <embed src={carouselVideo.videoUlr} />
              </object>
            </video>
          </Box>
        ) : (
          <HomeSlider slideStyle={{ height: "100vh" }} onlyImages data={carousels} />
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 1,
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
              top: 280,
              maxHeight: 30,

              alignItems: "flex-start",
              justifyContent: "flex-end",
              li: {
                width: [20, 30],
                height: [20, 30],
                "&button:before": {
                  width: [20, 30],
                  fontSize: [1, 2],
                  height: [20, 30],
                },
              },
            },
          }}
        >
          <Heading sx={{ marginY: 5, fontSize: [5, 6] }}>مجمعات بارزة</Heading>
          <SlickSlider
            autoplay
            arrows={false}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
            responsive={[]}
          >
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
                    <Box sx={{ height: 300 }}>
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
                          <Image
                            sx={{ width: [50, 70], mx: 2 }}
                            src={housingComplexImage}
                            alt={housingComplexText || ""}
                          />
                        )}
                      </Flex>
                    </Box>
                    <Box>
                      <Link passHref href={`/countries/${country.id}/projects/${id}`}>
                        <Box
                          as="a"
                          sx={{
                            cursor: "pointer",
                            marginRight: "auto",
                          }}
                        >
                          <Image
                            sx={{ objectFit: "cover", maxHeight: 280 }}
                            src={image}
                            alt={name}
                          />
                        </Box>
                      </Link>
                      <Link passHref href={`/countries/${country.id}/projects/${id}`}>
                        <a style={{ textDecoration: "none" }}>
                          <Heading sx={{ paddingTop: 3, paddingBottom: 4 }} as="h3">
                            {name}
                          </Heading>
                        </a>
                      </Link>
                    </Box>
                  </Grid>
                  <Box sx={{ cursor: "pointer", textAlign: "center", mx: "auto" }}>
                    <Link passHref href={`/countries/${country.id}/projects/${id}`}>
                      <a style={{ textDecoration: "none" }}>
                        <Image
                          sx={{
                            objectFit: "contain",
                            height: [200, 300, 400],
                            maxWidth: 600,
                            mx: "auto",
                          }}
                          src={gallery?.[0] || ""}
                          alt={name}
                        />
                      </a>
                    </Link>
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
  const carouselVideo = await getCarouselVideo({})
  const { projects } = await getProjects({
    include: {
      country: {
        select: {
          name: true,
          isTurkey: true,
          id: true,
        },
      },
      city: true,
    },
    take: 6,
    where: {
      isHousingComplex: true,
    },
  })

  return {
    props: { countries, partners, projects, carousels, carouselVideo }, // will be passed to the page component as props
    revalidate: 60 * 2,
  }
}

Home.getLayout = (page) => (
  <Layout headerProps={{ sx: { position: "fixed" } }} title="الرئيسية">
    {page}
  </Layout>
)

export default Home
