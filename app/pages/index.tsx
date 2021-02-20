import { BlitzPage } from "blitz"
import dynamic from "next/dynamic"
import Layout from "app/layouts/Layout"
import { SyncLoader } from "react-spinners"
import {
  Carousel,
  CarouselVideo,
  City,
  Country,
  Explore,
  Offer,
  Partner,
  Project,
  RoomWithPrice,
} from "@prisma/client"
import { Box, Grid, Heading, Flex } from "theme-ui"
import Wrapper from "app/components/Wrapper"

import getCountries from "app/public/countries/queries/getCountries"
import getCarousels from "app/public/carousels/queries/getCarousels"
import getProjects from "app/public/projects/queries/getProjects"
import getCarouselVideo from "app/public/carouselvideos/queries/getCarouselvideo"
import getOffers from "app/public/offers/queries/getOffers"
import getPartners from "app/public/partners/queries/getPartners"
import getExplores from "app/public/explores/queries/getExplores"
import SkeltonLoaderCard from "app/components/Cards/SkeltonLoaderCard"

const Contact = dynamic(() => import("app/components/Forms/Contact"), {
  ssr: false,
  loading: () => <SyncLoader />,
})
const ComplexProjects = dynamic(() => import("app/components/ComplexProjects"), {
  ssr: false,
  loading: () => <SyncLoader />,
})
const CountriesProjectsSection = dynamic(() => import("app/components/CountriesProjectsSection"), {
  ssr: false,
  loading: () => (
    <Flex>
      <SkeltonLoaderCard />
      <SkeltonLoaderCard />
      <SkeltonLoaderCard />
    </Flex>
  ),
})
const LatestOffersSection = dynamic(() => import("app/components/LatestOffersSection"), {
  ssr: false,
  loading: () => (
    <Flex>
      <SkeltonLoaderCard />
      <SkeltonLoaderCard />
      <SkeltonLoaderCard />
    </Flex>
  ),
})
const AboutUSSection = dynamic(() => import("app/components/AboutUSSection"), {
  ssr: false,
  loading: () => <SyncLoader />,
})
const IdealDestinations = dynamic(() => import("app/components/IdealDestinations"), {
  ssr: false,
  loading: () => <SyncLoader />,
})
const Twits = dynamic(() => import("app/components/Twits"), {
  ssr: false,
  loading: () => <SyncLoader />,
})
const MostViewd = dynamic(() => import("app/components/Cards/MostViewd"), {
  ssr: false,
  loading: () => <SyncLoader />,
})
const OurPartnersSection = dynamic(() => import("app/components/OurPartnersSection"), {
  ssr: false,
  loading: () => <SyncLoader />,
})

const HeroSection = dynamic(() => import("app/components/HeroSection"), {
  ssr: false,
  loading: () => <Box sx={{ height: "100vh" }} />,
})

type CountryWithCityAndCountry = Project & {
  city: City
  country: Country
}
type ProjectWithRooms = Project & {
  roomsWithPrices: RoomWithPrice[]
}
type CountryWithThierProjects = Country & { projects: ProjectWithRooms[] }
type HomeProps = {
  countries: CountryWithThierProjects[]
  carouselVideo: CarouselVideo
  offers: Offer[]
  carousels: Carousel[]
  partners: Partner[]
  projects: CountryWithCityAndCountry[]
  explores: Explore[]
  mostViewedProjects: Project[]
}

const Home: BlitzPage<HomeProps> = ({
  countries,
  offers,
  projects,
  carouselVideo,
  carousels,
  partners,
  explores,
  mostViewedProjects,
}) => {
  // todo migrate this logic to Server :(

  return (
    <main>
      <HeroSection carousels={carousels} carouselVideo={carouselVideo} />

      <AboutUSSection />

      <LatestOffersSection offers={offers} />

      <CountriesProjectsSection countries={countries} />

      <ComplexProjects projects={projects} />

      <IdealDestinations explores={explores} />

      <Twits />

      <Box sx={{ pt: 5, pb: 6, backgroundColor: "background" }}>
        <Wrapper>
          <Heading sx={{ fontSize: [5, 6] }}>الاكثر مشاهدة</Heading>

          <Grid sx={{ paddingX: [1, 2, 4], marginTop: 5 }} columns={[1, 2, 2, 4]}>
            {mostViewedProjects
              .sort((first, second) => (first.views > second.views ? 1 : -1))
              .map((project) => (
                <MostViewd key={project.id} project={project} />
              ))}
          </Grid>
        </Wrapper>
      </Box>

      <OurPartnersSection data={partners} />

      <Box
        sx={{
          pb: 100,
          backgroundColor: "background",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Contact />
      </Box>
    </main>
  )
}

export const config = { amp: "hybrid" }

export async function getStaticProps(context) {
  const { countries } = await getCountries({
    select: {
      projects: {
        orderBy: {
          id: "desc",
        },
        take: 3,
        include: {
          roomsWithPrices: true,
        },
      },
    },
  })
  const { partners } = await getPartners({})
  const { carousels } = await getCarousels({})
  const { offers } = await getOffers({})
  const carouselVideo = await getCarouselVideo({})
  const { explores } = await getExplores({
    orderBy: { id: "desc" },
    take: 9,
  })

  const { projects: qatarMostViewd } = await getProjects({
    where: {
      country: {
        isTurkey: false,
      },
    },
    take: 2,
    orderBy: {
      views: "desc",
    },
  })
  const { projects: turkeyMostViewd } = await getProjects({
    where: {
      country: {
        isTurkey: true,
      },
    },
    take: 2,
    orderBy: {
      views: "desc",
    },
  })

  const mostViewedProjects = [...qatarMostViewd, ...turkeyMostViewd]

  const { projects } = await getProjects({
    include: {
      country: {
        select: {
          name: true,
          isTurkey: true,
          id: true,
        },
      },
      city: true,
    },

    take: 6,
    where: {
      isHousingComplex: true,
    },
  })

  return {
    props: {
      countries,
      explores,
      offers,
      mostViewedProjects,
      partners,
      projects,
      carousels,
      carouselVideo,
    }, // will be passed to the page component as props
  }
}

Home.getLayout = (page) => (
  <Layout headerProps={{ sx: { position: "fixed" } }} title="الرئيسية">
    {page}
  </Layout>
)

export default Home
