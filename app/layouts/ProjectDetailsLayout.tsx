// TODO move components to components folder
import Wrapper from "app/components/Wrapper"
import React, { useState } from "react"
import { Box, Button, Flex, Grid, Heading, Text } from "theme-ui"
import { arrows_remove } from "react-icons-kit/linea/arrows_remove"
import Icon from "react-icons-kit"
import ArrowIcon from "app/components/ArrowIcon"
import Drawer from "app/components/Drawer"
import { SwiperSlide, Swiper } from "app/components/Sliders/Swiper"
import Image from "app/components/Image"
import { ArrowLeft, ArrowRight } from "app/components/Arrows/ProjectDetailsArrows"

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
          boxShadow: isYoutube ? undefined : "card",
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

export function GalleryView({ gallery }) {
  return (
    <>
      <Box sx={{ marginTop: -5, paddingTop: 6, paddingBottom: 5, backgroundColor: "dark" }}>
        <Wrapper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Heading sx={{ color: "white", marginBottom: 1, fontSize: [5, null, 6] }}>المعرض</Heading>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              width: 150,
              pb: 4,
              justifyContent: ["space-between", null, "flex-start"],
            }}
          >
            <ArrowRight className="GalleryArrowRight" />
            <ArrowLeft className="GalleryArrowLeft" />
          </Box>
        </Wrapper>
      </Box>

      <Wrapper
        sx={{
          marginTop: -5,
          ".swiper-slide": {
            width: "auto",
            marginInlineEnd: 10,
          },
        }}
      >
        <Swiper
          lazy
          navigation={{
            nextEl: ".GalleryArrowRight",
            prevEl: ".GalleryArrowLeft",
          }}
          slidesPerView="auto"
        >
          {gallery.map((item, index) => (
            <SwiperSlide virtualIndex={index} key={item + "_" + index}>
              <Image
                key={item + "_" + index}
                sx={{
                  borderRadius: 15,
                  width: "auto",
                  height: [200, 200, 250, 300],
                  objectFit: "contain",
                }}
                src={item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
