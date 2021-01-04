import React from "react"
import Layout from "app/layouts/Layout"
import getExplores from "app/public/explores/queries/getExplores"
import { Grid } from "theme-ui"
import ExploreCard from "app/components/ExploreCard"
import { Explore } from "@prisma/client"
import getCountries from "app/public/countries/queries/getCountries"
import Wrapper from "app/components/Wrapper"

type Props = {
  explores: Explore[]
}
function ExploresPage({ explores }: Props) {
  return (
    <Wrapper sx={{ py: 5 }}>
      <Grid columns={[1, 2, 3]}>
        {explores.map(({ image, title, id, countryId }, index) => (
          <ExploreCard
            key={id}
            href={`countries/${countryId}/explore/${id}`}
            image={image}
            title={title}
          />
        ))}
      </Grid>
    </Wrapper>
  )
}

ExploresPage.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="جديدنا">
    {page}
  </Layout>
)

export async function getStaticPaths() {
  const { countries } = await getCountries({})
  const paths = countries.map((c) => ({
    params: {
      countryId: `${c.id}`,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const countryId = parseInt(context.params.countryId)
  const { explores } = await getExplores({ where: { countryId: parseInt(`${countryId}`) } })

  return {
    props: {
      explores,
    },
    revalidate: 60 * 2,
  }
}

export default ExploresPage
