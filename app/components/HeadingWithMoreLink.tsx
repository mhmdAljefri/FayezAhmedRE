import React from "react"
import ShowMoreButton, { showMoreButtonProps } from "./ShowMoreButton"
import { Flex, Heading } from "theme-ui"

export default function HeadingWithMoreLink({
  heading,
  href,
  sx,
}: showMoreButtonProps & { heading: string }) {
  return (
    <Flex sx={{ justifyContent: ["space-between", null, "flex-start"], alignItems: "center" }}>
      <Heading sx={{ fontSize: [4, 5, 5, 6], padding: 0, marginInlineEnd: 15 }}>{heading}</Heading>

      {/* <ShowMoreButton href={href} sx={sx} /> */}
    </Flex>
  )
}
