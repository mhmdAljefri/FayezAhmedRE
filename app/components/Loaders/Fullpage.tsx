import React from "react"
import { Flex } from "theme-ui"
import OptmizationImage from "../OptmizationImage"

export default function FullpageLoader() {
  return (
    <Flex
      sx={{
        maxHeight: "100vh",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OptmizationImage
        layout="intrinsic"
        width={200}
        height={200}
        localImage
        objectFit="contain"
        className="animate__animated animate__pulse animate__infinite"
        src="/logo.png"
        alt="Fayez Ahmed RealEstate | فائز احمد العقارية"
      />
    </Flex>
  )
}
