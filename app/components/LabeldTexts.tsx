import React from "react"
import { Grid, Image } from "theme-ui"
import OfferIconText from "app/components/OfferLabeldText"
import { IoBed } from "@react-icons/all-files/io5/IoBed"

import { FaHome } from "@react-icons/all-files/fa/FaHome"
import { FaBath } from "@react-icons/all-files/fa/FaBath"
import { ImFlag } from "@react-icons/all-files/im/ImFlag"

type Props = {
  propertyType?: null | string
  numberOfRooms?: null | string
  numberOfBathrooms?: null | string
  areaSize?: null | string
  city?: string | null
  small?: boolean
}

export default function LabeldTexts({
  propertyType,
  numberOfRooms,
  numberOfBathrooms,
  areaSize,
  city,
  small = true,
}: Props) {
  // fucking feedback on grid
  let gridColumns = 0
  if (propertyType) gridColumns += 1
  if (numberOfRooms) gridColumns += 1
  if (numberOfBathrooms) gridColumns += 1
  if (areaSize) gridColumns += 1
  if (city) gridColumns += 1

  const size = small ? 18 : 22

  return (
    <Grid columns={small ? gridColumns : [1, 2, gridColumns]}>
      <OfferIconText small={small} heading="المدينة" text={city} icon={<ImFlag size={size} />} />
      <OfferIconText
        small={small}
        heading="نوع العقار"
        text={propertyType}
        icon={<FaHome size={size} />}
      />
      <OfferIconText
        small={small}
        heading="عدد الغرف"
        text={numberOfRooms}
        icon={<IoBed size={size} />}
      />
      <OfferIconText
        small={small}
        heading="عدد الحمامات"
        text={numberOfBathrooms}
        icon={<FaBath size={size} />}
      />
      <OfferIconText
        small={small}
        heading="مساحة العقار"
        text={areaSize}
        icon={<Image src="/icons/area.png" width={size} />}
      />
    </Grid>
  )
}
