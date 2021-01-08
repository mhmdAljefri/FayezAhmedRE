import React from "react"
import Layout from "app/layouts/Layout"
import ProjectsList from "app/layouts/ProjectsList"
import { BlitzPage } from "blitz"
import getCountries from "app/public/countries/queries/getCountries"
import { City, Country } from "@prisma/client"
import getCountry from "app/public/countries/queries/getCountry"

type Props = {
  country: Country & { cities: City[] }
}
const Projects: BlitzPage<Props> = ({ country }) => {
  return <ProjectsList country={country} title="مشاريعنا" subTitle="اكتشف منزل أحلامك" />
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
  const country = await getCountry({ where: { id: countryId } })

  return {
    props: {
      country,
    },
    revalidate: 60 * 2,
  }
}
