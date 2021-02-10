import React from "react"
import { Flex, Image } from "theme-ui"

export default function FullpageLoader() {
  return (
    <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Image
        sx={{ minWidth: 170 }}
        src="/logo.png"
        alt="Fayez Ahmed RealEstate | فائز احمد العقارية"
      />
    </Flex>
  )
}
