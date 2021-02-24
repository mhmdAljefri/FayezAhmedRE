import React, { useEffect } from "react"
import { BlitzPage, Link, useMutation, useRouter, dynamic } from "blitz"
import {
  PaymentPlan,
  ConstractiongVideo,
  ContructionCompaniesDetails,
} from "app/layouts/ProjectDetailsLayout"
import getProject from "app/public/projects/queries/getProject"
import getProjects from "app/public/projects/queries/getProjects"
import { City, Country, Project, PropertyType, RoomWithPrice } from "@prisma/client"
import updateProject from "app/public/projects/mutations/updateProject"
import { TURKEY_PROJECT_STATUS } from "app/constants"
import { format } from "date-fns"
import { arSA } from "date-fns/locale"
import usePriceType from "app/hooks/usePriceType"
import Layout from "app/layouts/Layout"
import { Box, Flex, Grid, Heading, Text, Link as ThemeLink } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import Image from "app/components/Image"
import { numberFormat } from "app/utils"
import HTMLBox from "app/components/HTMLBox"
import BigIconText from "app/components/BigIconBox"
import { Swiper, SwiperSlide } from "app/components/Sliders/Swiper"

// Icons
import { buildingO } from "react-icons-kit/fa/buildingO"
import { dollar } from "react-icons-kit/fa/dollar"
import { minusSquare } from "react-icons-kit/fa/minusSquare"
import { mapMarker } from "react-icons-kit/fa/mapMarker"
import { key } from "react-icons-kit/fa/key"
import { checkSquare } from "react-icons-kit/fa/checkSquare"
import { ArrowLeft, ArrowRight } from "app/components/Arrows/ProjectDetailsArrows"
import Skeleton from "react-loading-skeleton"
import LazyLoad from "react-lazyload"

const GalleryViewSlider = dynamic(() => import("app/components/Sliders/GalleryViewSlider"), {
  ssr: false,
  loading: () => <Skeleton height={250} />,
})

const GoogleMap = dynamic(() => import("app/components/GoogleMap"), {
  ssr: false,
  loading: () => <Skeleton height={250} />,
})
const Contact = dynamic(() => import("app/components/Forms/Contact"), {
  ssr: false,
  loading: () => <Skeleton height={250} />,
})

type ProjectProps = {
  project: Project & {
    city: City
    country: Country
    roomsWithPrices: RoomWithPrice[]
    propertyType: PropertyType
  }
}

const ProjectPage: BlitzPage<ProjectProps> = ({ project }) => {
  const [updateProjectMutation] = useMutation(updateProject)
  const router = useRouter()
  const { priceType, priceTypeSuffix } = usePriceType()

  useEffect(() => {
    if (project) updateProjectMutation({ where: { id: project.id } })
  }, [project, updateProjectMutation])
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const {
    name,
    details,
    subTitle,
    status,
    image,
    gallery,
    floorplan,
    brochure,
    city,
    features,
    constructingUpdateVideo,
    constructingUpdatePrview,
    mainVideo,
    mainVideoPreview,
    nearBy,
    installmentPlan,
    oprationCompanies,
    roomsWithPrices,
    location,
    propertyType,
    complationDate,
    paymentType,
  } = project
  const isCompleted = status === "completed"
  const statusText = TURKEY_PROJECT_STATUS.find(({ id }) => id === status)?.name
  const date = format(complationDate || new Date(), "MMM/yyyy", { locale: arSA })
  const room = 0
  const nearByItemsLength = (nearBy as any)?.length
  const roomWithPrice = roomsWithPrices[room]

  return (
    <Layout
      headerProps={{
        sx: {
          backgroundColor: "dark",
        },
      }}
    >
      <div>
        <Box
          sx={{
            paddingTop: 4,
            paddingBottom: 6,
            color: "white",
            backgroundColor: "dark",
          }}
        />
        <Wrapper>
          <Box
            sx={{
              marginTop: -6,
              borderRadius: 15,
              overflow: "hidden",
              textAlign: "center",
              position: "relative",

              ":after": {
                display: "block",
                content: '""',
                /* 16:9 aspect ratio */
                paddingBottom: "38.25%",
              },
            }}
          >
            <Image
              sx={{
                objectFit: "cover",
                objectPosition: "center",
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }}
              src={image || ""}
            />
          </Box>
          <Heading sx={{ fontSize: 6, marginY: 3 }}>{name}</Heading>
          <Text sx={{ fontSize: 4 }}>{subTitle}</Text>

          <Flex>
            <Box sx={{ marginInlineEnd: 30, width: 250 }}>
              <Text
                sx={{
                  fontSize: [4, 5],
                  color: "primary",
                  borderBottom: "2px solid #eee",
                  borderColor: "primary",
                }}
              >
                {priceTypeSuffix}
              </Text>
              <Text sx={{ paddingY: 3, fontSize: 3 }}>
                السعر يبداء من <span>{numberFormat(roomWithPrice?.[priceType])}</span>
              </Text>
            </Box>
            <Box sx={{ marginInlineEnd: 30, width: 250 }}>
              <Text
                sx={{
                  fontSize: [4, 5],
                  color: "primary",
                  borderBottom: "2px solid #eee",
                  borderColor: "primary",
                }}
              >
                <span>{statusText}</span>
              </Text>
              <Text sx={{ paddingY: 3, fontSize: 3 }}>حالة المشروع</Text>
            </Box>
          </Flex>
          <Box>
            <HTMLBox html={details} />
          </Box>

          <PaymentPlan installmentPlan={installmentPlan} />
          <Box
            sx={{
              maxWidth: 800,
              marginTop: 5,
              marginBottom: -5,
              marginX: "auto",
              borderRadius: 15,
              paddingX: 3,
              paddingBottom: 5,
              paddingTop: 2,
              backgroundColor: "primary",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Heading sx={{ fontSize: 6, color: "white", marginBottom: 4, marginTop: 3 }}>
              {name}
            </Heading>
            <Grid columns={5} sx={{ justifyContent: "space-evenly" }}>
              <BigIconText icon={buildingO} text={propertyType?.name} />
              <BigIconText icon={dollar} text={paymentType === "cash" ? "كاش" : "تقسيط"} />
              <BigIconText icon={mapMarker} text={city.name} />
              <BigIconText icon={key} text={`${date}`} />
              <BigIconText icon={isCompleted ? checkSquare : minusSquare} text={statusText} />
            </Grid>
          </Box>
        </Wrapper>
        <LazyLoad offset={200}>
          <GalleryViewSlider gallery={gallery} />
        </LazyLoad>
        <ConstractiongVideo
          heading="فيديو المشروع"
          constructingUpdatePrview={mainVideoPreview}
          constructingUpdateVideo={mainVideo}
        />
        {[...floorplan].length > 0 && (
          <Wrapper sx={{ marginY: 6 }}>
            <Flex
              sx={{ alignItems: "center", justifyContent: ["space-between", null, "flex-start"] }}
            >
              <Heading sx={{ fontSize: [5, null, 6] }}>المخططات</Heading>
              <Box
                sx={{
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  width: 150,
                  pb: 4,
                  justifyContent: "space-between",
                }}
              >
                <ArrowRight className="floorplanArrowRight" />
                <ArrowLeft className="floorplanArrowLeft" />
              </Box>
            </Flex>
            <Box
              sx={{
                ".swiper-slide": {
                  width: "auto !important",
                  marginInlineEnd: 10,
                },
              }}
            >
              <Swiper
                slidesPerView="auto"
                navigation={{
                  nextEl: ".floorplanArrowRight",
                  prevEl: ".floorplanArrowLeft",
                }}
              >
                {floorplan.map((item, index) => (
                  <SwiperSlide virtualIndex={index} key={item + "_" + index}>
                    <Image
                      imageMaxWidth={350}
                      sx={{
                        borderColor: "primary",
                        objectFit: "cover",
                        marginX: 2,
                        borderWidth: 2,
                        borderStyle: "solid",
                        borderRadius: 15,
                        boxShadow: "default",
                        height: [200, 250],
                      }}
                      src={item}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Wrapper>
        )}
        <Box sx={{ backgroundColor: "light", paddingY: 5 }}>
          {features?.length > 0 && (
            <Wrapper>
              <Box>
                <Heading sx={{ fontSize: [5, null, 6] }}>المزايا</Heading>
                <Text sx={{ fontSize: 3, marginBottom: 5 }}>دلل نفسك مع هذه الخيارات الرائعة</Text>
              </Box>

              <Swiper
                loop
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  1200: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    // infinite: features?.length > 4,
                  },
                  840: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    initialSlide: 1,
                    // infinite: features?.length > 4,
                  },
                  580: {
                    // centerMode: true,
                    // vertical: false,
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    // infinite: features?.length > 4,
                  },
                }}
                sx={{ justifyContent: "center", marginY: 3 }}
              >
                {features.map((feat, index) => (
                  <SwiperSlide virtualIndex={index} key={feat + "_" + index}>
                    <Flex
                      sx={{
                        paddingX: [2, 2, 3],
                        marginX: 2,
                        mb: 4,
                        backgroundColor: "primary",
                        height: 150,
                        color: "white",
                        boxShadow: "default",
                        borderRadius: "default",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        sx={{
                          fontWeight: 700,
                          fontSize: [2, 3, 3, 4],
                        }}
                      >
                        {feat}
                      </Text>
                    </Flex>
                  </SwiperSlide>
                ))}
              </Swiper>
              {brochure && (
                <ThemeLink
                  download={name}
                  target="_blank"
                  rel="noopener "
                  href={brochure}
                  sx={{
                    variant: "links.outline",
                    maxWidth: 250,
                    marginX: "auto",
                    marginY: 5,
                    textAlign: "center",
                  }}
                >
                  تنزيل البروشور
                </ThemeLink>
              )}
            </Wrapper>
          )}
          {nearByItemsLength > 0 && (
            <Wrapper>
              <Heading sx={{ paddingTop: 4, fontSize: [5, null, 6] }}>في الجوار</Heading>
              <Text sx={{ fontSize: 3, marginBottom: 5 }}>
                مناطق الجذب في المدينة على مقربة منك
              </Text>
              <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                loop
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  1000: {
                    slidesPerView: 5,
                    slidesPerGroup: 1,
                    // infinite: nearByItemsLength > 3,
                  },
                  800: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    // infinite: nearByItemsLength > 2,
                  },
                  500: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    // infinite: (nearBy as any)?.length > 2,
                  },
                }}
              >
                {(nearBy as any)?.map((item, index) => (
                  <SwiperSlide key={item.name + "_" + index} virtualIndex={index}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                      <Image
                        sx={{
                          marginX: "auto",
                          width: [180, 200],
                          height: [180, 200],
                          borderRadius: 999,
                          borderWidth: 2,
                          borderColor: "primary",
                          borderStyle: "solid",
                        }}
                        src={item.image}
                        alt={item.name}
                      />
                      <Heading sx={{ marginTop: 4, marginBottom: 3 }} as="h3">
                        {item.name}
                      </Heading>
                      <Text>{item.description}</Text>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Wrapper>
          )}
        </Box>

        <ConstractiongVideo
          heading="تحديثات البناء"
          constructingUpdatePrview={constructingUpdatePrview}
          constructingUpdateVideo={constructingUpdateVideo}
        />

        <ContructionCompaniesDetails {...(oprationCompanies as any)} />
        <Wrapper>
          {location && (
            <>
              <Heading sx={{ marginBottom: 5 }}>الموقع</Heading>
              <LazyLoad height={250} offset={100}>
                <GoogleMap zoom={18} center={location as any} />
              </LazyLoad>
            </>
          )}

          <LazyLoad height={250} offset={100}>
            <Contact />
          </LazyLoad>

          <Link href="/furniture">
            <ThemeLink
              sx={{ marginBottom: 5, maxWidth: 200, textAlign: "center", marginX: "auto" }}
              variant="outline"
            >
              اثث منزلك
            </ThemeLink>
          </Link>
        </Wrapper>
      </div>
    </Layout>
  )
}

export default ProjectPage

export async function getStaticPaths() {
  const { projects } = await getProjects({})
  const paths = projects.map((project: Project) => ({
    params: {
      countryId: `${project.countryId}`,
      projectId: `${project.id}`,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const projectId = parseInt(context.params.projectId)
  const project = await getProject({ where: { id: projectId } })

  return {
    props: { project }, // will be passed to the page component as props
    revalidate: 60 * 15,
  }
}
