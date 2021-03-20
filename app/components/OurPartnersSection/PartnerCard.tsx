import React from "react"

import OptmizationImage from "../OptmizationImage"
import { Flex } from "theme-ui"
import { Partner } from "@prisma/client"

type PartnersCardProps = Pick<Partner, "image" | "name">

function PartnersCard({ image, name }: PartnersCardProps) {
  return (
    <Flex
      sx={{
        textAlign: "center",
        marginX: "auto",
        paddingX: 4,
        width: [170, 220],
        height: [170, 220],
        backgroundColor: "background",
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "md",
        position: "relative",
      }}
    >
      <OptmizationImage
        sx={{
          width: [150, 190],
          height: [150, 190],
          objectFit: "contain",
          objectPosition: "center",
        }}
        objectFit="contain"
        width={200}
        height={200}
        src={image}
        alt={name}
      />
    </Flex>
  )
}
export default PartnersCard
