import React from "react"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link } from "blitz"
import { Box, Grid, Heading, Image, Text, Link as ThemeLink } from "theme-ui"
import Icon from "react-icons-kit"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"

type WhatsNewCardProps = {
  image?: string
  title: string
  description: string
}

function WhatsNewCard({ image, title, description }: WhatsNewCardProps) {
  return (
    <Box
      sx={{
        width: 300,
        marginX: ["auto", null, 0],
        backgroundColor: "white",
        boxShadow: "default",
        marginBottom: 2,
      }}
    >
      <Image sx={{ height: 240, width: "100%", objectFit: "cover" }} src={image} />
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          backgroundColor: "dark",
          paddingY: 2,
          marginTop: -2,
        }}
      >
        العرض الحالي
      </Box>

      <Box sx={{ paddingY: 3, paddingX: 2 }}>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
      </Box>
      <Link href="/">
        <ThemeLink
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingY: 2,
            paddingX: 2,
            borderTop: "3px solid #eee",
            borderColor: "muted",
            cursor: "pointer",
            fontSize: 1,
            ":hover": {
              boxShadow: "0px -5px 10px #eee",
            },
          }}
        >
          <Text sx={{ color: "text" }}>اعرف المزيد</Text>

          <Icon icon={arrowLeft} />
        </ThemeLink>
      </Link>
    </Box>
  )
}

const WhatsNew: BlitzPage = () => {
  return (
    <div>
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 5,
          color: "white",
          backgroundColor: "dark",
          marginBottom: 4,
        }}
      >
        <Wrapper>
          <Heading as="h1" sx={{ fontSize: 7, color: "white" }}>
            مشاريعنا
          </Heading>
          <Text>استكشف منزل احلامك</Text>
        </Wrapper>
      </Box>
      <Wrapper>
        <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 3]}>
          <WhatsNewCard title="العنوان" description="الوصف" image="/slide1.png" />
          <WhatsNewCard title="العنوان" description="الوصف" image="/slide1.png" />
          <WhatsNewCard title="العنوان" description="الوصف" image="/slide1.png" />
        </Grid>
      </Wrapper>
    </div>
  )
}

WhatsNew.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="الرئيسية">
    {page}
  </Layout>
)

export default WhatsNew
