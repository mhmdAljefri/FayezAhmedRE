import { Box, Flex, SxStyleProp } from "theme-ui"
import React from "react"
import dynamic from "next/dynamic"
import PriceType from "app/components/PriceType"
import { Link, useRouter } from "blitz"
import useScroll from "app/hooks/useScroll"
import useScreenSize from "app/hooks/useScreenSize"
import LogoWithText from "./LogoWithText"

const WhatsappButton = dynamic(() => import("./NavItems/WhatsappButton"))
const SearchButton = dynamic(() => import("./NavItems/SearchButton"))
const DesktopNav = dynamic(() => import("./Navs/DesktopNav"))
const Nav = dynamic(() => import("app/components/Navs/Nav"))

type HeaderProps = {
  sx?: SxStyleProp
}

const Header = ({ sx }: HeaderProps) => {
  const scroll = useScroll()
  const { pathname } = useRouter()
  const isDesktopScreen = useScreenSize() > 920
  const isHomePage = pathname === "/"
  const hasProjects =
    pathname.startsWith("/countries/[countryId]") || pathname.includes("projects") || isHomePage
  const scrolled = scroll >= 50

  const backgroundColor = scrolled ? "background" : (sx as any)?.backgroundColor
  const boxShadow = scrolled ? "default" : (sx as any)?.boxShadow

  const priceRender = hasProjects ? (
    <Box>
      <PriceType color={scrolled || !isHomePage ? undefined : "white"} />
    </Box>
  ) : null
  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: "header",
        width: "100%",
        top: 0,
        left: 0,
        right: scrolled ? 30 : 0,
        px: 2,
        ...sx,
        backgroundColor,
        boxShadow,
      }}
      as="header"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" passHref>
          <a
            style={{
              textDecoration: "none",
            }}
          >
            <LogoWithText />
          </a>
        </Link>
        {isDesktopScreen && (
          <Flex>
            <DesktopNav scrolled={scrolled || !isHomePage} />
          </Flex>
        )}
        <Flex sx={{ alignItems: "center" }}>
          {isDesktopScreen && (
            <>
              <WhatsappButton color={scrolled || !isHomePage ? "primary" : "white"} />
              <SearchButton color={scrolled || !isHomePage ? "primary" : "white"} />
            </>
          )}
          {priceRender}
          {!isDesktopScreen && <Nav />}
        </Flex>
      </Box>
    </Box>
  )
}

export default Header
