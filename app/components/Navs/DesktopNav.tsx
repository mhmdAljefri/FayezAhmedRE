import React from "react"
import { Box, Flex, Link as ThemeLink, SxStyleProp } from "theme-ui"
import { Link, useParam } from "blitz"
import CountriesItemsList from "app/components/NavItems/CountriesItemsList"

type NavProps = {}

const DesktopNav = (props: NavProps) => {
  const countryId = useParam("countryId")

  const NavItem = ({ sx, to, text }: { to: string; text: string; sx?: SxStyleProp }) => {
    return (
      <Link passHref href={to}>
        <ThemeLink
          sx={{
            ...sx,
            mx: 2,
            textDecoration: "none",
            fontWeight: 700,
            marginInlineEnd: [18, 20],
            wordBreak: "keep-all",
            whiteSpace: "nowrap",
            color: "text",
            fontSize: [1, 1, 1, 1, 2],
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

        <NavItem to={`/#ServicesForm`} text="خطط لرحلتك معنا" />
        <NavItem to="/furniture/" text="أثث منزلك" />
        <NavItem to="/partners/" text="شركاء النجاح" />
      </Flex>
    </Box>
  )
}

export default DesktopNav
