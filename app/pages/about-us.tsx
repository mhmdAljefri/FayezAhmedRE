import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Box, Heading, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"

const AboutusPage: BlitzPage = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 6, color: "primary" }}>استفسر الان</Heading>
        </Wrapper>
      </Box>
      <Wrapper sx={{ paddingY: 5 }}>
        <Text>ss</Text>
      </Wrapper>
    </>
  )
}

AboutusPage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="الاستفسارات">
    {page}
  </Layout>
)

export default AboutusPage
