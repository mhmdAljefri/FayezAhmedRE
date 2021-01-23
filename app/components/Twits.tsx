import React from "react"
import { Box, Flex, Heading, Link } from "theme-ui"
import { useQuery } from "react-query"
import Wrapper from "./Wrapper"
import SlickSlider from "./Sliders/SlickSlider"
import { Icon } from "react-icons-kit"
import { twitter } from "react-icons-kit/fa/twitter"
import { shareAlt } from "react-icons-kit/fa/shareAlt"
import { whatsapp } from "react-icons-kit/fa/whatsapp"
import { facebook } from "react-icons-kit/fa/facebook"
import { eye } from "react-icons-kit/fa/eye"
import { ArrowNext, ArrowPrev } from "./Arrows/SliderArrows"
import {
  facebookLinkGenerator,
  twitterLinkGenerator,
  whatsappPreFilledLinkGenerator,
} from "app/utils"

const fetcher = () => fetch("/api/twits").then((res) => res.json())
export default function Twits() {
  const { data } = useQuery("/api/twits", fetcher)
  const twits = data?.data || []

  return (
    <Wrapper>
      <Heading sx={{ pt: 5, pb: 4, fontSize: [4, 5, 6] }}>
        <Icon icon={twitter} size={32} style={{ marginInlineEnd: 15, color: "#1da1f2" }} />
        <span>اخر الاخبار</span>
      </Heading>
      <SlickSlider
        arrows
        infinite
        dots={false}
        slidesToShow={3}
        slidesToScroll={1}
        nextArrow={<ArrowNext />}
        prevArrow={<ArrowPrev />}
        responsive={[
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              rtl: true,
            },
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              rtl: true,
            },
          },
          {
            breakpoint: 900,
            settings: {
              centerMode: false,
              vertical: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              rtl: true,
            },
          },
        ]}
      >
        {twits.map(({ text, id }) => {
          const twitUrl = `https://twitter.com/ProjectsQatar/status/${id}`
          // generating socail links
          const shareWhatssapp = whatsappPreFilledLinkGenerator(`${text} - ${twitUrl}`)
          const shareFacebook = facebookLinkGenerator(twitUrl, text)
          const shareTwitter = twitterLinkGenerator(twitUrl, text)

          // modify twitter text
          const textArray: string[] = text.split(" ")
          const textWithoutLinkArray = textArray.map((word) => {
            if (word.startsWith("http")) return false
            if (word.startsWith("#"))
              return (
                <Box as="span" sx={{ color: "primary" }}>
                  {word}{" "}
                </Box>
              )
            if (word.startsWith("@"))
              return (
                <Link
                  target="_blank"
                  rel="noopener"
                  href={`https://twitter.com/${word.replace(":", "")}`}
                  sx={{ color: "primary" }}
                >
                  {word}{" "}
                </Link>
              )
            return word + " "
          })
          return (
            <Box key={id}>
              <Link sx={{ marginInlineEnd: 15, textDecoration: "none" }} href={twitUrl}>
                <Heading sx={{ mt: 4, fontSize: [1, 1, 2], color: "text", textAlign: "center" }}>
                  {textWithoutLinkArray}
                </Heading>
              </Link>
              <Flex
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 2,
                  a: {
                    textDecoration: "none",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "lightGray",
                    color: "lightGray",

                    width: 35,
                    height: 35,
                    lineHeight: "36px",
                    textAlign: "center",
                    borderRadius: 99,
                    ":hover": {
                      color: "primary",
                      borderColor: "primary",
                    },
                  },
                }}
              >
                <Link
                  target="_blank"
                  rel="noopener"
                  title="مشاهدة التغريدة"
                  sx={{ marginInlineEnd: 15 }}
                  href={twitUrl}
                >
                  <Icon icon={eye} />
                </Link>
                <Flex
                  sx={{
                    alignItems: "center",

                    paddingInlineStart: 13,
                    borderRadius: 99,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "lightGray",
                    a: {
                      border: "none",
                    },
                  }}
                >
                  <Icon icon={shareAlt} />
                  <Link target="_blank" rel="noopener" title="مشاركة التغريدة" href={shareFacebook}>
                    <Icon icon={facebook} />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener"
                    title="مشاركة التغريدة"
                    href={shareWhatssapp}
                  >
                    <Icon icon={whatsapp} />
                  </Link>
                  <Link target="_blank" rel="noopener" title="مشاركة التغريدة" href={shareTwitter}>
                    <Icon icon={twitter} />
                  </Link>
                </Flex>
              </Flex>
            </Box>
          )
        })}
      </SlickSlider>
    </Wrapper>
  )
}
