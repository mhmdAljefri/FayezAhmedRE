import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import HomeSlider from "app/components/HomeSlider"
import CountriesSection, { CountryCardProps } from "app/components/CountriesSection"
import OurServicesSection from "app/components/OurServicesSection"
import OurPartnersSection from "app/components/OurPartnersSection"
import getCountries from "app/public/countries/queries/getCountries"
import getFeatures from "app/public/features/queries/getFeatures"
import getPartners from "app/public/partners/queries/getPartners"
import { Carousel, Feature, Partner } from "@prisma/client"
import getCarousels from "app/public/carousels/queries/getCarousels"
import { Box, Heading } from "theme-ui"
import Wrapper from "app/components/Wrapper"

type HomeProps = {
  countries: CountryCardProps[]
  carousels: Carousel[]
  features: Feature[]
  partners: Partner[]
}

const Home: BlitzPage<HomeProps> = ({ countries, carousels, features, partners }) => {
  return (
    <>
      <Box sx={{ position: "relative", maxHeight: "100vh", overflow: "hidden" }}>
        <HomeSlider data={carousels} />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingY: 50,
            backgroundImage: "linear-gradient(0deg, #000000c7, transparent)",
          }}
        >
          <Wrapper>
            <Heading sx={{ fontSize: [5, 6], color: "primary", textShadow: "1px 2px 52px #000" }}>
              الارتقاء بالحياة
            </Heading>
            <Heading sx={{ color: "white", textShadow: "1px 2px 5px #000" }}>
              يتلاقى مع اهتمامنا
            </Heading>
          </Wrapper>
        </Box>
      </Box>
      <CountriesSection data={countries} />
      <OurServicesSection data={features} />
      <OurPartnersSection data={partners} />
    </>
  )
}

export async function getStaticProps(context) {
  const { countries } = await getCountries({})
  const { features } = await getFeatures({})
  const { partners } = await getPartners({})
  const { carousels } = await getCarousels({})

  return {
    props: { countries, features, partners, carousels }, // will be passed to the page component as props
    revalidate: 60 * 2,
  }
}

Home.getLayout = (page) => (
  <Layout headerProps={{ sx: { position: "fixed" } }} title="الرئيسية">
    {page}
  </Layout>
)

export default Home
