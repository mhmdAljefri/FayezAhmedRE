import { Box, Flex, Image, SxStyleProp, Text } from "theme-ui"
import React from "react"
import Wrapper from "app/components/Wrapper"
import Nav from "app/components/Navs/Nav"
import PriceType from "app/components/PriceType"
import { Link, useRouter } from "blitz"
import useScroll from "app/hooks/useScroll"
import DesktopNav from "./Navs/DesktopNav"
import useScreenSize from "app/hooks/useScreenSize"
import WhatsappButton from "./NavItems/WhatsappButton"
import SearchButton from "./NavItems/SearchButton"

type HeaderProps = {
  sx?: SxStyleProp
}

const Header = ({ sx }: HeaderProps) => {
  const scroll = useScroll()
  const { pathname } = useRouter()
  const isDesktopScreen = useScreenSize() > 700
  const hasProjects =
    pathname.startsWith("/countries/[countryId]") ||
    pathname.includes("projects") ||
    pathname === "/"
  const backgroundColor = scroll >= 50 ? "dark" : (sx as any)?.backgroundColor

  const priceRender = hasProjects ? (
    <Box>
      <PriceType />
    </Box>
  ) : null
  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        ...sx,
        backgroundColor,
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
            <Flex sx={{ alignItems: "center" }}>
              <Box sx={{ maxWidth: 50, paddingY: 2 }}>
                <Image src="/FAYEZ.png" alt="Fayez Ahmed RealEstate | فائز احمد العقارية" />
              </Box>
              <Text
                sx={{
                  fontSize: [1, 3],
                  paddingX: 2,
                  lineHeight: "23px",
                  paddingY: 0,
                  color: "primary",
                }}
              >
                فايز احمد
                <Text
                  sx={{
                    p: 0,
                    fontWeight: "700",
                  }}
                >
                  العقـــارية
                </Text>
              </Text>
            </Flex>
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
