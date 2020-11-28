import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import HomeSlider from "app/components/HomeSlider"
import CountriesSection from "app/components/CountriesSection"
import OurServicesSection from "app/components/OurServicesSection"
import OurPartnersSection from "app/components/OurPartnersSection"

const Home: BlitzPage = () => {
  return (
    <>
      <HomeSlider />
      <CountriesSection />
      <OurServicesSection />
      <OurPartnersSection />
    </>
  )
}

Home.getLayout = (page) => <Layout title="الرئيسية">{page}</Layout>

export default Home
