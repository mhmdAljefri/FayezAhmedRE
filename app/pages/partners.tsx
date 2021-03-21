import { BlitzPage, InferGetStaticPropsType } from "blitz"
import Layout from "app/layouts/Layout"
import { Box, Heading } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import getPartners from "app/public/partners/queries/getPartners"
import OurPartnersSection from "app/components/OurPartnersSection"

export async function getStaticProps(context) {
  const { partners } = await getPartners({})

  return {
    props: { partners }, // will be passed to the page component as props
    revalidate: 60 * 30,
  }
}

const PartenersPage: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ partners }) => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 6, color: "primary" }}>شركاء النجاح</Heading>
        </Wrapper>
      </Box>
      <Wrapper>
        <OurPartnersSection data={partners} />
      </Wrapper>
    </>
  )
}

PartenersPage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="شركاء النجاح">
    {page}
  </Layout>
)

export default PartenersPage
