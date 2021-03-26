import React from "react"
import { Flex, Box, Text } from "theme-ui"
import OptmizationImage from "./OptmizationImage"

export default function LogoWithText() {
  return (
    <Flex sx={{ alignItems: "center" }}>
      <Box sx={{ width: 40, height: 40, position: "relative", paddingY: 2 }}>
        <OptmizationImage
          layout="fill"
          localImage
          objectFit="contain"
          src="/logo.jpg"
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
  )
}
