import React from "react"
import { Flex } from "theme-ui"
import OfferIconText from "app/components/OfferLabeldText"

import { home } from "react-icons-kit/feather/home"
import { box } from "react-icons-kit/feather/box"
import { bath } from "react-icons-kit/fa/bath"
import { map2 } from "react-icons-kit/icomoon/map2"
import { flag } from "react-icons-kit/icomoon/flag"

type Props = {
  propertyType?: null | string
  numberOfRooms?: null | string
  numberOfBathrooms?: null | string
  areaSize?: null | string
  city?: string | null
}
export default function LabeldTexts({
  propertyType,
  numberOfRooms,
  numberOfBathrooms,
  areaSize,
  city,
}: Props) {
  return (
    <Flex sx={{ justifyContent: "space-evenly", mt: 2 }}>
      <OfferIconText small heading="نوع العقار" text={propertyType} icon={home} />
      <OfferIconText small heading="عدد الغرف" text={numberOfRooms} icon={box} />
      <OfferIconText small heading="المدينة" text={city} icon={flag} />
      <OfferIconText small heading="عدد الحمامات" text={numberOfBathrooms} icon={bath} />
      <OfferIconText small heading="مساحة العقار" text={areaSize} icon={map2} />
    </Flex>
  )
}
