import React from "react"
import { Box, Link, Heading, Flex } from "theme-ui"
import { Icon } from "react-icons-kit"
import { shareAlt } from "react-icons-kit/fa/shareAlt"
import { whatsapp } from "react-icons-kit/fa/whatsapp"
import { twitter } from "react-icons-kit/fa/twitter"
import { facebook } from "react-icons-kit/fa/facebook"
import { eye } from "react-icons-kit/fa/eye"
import {
  facebookLinkGenerator,
  twitterLinkGenerator,
  whatsappPreFilledLinkGenerator,
} from "app/utils"

export default function TwitCard({ id, text }) {
  const twitUrl = `https://twitter.com/ProjectsQatar/status/${id}`
  // generating socail links
  const shareWhatssapp = whatsappPreFilledLinkGenerator(`${text} - ${twitUrl}`)
  const shareFacebook = facebookLinkGenerator(twitUrl, text)
  const shareTwitter = twitterLinkGenerator(twitUrl, text)

  // modify twitter text
  const textArray: string[] = text.split(" ")
  const textWithoutLinkArray = textArray.map((word, index) => {
    if (word.startsWith("http")) return false
    if (word.startsWith("#"))
      return (
        <Box key={index} as="span" sx={{ color: "primary" }}>
          {word}{" "}
        </Box>
      )
    if (word.startsWith("@"))
      return (
        <Link
          key={index}
          target="_blank"
          rel="noopener"
          href={`https://twitter.com/${word.replace(":", "")}`}
          sx={{ color: "primary" }}
        >
          {word}{" "}
        </Link>
      )
    return <span key={index}>{word + " "}</span>
  })
  return (
    <Box>
      <Link sx={{ marginInlineEnd: 15, textDecoration: "none" }} href={twitUrl}>
        <Heading sx={{ mt: 0, fontSize: [1, 1, 2], color: "text", textAlign: "center" }}>
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
          <Link target="_blank" rel="noopener" title="مشاركة التغريدة" href={shareWhatssapp}>
            <Icon icon={whatsapp} />
          </Link>
          <Link target="_blank" rel="noopener" title="مشاركة التغريدة" href={shareTwitter}>
            <Icon icon={twitter} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
