import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Box, Flex, Grid, Heading, Link, Text } from "theme-ui"
import Wrapper from "app/components/Wrapper"

const EnquirePage: BlitzPage = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "dark", paddingY: 5 }}>
        <Wrapper>
          <Heading sx={{ fontSize: 6, color: "primary" }}>استفسر الان</Heading>
        </Wrapper>
      </Box>
      <Wrapper>شيشيش</Wrapper>
    </>
  )
}

EnquirePage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="الاستفسارات">
    {page}
  </Layout>
)

export default EnquirePage
