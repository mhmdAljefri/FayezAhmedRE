import React from "react"
import Layout from "app/layouts/Layout"
import OfferssList from "app/layouts/OfferssList"
import getOffers from "app/public/offers/queries/getOffers"
import getCountries from "app/public/countries/queries/getCountries"
import getCountry from "app/public/countries/queries/getCountry"
import { InferGetStaticPropsType } from "blitz"

export async function getStaticPaths() {
  const { countries } = await getCountries({})
  const paths = countries.map((country) => ({
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
  const { offers } = await getOffers({
    where: { countryId: countryId },
  })
  const country = await getCountry({ where: { id: countryId } })

  return {
    props: {
      country,
      offers,
    },
    revalidate: 60 * 15,
  }
}

export type OffersPageProps = InferGetStaticPropsType<typeof getStaticProps>
function WhatsNew({ offers, country }: OffersPageProps) {
  return (
    <OfferssList
      offers={offers}
      country={country}
      name="جديدنا"
      details="اكتشف أحدث عروضنا الحصرية"
    />
  )
}

WhatsNew.getLayout = (page) => (
  <Layout headerProps={{ sx: { backgroundColor: "dark" } }} title="جديدنا">
    {page}
  </Layout>
)

export default WhatsNew
