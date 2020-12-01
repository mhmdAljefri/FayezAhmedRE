import React from "react"
import Wrapper from "app/components/Wrapper"
import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
import { Box, Grid, Heading, Image, Text } from "theme-ui"
import Icon, { IconProp } from "react-icons-kit"
import { building } from "react-icons-kit/fa/building"
import { money } from "react-icons-kit/fa/money"
import { dollar } from "react-icons-kit/fa/dollar"
import { ic_format_paint } from "react-icons-kit/md/ic_format_paint"

interface ProjectCardIconsTextProps extends IconProp {
  width?: number
  text: string
}

interface ProjectCardProps {
  image?: string
  title: string
  location: string
  description: string
  price: number
}

function ProjectCardIconsText({ icon, text, width }: ProjectCardIconsTextProps) {
  return (
    <Box sx={{ marginBottom: 3, fontSize: 1, width, color: "lightText", whiteSpace: "nowrap" }}>
      <Icon icon={icon} />
      <span style={{ whiteSpace: "nowrap" }}>{text}</span>
    </Box>
  )
}
function ProjectCard({ image, title, price, description, location }: ProjectCardProps) {
  return (
    <Box
      sx={{
        width: ["90vw", null, 370],
        backgroundColor: "white",
        marginX: "auto",
        boxShadow: "default",
        marginBottom: 2,
      }}
    >
      <Box sx={{}}>
        <Image sx={{ height: 240, width: "100%", objectFit: "cover" }} src={image} />
      </Box>
      <Box sx={{ paddingY: 3, paddingX: 2 }}>
        <Heading>{title}</Heading>
        <Text>{location}</Text>
        <Text>{description}</Text>
      </Box>
      <Grid sx={{ paddingX: 2 }} columns={4}>
        <ProjectCardIconsText text={"جاهز"} icon={ic_format_paint} />
        <ProjectCardIconsText text={"4 غرف"} icon={building} />
        <ProjectCardIconsText text={"كاش"} icon={money} />
        <ProjectCardIconsText text={`تبدا من ${price}`} icon={dollar} />
      </Grid>
    </Box>
  )
}

const Projects: BlitzPage = () => {
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
        <Grid sx={{ marginBottom: 5, justifyContent: "center" }} columns={[1, null, 2, 3]}>
          <ProjectCard
            price={1000}
            title="العنوان"
            description="الوصف"
            location="العنوان"
            image="/slide2.png"
          />
          <ProjectCard
            price={1000}
            title="العنوان"
            description="الوصف"
            location="العنوان"
            image="/slide2.png"
          />
          <ProjectCard
            price={1000}
            title="العنوان"
            description="الوصف"
            location="العنوان"
            image="/slide2.png"
          />
        </Grid>
      </Wrapper>
    </div>
  )
}

Projects.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="الرئيسية">
    {page}
  </Layout>
)

export default Projects