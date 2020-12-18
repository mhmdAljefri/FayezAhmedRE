import BigIconText from "app/components/BigIconBox"
// import SelectionBox from "app/components/SelectionBox"
import Wrapper from "app/components/Wrapper"
import React, { useState } from "react"
import { Box, Button, Flex, Grid, Heading, Image, Link as ThemeLink, Text } from "theme-ui"
import Layout from "./Layout"

import { buildingO } from "react-icons-kit/fa/buildingO"
import { dollar } from "react-icons-kit/fa/dollar"
import { minusSquare } from "react-icons-kit/fa/minusSquare"
import { mapMarker } from "react-icons-kit/fa/mapMarker"
import { key } from "react-icons-kit/fa/key"
import { checkSquare } from "react-icons-kit/fa/checkSquare"
import Contact from "app/components/Forms/Contact"
import SlickSlider from "app/components/SlickSlider"
import usePriceType from "app/hooks/usePriceType"
import { Link } from "blitz"
import ArrowIcon from "app/components/ArrowIcon"
import Drawer from "app/components/Drawer"
import GoogleMap from "app/components/GoogleMap"

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
  constructingUpdateVideo,
}: {
  constructingUpdateVideo?: string | null
  constructingUpdatePrview?: string | null
}) {
  if (!constructingUpdateVideo) return <div />
  const isYoutube = constructingUpdateVideo.startsWith("https://www.youtube")
  return (
    <Wrapper sx={{ marginY: 5 }}>
      <Heading sx={{ marginBottom: 4, fontSize: [5, null, 6] }}>حالة المشروع</Heading>
      <Box
        sx={{
          marginX: [1, null, 6],
          borderRadius: "default",
          boxShadow: "card",
          height: [250, 300, 350, 450],
        }}
      >
        {isYoutube ? (
          <iframe width="100%" height="100%" title="any" src={constructingUpdateVideo}></iframe>
        ) : (
          <video
            width="100%"
            height="100%"
            poster={constructingUpdatePrview || "any"}
            // poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            controls
          >
            <track kind="captions" />
            <source src={constructingUpdateVideo} type="video/mp4" />
            <source src={constructingUpdateVideo} type="video/ogg" />
            <source src={constructingUpdateVideo} type="video/webm" />
            <object data={constructingUpdateVideo}>
              <embed src={constructingUpdateVideo} />
            </object>
          </video>
        )}
      </Box>
    </Wrapper>
  )
}

export function GalleryView({ gallery }) {
  return (
    <>
      <Box sx={{ paddingY: 6, backgroundColor: "dark" }}>
        <Wrapper>
          <Heading sx={{ color: "white", fontSize: [5, null, 6] }}>المعرض</Heading>
        </Wrapper>
      </Box>

      <Wrapper sx={{ marginTop: -5 }}>
        <SlickSlider sx={{ justifyContent: "center", overflow: "auto" }}>
          {gallery.map((item, index) => (
            <Image
              key={item + "_" + index}
              sx={{
                width: "30%",
                maxWidth: 350,
                minWidth: 280,
                borderRadius: 15,
                margin: 3,
                boxShadow: "default",
                height: "30vw",
                maxHeight: 350,
              }}
              src={item}
            />
          ))}
        </SlickSlider>
      </Wrapper>
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
      <Drawer onClose={() => setOpen(false)} open={open}>
        <Box sx={{ width: ["90vw", 400, 500], minHeight: "100vh", backgroundColor: "dark" }}>
          <Box>
            <Text sx={{ paddingTop: 5, fontWeight: 700, color: "white", fontSize: 4 }}>
              خطة السداد
            </Text>

            <Grid columns={2}>
              {installmentPlan.map(({ instalment, milestone }, index) => (
                <React.Fragment key={index}>
                  <Box sx={{ fontWeight: 700, fontSize: 3, color: "white" }}>{instalment}</Box>
                  <Box sx={{ fontWeight: 700, fontSize: 3, color: "white" }}>{milestone}</Box>
                </React.Fragment>
              ))}
            </Grid>
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
        <Heading sx={{ fontSize: 6, marginBottom: 4, marginTop: 5 }}>
          تفاصيل الشركات المقاولة
        </Heading>
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
  country,
  features,
  constructingUpdateVideo,
  constructingUpdatePrview,
  nearBy,
  installmentPlan,
  oprationCompanies,
  roomsWithPrices,
  location,
  complationDate,
}) {
  const isCompleted = status === "completed"
  const statusText = isCompleted ? "مكتمل" : "قيد البناء"
  const date = new Intl.DateTimeFormat("en-US").format(complationDate)
  const room = 0
  const { priceType, priceTypeSuffix } = usePriceType()

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
          <Image sx={{ borderRadius: 15, marginTop: -6, width: "100%" }} src={image} />
          <Heading sx={{ fontSize: 6, marginY: 3 }}>{name}</Heading>
          <Text sx={{ fontSize: 4 }}>{subTitle}</Text>

          <Flex sx={{ marginBottom: 2, marginTop: 4 }}>
            {/* {roomsWithPrices.map((item, index) => (
              <Button onClick={() => setRoom(index)} variant="link">
                {item.room}
              </Button>
            ))} */}
          </Flex>
          <Flex>
            <Box sx={{ marginInlineEnd: 30, width: 250 }}>
              <Text
                sx={{
                  fontSize: 5,
                  color: "primary",
                  borderBottom: "2px solid #eee",
                  borderColor: "primary",
                }}
              >
                {priceTypeSuffix}
              </Text>
              <Text sx={{ paddingY: 3, fontSize: 3 }}>
                السعر يبداء من <span>{roomWithPrice?.[priceType]}</span>
              </Text>
            </Box>
            <Box sx={{ marginInlineEnd: 30, width: 250 }}>
              <Text
                sx={{
                  fontSize: 5,
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
          <Text sx={{ marginY: 5 }} dangerouslySetInnerHTML={{ __html: details }} />

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
              <BigIconText icon={buildingO} text="شقق وفلل" />
              <BigIconText icon={dollar} text="كاش" />
              <BigIconText icon={mapMarker} text={country.name} />
              <BigIconText icon={key} text={`${date}`} />
              <BigIconText icon={isCompleted ? checkSquare : minusSquare} text={statusText} />
            </Grid>
          </Box>
        </Wrapper>
        <GalleryView gallery={gallery} />
        <ConstractiongVideo
          constructingUpdatePrview={constructingUpdatePrview}
          constructingUpdateVideo={constructingUpdateVideo}
        />
        <Wrapper sx={{ marginY: 6 }}>
          <Heading sx={{ paddingBottom: 5, fontSize: [5, null, 6] }}>المخططات</Heading>
          <SlickSlider
            slidesToShow={3}
            slidesToScroll={3}
            sx={{ justifyContent: "center", marginY: 3 }}
          >
            {floorplan.map((item, index) => (
              <div>
                <Image
                  key={item + "_" + index}
                  sx={{
                    borderColor: "primary",
                    objectFit: "cover",
                    marginX: 2,
                    width: ["90vw", 350],
                    minWidth: ["90vw", 300],
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderRadius: 15,
                    boxShadow: "default",
                    height: [300, 350],
                  }}
                  src={item}
                />
              </div>
            ))}
          </SlickSlider>
        </Wrapper>
        <Box sx={{ backgroundColor: "light", paddingY: 5 }}>
          <Wrapper>
            <Box>
              <Heading sx={{ fontSize: [5, null, 6] }}>وسائل الراحة والمزايا</Heading>
              <Text sx={{ fontSize: 3, marginBottom: 5 }}>عالم من الراحة الجمال في التصميم</Text>
            </Box>

            <SlickSlider
              slidesToShow={3}
              slidesToScroll={3}
              sx={{ justifyContent: "center", marginY: 3 }}
            >
              {features.map((feat) => (
                <Text
                  sx={{
                    margin: 2,
                    backgroundColor: "primary",
                    textAlign: "center",
                    fontWeight: 700,
                    paddingX: 3,
                    paddingY: 5,
                    fontSize: 5,
                    color: "white",
                    boxShadow: "default",
                    width: 250,
                    borderRadius: "default",
                  }}
                >
                  {feat}
                </Text>
              ))}
            </SlickSlider>
            <ThemeLink
              download={name}
              target="_blank"
              rel="noopener "
              href={brochure}
              sx={{
                variant: "links.outline",
                opacity: brochure ? 1 : 0.3,
                maxWidth: 250,
                marginX: "auto",
                marginY: 5,
                textAlign: "center",
              }}
            >
              تنزيل البروشور
            </ThemeLink>
          </Wrapper>

          <Wrapper>
            <Heading>بالجوار</Heading>
            <SlickSlider slidesToShow={1} slidesToScroll={1} responsive={[]} centerMode>
              {nearBy?.map((item) => (
                <Box sx={{ textAlign: "center" }}>
                  <Image
                    sx={{
                      marginX: "auto",
                      width: [200, 300, 350],
                      height: [200, 300, 350],
                      borderRadius: 350,
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
        </Box>

        <ContructionCompaniesDetails {...oprationCompanies} />
        <Wrapper>
          <GoogleMap center={location || undefined} />
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
