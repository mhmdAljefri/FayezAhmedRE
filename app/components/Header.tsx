import { Box, Flex, Image, SxStyleProp, Text } from "theme-ui"
import React from "react"
import Wrapper from "./Wrapper"
import Nav from "./Nav"
import PriceType from "./PriceType"
import Search from "./Search"
import { Link } from "blitz"

type HeaderProps = {
  sx?: SxStyleProp
}

const Header = ({ sx }: HeaderProps) => {
  return (
    <Box sx={sx} as="header">
      <Wrapper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" passHref>
          <a>
            <Flex sx={{ alignItems: "center" }}>
              <Box sx={{ maxWidth: 70, paddingY: 2 }}>
                <Image src="/logo.png" alt="Fayez Ahmed RealEstate | فائز احمد العقارية" />
              </Box>
              <Text
                sx={{
                  visibility: ["hidden", "visible"],
                  fontSize: [2, 3],
                  paddingX: 2,
                  color: "primary",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                فائز احمد العقارية
              </Text>
            </Flex>
          </a>
        </Link>
        <Flex sx={{ alignItems: "center" }}>
          <Search />
          <Box sx={{ width: 1, height: 20, backgroundColor: "primary", marginX: 3 }} />
          <PriceType />
          <Nav />
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default Header
