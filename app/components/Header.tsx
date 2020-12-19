import { Box, Flex, Image, SxStyleProp, Text } from "theme-ui"
import React from "react"
import Wrapper from "./Wrapper"
import Nav from "./Nav"
import PriceType from "./PriceType"
import Search from "./Search"
import { Link, useParam } from "blitz"
import useScroll from "app/hooks/useScroll"

type HeaderProps = {
  sx?: SxStyleProp
}

const Header = ({ sx }: HeaderProps) => {
  const scroll = useScroll()
  const countryId = useParam("countryId", "number")
  const backgroundColor = scroll >= 50 ? "dark" : (sx as any)?.backgroundColor
  const backgroundImage = "linear-gradient(180deg,#0f0f0fb5,#3837374a,transparent)"
  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        backgroundImage,
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
                فائز احمد
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
        <Flex sx={{ alignItems: "center" }}>
          {countryId && (
            <>
              <Search />
              <Box sx={{ display: ["none", null, "flex"] }}>
                <Box sx={{ width: 1, height: 20, backgroundColor: "primary", marginX: 3 }} />
                <PriceType />
              </Box>
            </>
          )}
          <Nav />
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default Header
