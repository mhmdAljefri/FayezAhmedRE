import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import HomeSlider from "app/components/HomeSlider"
import CountriesSection from "app/components/CountriesSection"
import OurServicesSection from "app/components/OurServicesSection"
import OurPartnersSection from "app/components/OurPartnersSection"
import getCountries from "app/public/countries/queries/getCountries"
import getFeatures from "app/public/features/queries/getFeatures"
import getPartners from "app/public/partners/queries/getPartners"
import { CountryCreateInput, FeatureCreateInput, PartnerCreateInput } from "@prisma/client"

type HomeProps = {
  countries: Pick<CountryCreateInput, "name" | "image">[]
  features: Pick<FeatureCreateInput, "image" | "name">[]
  partners: Pick<PartnerCreateInput, "name" | "image">[]
}

const Home: BlitzPage<HomeProps> = ({ countries, features, partners }) => {
  return (
    <>
      <HomeSlider />
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

  return {
    props: { countries, features, partners }, // will be passed to the page component as props
  }
}

Home.getLayout = (page) => <Layout title="الرئيسية">{page}</Layout>

export default Home
