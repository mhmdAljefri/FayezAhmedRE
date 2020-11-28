import { Box, Flex, Image, SxStyleProp } from "theme-ui"
import React from "react"
import Wrapper from "./Wrapper"
import Nav from "./Nav"
import PriceType from "./PriceType"
import Search from "./Search"

type HeaderProps = {
  sx?: SxStyleProp
}

const Header = ({ sx }: HeaderProps) => {
  return (
    <Box sx={sx} as="header">
      <Wrapper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Flex sx={{ alignItems: "center" }}>
          <Box sx={{ maxWidth: 70, paddingY: 2 }}>
            <Image src="/logo.png" alt="Fayez Ahmed RealEstate | فائز احمد العقارية" />
          </Box>
        </Flex>
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
