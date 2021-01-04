import { useParam } from "blitz"
import React, { useCallback, useLayoutEffect, useState } from "react"
import { prices } from "../components/PriceType"
type priceTypes =
  | "price"
  | "priceQatar"
  | "priceTurkey"
  | "priceKSA"
  | "priceKuwait"
  | "priceUAE"
  | "priceOman"

export const PriceContext = React.createContext<{
  priceType: string
  priceTypeSign: string
  priceTypeSuffix: string
  changePriceType: (priceTypeValue: priceTypes) => any
}>({
  priceType: "price",
  priceTypeSign: "$",
  priceTypeSuffix: '"دولار امريكي"',
  changePriceType: (arg: priceTypes) => {},
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

// todo use currancy list
function getPriceTypeSign(priceType: priceTypes) {
  return prices.find((price) => price[0] === priceType)?.[3]
}

export default function PriceProvider(props) {
  const [priceType, setPriceType] = useState<priceTypes>("price")

  const priceTypeSuffix = priceType && getPriceTypeSuffix(priceType)
  const priceTypeSign = priceType && getPriceTypeSign(priceType)

  const changePriceType = useCallback(
    (priceTypeValue: priceTypes) => {
      setPriceType(priceTypeValue)
    },
    [setPriceType]
  )

  return (
    <PriceContext.Provider
      value={{ priceType, priceTypeSign, changePriceType, priceTypeSuffix }}
      {...props}
    />
  )
}
