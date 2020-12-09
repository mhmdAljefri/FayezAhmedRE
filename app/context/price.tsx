import React, { useState } from "react"

type priceTypes =
  | "price"
  | "priceQatar"
  | "priceTurkey"
  | "priceKSA"
  | "priceKuwait"
  | "priceUAE"
  | "priceOman"

export const PriceContext = React.createContext({
  priceType: "price",
  priceTypeSuffix: "دولار امريكي",
  changePriceType: (priceTypeValue: priceTypes) => {},
})

function getPriceTypeSuffix(priceType: priceTypes) {
  switch (priceType) {
    case "priceQatar":
      return "ريال قطري"
    case "priceKSA":
      return "ريال سعودي"
    case "priceTurkey":
      return "ليرة تركية"
    case "priceKuwait":
      return "دينار كويتي"
    case "priceUAE":
      return "درهم امراتي"
    case "priceOman":
      return "ريال عماني"

    default:
      return "دولار امريكي"
  }
}
export default function PriceProvider(props) {
  const [priceType, setPriceType] = useState<priceTypes>("price")

  const priceTypeSuffix = getPriceTypeSuffix(priceType)

  const changePriceType = (priceTypeValue: priceTypes) => {
    setPriceType(priceTypeValue)
  }
  return (
    <PriceContext.Provider value={{ priceType, changePriceType, priceTypeSuffix }} {...props} />
  )
}
