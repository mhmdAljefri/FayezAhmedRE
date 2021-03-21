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
        zIndex: "header",
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
              <Box sx={{ width: 40, height: 40, position: "relative", paddingY: 2 }}>
                <OptmizationImage
                  layout="fill"
                  localImage
                  objectFit="contain"
                  src="/FAYEZ.png"
                  alt="Fayez Ahmed RealEstate | فائز احمد العقارية"
                />
              </Box>
              <Text
                sx={{
                  fontSize: [1, 3],
                  paddingX: 2,
                  maxWidth: 100,
                  minWidth: 70,
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
          <UserDropdwon />
          {!isDesktopScreen && <Nav />}
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default Header
