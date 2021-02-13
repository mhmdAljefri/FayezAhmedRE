import React from "react"
import { Flex } from "theme-ui"
import OptmizationImage from "../OptmizationImage"

export default function FullpageLoader() {
  return (
    <Flex
      sx={{ height: "100vh", overflow: "hidden", justifyContent: "center", alignItems: "center" }}
    >
      <OptmizationImage
        layout="intrinsic"
        width={250}
        height={250}
        objectFit="contain"
        className="animate__animated animate__pulse animate__infinite"
        src="/logo.png"
        alt="Fayez Ahmed RealEstate | فائز احمد العقارية"
      />
    </Flex>
  )
}
