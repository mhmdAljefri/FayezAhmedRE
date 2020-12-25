import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Box, Heading, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import getFeatures from "app/public/features/queries/getFeatures"
import OurServicesSection from "app/components/OurServicesSection"
import { Feature } from "@prisma/client"

type Props = {
  features: Feature[]
}
const ServicesPage: BlitzPage<Props> = ({ features }) => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 6, color: "primary" }}>خدماتنا</Heading>
        </Wrapper>
      </Box>
      <Wrapper sx={{ paddingY: 5 }}>
        <OurServicesSection data={features} />
      </Wrapper>
    </>
  )
}

ServicesPage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="الاستفسارات">
    {page}
  </Layout>
)

export default ServicesPage

export async function getStaticProps(context) {
  const { features } = await getFeatures({})

  return {
    props: { features }, // will be passed to the page component as props
    revalidate: 60 * 2,
  }
}
