import React from "react"
import { Flex } from "theme-ui"
import OptmizationImage from "../OptmizationImage"
import { DotLoader } from "react-spinners"

export default function FullpageLoader() {
  return (
    <Flex
      sx={{
        height: "100vh",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DotLoader />
    </Flex>
  )
}
