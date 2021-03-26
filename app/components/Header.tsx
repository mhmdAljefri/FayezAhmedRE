import { Box, Flex, SxStyleProp, Text } from "theme-ui"
import React from "react"
import dynamic from "next/dynamic"
import Wrapper from "app/components/Wrapper"
import PriceType from "app/components/PriceType"
import { Link, useRouter } from "blitz"
import useScroll from "app/hooks/useScroll"
import useScreenSize from "app/hooks/useScreenSize"
import OptmizationImage from "./OptmizationImage"
import UserDropdwon from "./UserDropdwon"
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
  const hasProjects =
    pathname.startsWith("/countries/[countryId]") ||
    pathname.includes("projects") ||
    pathname === "/"
  const backgroundColor = scroll >= 50 ? "background" : (sx as any)?.backgroundColor
  const boxShadow = scroll >= 50 ? "default" : (sx as any)?.boxShadow

  const priceRender = hasProjects ? (
    <Box>
      <PriceType />
    </Box>
  ) : null
  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: "header",
        top: 0,
        left: 0,
        right: 0,
        ...sx,
        backgroundColor,
        boxShadow,
      }}
      as="header"
    >
      <Wrapper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            <DesktopNav />
          </Flex>
        )}
        <Flex sx={{ alignItems: "center" }}>
          {isDesktopScreen && (
            <>
              <WhatsappButton />
              <SearchButton />
              <UserDropdwon />
            </>
          )}
          {priceRender}
          {!isDesktopScreen && <Nav />}
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default Header
