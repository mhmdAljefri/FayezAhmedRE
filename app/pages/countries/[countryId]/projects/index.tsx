import React from "react"
import Layout from "app/layouts/Layout"
import ProjectsList, { ProjectCardProps } from "app/layouts/ProjectsList"
import { BlitzPage, useRouter } from "blitz"
import getCountries from "app/public/countries/queries/getCountries"
import { City, Country } from "@prisma/client"
import getCountry from "app/public/countries/queries/getCountry"
import getProjects from "app/public/projects/queries/getProjects"

type Props = {
  country: Country & { cities: City[] }
  projects: ProjectCardProps[]
}
const Projects: BlitzPage<Props> = ({ country, projects }) => {
  const router = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <ProjectsList
      country={country}
      projects={projects}
      title="مشاريعنا"
      subTitle="اكتشف منزل أحلامك"
    />
  )
}

Projects.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="مشاريعنا">
    {page}
  </Layout>
)

export default Projects

export async function getStaticPaths() {
  const { countries } = await getCountries({})
  const paths = countries.map((country: Country) => ({
    params: {
      countryId: `${country.id}`,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const countryId = parseInt(context.params.countryId)
  const { projects } = await getProjects({
    where: { countryId: countryId },
    include: {
      roomsWithPrices: true,
    },
  })
  const country = await getCountry({ where: { id: countryId } })

  return {
    props: {
      country,
      projects,
    },
    revalidate: 60 * 2,
  }
}
