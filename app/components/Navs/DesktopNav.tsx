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
            textDecoration: "none",
            fontWeight: 700,
            marginInlineEnd: [18, 20, 25],
            fontSize: 1,
            ":hover": {
              color: "white",
            },
          }}
        >
          {text}
        </ThemeLink>
      </Link>
    )
  }

  return (
    <Box sx={{ minWidth: 50, position: "relative", zIndex: 999999, minHeight: 35 }}>
      <Flex sx={{}}>
        <CountriesItemsList />
        <NavItem to="/services" text="خدماتنا" />
        <NavItem to="/about-us" text="لماذا فايز احمد" />

        <NavItem to={`/countries/${countryId || 1}/#ServicesForm`} text="خطط لرحلتك معنا" />
        <NavItem to="/furniture/" text="أثث منزلك" />
      </Flex>
    </Box>
  )
}

export default DesktopNav
