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

type HomeProps = {
  countries: CountryCardProps[]
  carousels: Carousel[]
  features: Feature[]
  partners: Partner[]
}

const Home: BlitzPage<HomeProps> = ({ countries, carousels, features, partners }) => {
  return (
    <>
      <HomeSlider data={carousels} />
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
  }
}

Home.getLayout = (page) => <Layout title="الرئيسية">{page}</Layout>

export default Home
