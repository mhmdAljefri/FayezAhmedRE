import React from "react"
import { Flex } from "theme-ui"
import { Partner } from "@prisma/client"
import PartnersCard from "./PartnerCard"

type OurPartnersSectionProps = {
  data: Pick<Partner, "id" | "name" | "image">[]
}

export default function OurPartnersSection(props: OurPartnersSectionProps) {
  return (
    <Flex sx={{ paddingTop: 5, paddingBottom: 5, flexWrap: "wrap" }}>
      {props.data.map((partner) => (
        <PartnersCard key={partner.id} {...partner} />
      ))}
    </Flex>
  )
}
