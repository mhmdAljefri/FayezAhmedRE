import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Box, Heading } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import EnquireForm from "app/components/Forms/Enquire"

const EnquirePage: BlitzPage = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 6, color: "primary" }}>استفسر الان</Heading>
        </Wrapper>
      </Box>
      <Wrapper sx={{ paddingBottom: 5 }}>
        <EnquireForm />
      </Wrapper>
    </>
  )
}

EnquirePage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="الاستفسارات">
    {page}
  </Layout>
)

export default EnquirePage
