import React from "react"
import { Box, Flex, Link as ThemeLink, SxStyleProp } from "theme-ui"
import { Link } from "blitz"
import UserDropdwon from "../NavItems/UserDropdwon"

type NavProps = {
  scrolled: boolean
}

const DesktopNav = ({ scrolled }: NavProps) => {
  const NavItem = ({ sx, to, text }: { to: string; text: string; sx?: SxStyleProp }) => {
    return (
      <Link passHref href={to}>
        <ThemeLink
          sx={{
            ...sx,
            mx: 2,
            textDecoration: "none",
            fontWeight: 700,
            marginInlineEnd: [null, null, 10, null, 20],
            wordBreak: "keep-all",
            whiteSpace: "nowrap",
            color: scrolled ? "heading" : "white",
            fontSize: [1, 1, 1, 1],
            ":hover": {
              color: "primary",
            },
          }}
        >
          {text}
        </ThemeLink>
      </Link>
    )
  }

  return (
    <Box>
      <Flex
        sx={{
          alignItems: "center",
          minWidth: 50,
          position: "relative",
          zIndex: 999999,
          minHeight: 35,
        }}
      >
        <NavItem to="/countries/2/projects" text="المشاريع" />
        <NavItem to="/countries/2/offers" text="العروض" />
        <NavItem to="/services" text="خدماتنا" />
        <NavItem to="/about-us" text="لماذا فايز احمد" />
        <NavItem to="/partners/" text="شركاء النجاح" />
        <UserDropdwon
          sx={{
            color: scrolled ? "heading" : "white",
            fontSize: [1, 1, 1, 1],
            ":hover": {
              color: "primary",
            },
          }}
        />
      </Flex>
    </Box>
  )
}

export default DesktopNav
