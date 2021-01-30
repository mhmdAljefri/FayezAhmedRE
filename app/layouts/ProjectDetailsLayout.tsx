import BigIconText from "app/components/BigIconBox"
// import SelectionBox from "app/components/SelectionBox"
import Wrapper from "app/components/Wrapper"
import React, { useState } from "react"
import { Box, Button, Flex, Grid, Heading, Link as ThemeLink, Text } from "theme-ui"
import Layout from "./Layout"

import { buildingO } from "react-icons-kit/fa/buildingO"
import { dollar } from "react-icons-kit/fa/dollar"
import { minusSquare } from "react-icons-kit/fa/minusSquare"
import { mapMarker } from "react-icons-kit/fa/mapMarker"
import { key } from "react-icons-kit/fa/key"
import { arrows_remove } from "react-icons-kit/linea/arrows_remove"
import { checkSquare } from "react-icons-kit/fa/checkSquare"
import Contact from "app/components/Forms/Contact"
import SlickSlider from "app/components/Sliders/SlickSlider"
import usePriceType from "app/hooks/usePriceType"
import { Link } from "blitz"
import ArrowIcon from "app/components/ArrowIcon"
import Drawer from "app/components/Drawer"
import GoogleMap from "app/components/GoogleMap"
import { TURKEY_PROJECT_STATUS } from "app/constants"
import { City, Project, PropertyType, RoomWithPrice } from "@prisma/client"
import { format } from "date-fns"
import { arSA } from "date-fns/locale"
import Icon from "react-icons-kit"
import HTMLBox from "app/components/HTMLBox"
import { numberFormat } from "app/utils"
import Image from "app/components/Image"
import { ArrowNext, ArrowPrev } from "app/components/Arrows/SliderArrows"

type ConstractingCardProps = {
  label: string
  text?: string
}
function ConstractingCard({ label, text }: ConstractingCardProps) {
  if (!text) return <div />
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Heading
        as="h3"
        sx={{
          fontSize: 5,
          color: "primary",
          pb: 3,
          position: "relative",
          ":after": {
            content: '""',
            position: "absolute",
            display: "block",
            right: 0,
            width: "90%",
            maxWidth: 200,
            height: 2,
            backgroundColor: "primary",
          },
        }}
      >
        {text}
      </Heading>
      <Text sx={{ fontSize: 4 }}>{label}</Text>
    </Box>
  )
}

export function ConstractiongVideo({
  constructingUpdatePrview,
  heading,
  constructingUpdateVideo,
}: {
  heading?: string
  constructingUpdateVideo?: string | null
  constructingUpdatePrview?: string | null
}) {
  if (!constructingUpdateVideo) return <div />
  const constructingSecureUpdateVideo = constructingUpdateVideo.replace("http://", "https://")
  const isYoutube = constructingSecureUpdateVideo.startsWith("https://www.youtube")
  return (
    <Wrapper sx={{ marginY: 5 }}>
      {heading && <Heading sx={{ marginBottom: 4, fontSize: [5, null, 6] }}>{heading}</Heading>}
      <Box
        sx={{
          marginX: [1, null, 6],
          borderRadius: "default",
          boxShadow: "card",
          height: [250, 300, 350, 450],
        }}
      >
        {isYoutube ? (
          <iframe
            width="100%"
            height="100%"
            title="any"
            src={constructingSecureUpdateVideo}
          ></iframe>
        ) : (
          <video
            width="100%"
            height="100%"
            poster={constructingUpdatePrview || "any"}
            // poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            controls
          >
            <track kind="captions" />
            <source src={constructingSecureUpdateVideo} type="video/mp4" />
            <source src={constructingSecureUpdateVideo} type="video/ogg" />
            <source src={constructingSecureUpdateVideo} type="video/webm" />
            <object data={constructingSecureUpdateVideo}>
              <embed src={constructingSecureUpdateVideo} />
            </object>
          </video>
        )}
      </Box>
    </Wrapper>
  )
}

function SampleNextArrow(props) {
  return <ArrowNext {...props} />
}

function SamplePrevArrow(props) {
  return <ArrowPrev {...props} />
}

export function GalleryView({ gallery }) {
  return (
    <>
      <Box sx={{ marginTop: 5, paddingTop: 6, backgroundColor: "dark" }}>
        <Wrapper>
          <Heading sx={{ color: "white", paddingBottom: 5, fontSize: [5, null, 6] }}>
            المعرض
          </Heading>
        </Wrapper>
      </Box>

      <Box sx={{ marginTop: -5, direction: "ltr" }}>
        <SlickSlider
          prevArrow={<ArrowPrev />}
          nextArrow={<ArrowNext />}
          arrows
          slidesToShow={3}
          slidesToScroll={1}
          infinite={gallery?.length > 3}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: gallery?.length > 3,
                variableWidth: false,
              },
            },
            {
              breakpoint: 840,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: false,
                variableWidth: false,
              },
            },
            {
              breakpoint: 580,
              settings: {
                centerMode: true,
                vertical: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: gallery?.length > 3,
                variableWidth: false,
              },
            },
          ]}
          variableWidth
          centerMode={false}
          dots={false}
          rtl={false}
        >
          {gallery.map((item, index) => (
            <Box key={item + "_" + index} sx={{}}>
              <Image
                sx={{
                  borderRadius: 15,
                  width: "auto",
                  height: [200, 200, 250, 300],
                  objectFit: "contain",
                  marginX: 2,
                }}
                src={item}
              />
            </Box>
          ))}
        </SlickSlider>
      </Box>
    </>
  )
}

export function PaymentPlan({ installmentPlan }) {
  const [open, setOpen] = useState(false)

  if (!installmentPlan) return <div />
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="links.outline">
        <Flex sx={{ alignItems: "center" }}>
          <Text sx={{ width: 200 }}>خطة السداد</Text>
          <ArrowIcon />
        </Flex>
      </Button>
      <Drawer handler={false} onClose={() => setOpen(false)} open={open}>
        <Box sx={{ width: ["90vw", 400, 500], minHeight: "100vh", backgroundColor: "dark", px: 3 }}>
          <Box>
            <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Text sx={{ paddingY: 5, fontWeight: 700, color: "white", fontSize: 4 }}>
                خطة السداد
              </Text>
              <Icon
                size={36}
                style={{ color: "white" }}
                onClick={() => setOpen(false)}
                icon={arrows_remove}
              />
            </Flex>

            {installmentPlan.map(({ instalment, milestone }, index) => (
              <Grid key={index} columns={instalment && milestone ? 2 : 1}>
                {instalment && (
                  <Heading sx={{ border: "1px solid white", padding: 2, color: "white" }}>
                    {instalment}
                  </Heading>
                )}
                {milestone && (
                  <Heading sx={{ border: "1px solid white", padding: 2, color: "white" }}>
                    {milestone}
                  </Heading>
                )}
              </Grid>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export function ContructionCompaniesDetails({
  owner,
  contractor,
  developer,
  principalConsultant,
  design,
}) {
  return (
    <Box>
      <Wrapper>
        {contractor && (
          <Heading sx={{ fontSize: 6, marginBottom: 4, marginTop: 5 }}>
            تفاصيل الشركات المقاولة
          </Heading>
        )}
        <Grid sx={{ marginBottom: 5 }} columns={[1, 2]}>
          <ConstractingCard label="الشركة المالكة" text={owner} />
          <ConstractingCard label="شركة المقاولات" text={contractor} />
          <ConstractingCard label="شركة التطوير" text={developer} />
          <ConstractingCard label="شركة الاستشارة" text={principalConsultant} />
          <ConstractingCard label="شركة التصميم" text={design} />
        </Grid>
      </Wrapper>
    </Box>
  )
}
export default function ProjectDetailsLayout({
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
}: Project & {
  roomsWithPrices: RoomWithPrice[]
  propertyType: PropertyType
  city: City
}) {
  const isCompleted = status === "completed"
  const statusText = TURKEY_PROJECT_STATUS.find(({ id }) => id === status)?.name
  const date = format(complationDate || new Date(), "MMM/yyyy", { locale: arSA })
  const room = 0
  const { priceType, priceTypeSuffix } = usePriceType()
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
              height: ["auto", "auto", 600],
              maxHeight: ["90vh", "70vh", "70vh"],
            }}
          >
            <Image
              sx={{
                width: "100%",
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
        <GalleryView gallery={gallery} />
        <ConstractiongVideo
          heading="فيديو المشروع"
          constructingUpdatePrview={mainVideoPreview}
          constructingUpdateVideo={mainVideo}
        />
        {[...floorplan].length > 0 && (
          <Wrapper sx={{ marginY: 6 }}>
            <Heading sx={{ paddingBottom: 5, fontSize: [5, null, 6] }}>المخططات</Heading>
            <Box sx={{ direction: "ltr", marginTop: -5 }}>
              <SlickSlider
                rtl={false}
                arrows
                prevArrow={<SamplePrevArrow />}
                nextArrow={<SampleNextArrow />}
                responsive={[
                  {
                    breakpoint: 1020,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: -1,
                    },
                  },
                ]}
                variableWidth
                slidesToShow={1}
                slidesToScroll={-1}
                infinite={[...floorplan].length > 2}
              >
                {floorplan.map((item, index) => (
                  <div key={item + "_" + index}>
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
                  </div>
                ))}
              </SlickSlider>
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

              <SlickSlider
                slidesToShow={3}
                slidesToScroll={3}
                infinite={features?.length > 4}
                responsive={[
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: features?.length > 4,
                    },
                  },
                  {
                    breakpoint: 840,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 1,
                      infinite: features?.length > 4,
                    },
                  },
                  {
                    breakpoint: 580,
                    settings: {
                      centerMode: true,
                      vertical: false,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: features?.length > 4,
                    },
                  },
                ]}
                sx={{ justifyContent: "center", marginY: 3 }}
              >
                {features.map((feat, index) => (
                  <div key={feat + "_" + index}>
                    <Flex
                      sx={{
                        paddingX: [2, 2, 3],
                        margin: 2,
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
                  </div>
                ))}
              </SlickSlider>
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
              <SlickSlider
                slidesToShow={nearByItemsLength > 5 ? 5 : 3}
                infinite={nearByItemsLength > 2}
                slidesToScroll={1}
                centerMode={nearByItemsLength <= 2}
                responsive={[
                  {
                    breakpoint: 1000,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: nearByItemsLength > 3,
                    },
                  },
                  {
                    breakpoint: 800,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      infinite: nearByItemsLength > 2,
                    },
                  },
                  {
                    breakpoint: 500,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: (nearBy as any)?.length > 2,
                    },
                  },
                ]}
              >
                {(nearBy as any)?.map((item, index) => (
                  <Box key={item.name + "_" + index} sx={{ textAlign: "center" }}>
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
                ))}
              </SlickSlider>
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

              <GoogleMap center={location as any} />
            </>
          )}
          <Contact />

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
