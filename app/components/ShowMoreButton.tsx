import { Link } from "blitz"
import React from "react"
import { SxStyleProp, Link as ThemeLink, Flex, Text } from "theme-ui"
import ArrowIcon from "./ArrowIcon"

export type showMoreButtonProps = {
  sx?: SxStyleProp
  href: string
}
export default function ShowMoreButton({ sx, href }: showMoreButtonProps) {
  return (
    <Link passHref href={href}>
      <ThemeLink
        sx={{
          ...sx,
          paddingX: 3,
          paddingY: 2,
          textDecoration: "none",
          ":hover": {
            backgroundColor: "light",
            borderRadius: "lg",
            boxShadow: "default",
          },
        }}
      >
        <Flex sx={{ color: "primary", alignItems: "center", justifyContent: "center" }}>
          <Text sx={{ color: "text" }}>المزيد</Text>
          <ArrowIcon sx={{ width: 20, marginInlineStart: 20 }} />
        </Flex>
      </ThemeLink>
    </Link>
  )
}
