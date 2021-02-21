import { getServerSideSitemap } from "next-sitemap"
import { GetServerSideProps } from "next"
import getProjects from "app/public/projects/queries/getProjects"
import getOffers from "app/public/offers/queries/getOffers"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { projects } = await getProjects({})
  const { offers } = await getOffers({ select: { id: true, countryId: true } })
  const baseUrl = "https://fayezahmed.com/" // TODO move this to .env file
  // const urls = await fetch('https//example.com/api')

  const fields = [
    ...projects.map(({ id, countryId }) => ({
      loc: `${baseUrl}/countries/${countryId}/projects/${id}`, // Absolute url
      lastmod: new Date().toISOString(),
    })),
    ...offers.map(({ id, countryId }: any) => ({
      loc: `${baseUrl}/countries/${countryId}/projects/${id}`, // Absolute url
      lastmod: new Date().toISOString(),
    })),
  ]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {}
