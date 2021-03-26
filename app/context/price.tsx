import React, { ReactNode, useCallback, useState } from "react"
import { prices } from "../components/PriceType"

export type priceTypes =
  | "price"
  | "priceQatar"
  | "priceTurkey"
  | "priceKSA"
  | "priceKuwait"
  | "priceUAE"
  | "priceOman"

export type RateKeys = "USD" | "QAR" | "OMR" | "TRY" | "KWD" | "AED" | "SAR"
type Rates = Record<RateKeys, number>[]

export const PriceContext = React.createContext<{
  priceType: priceTypes
  priceTypeSign: string
  priceTypeSuffix: string
  rates?: Rates
  changePriceType: (priceTypeValue: priceTypes) => any
  changeRates?: (arg: Rates) => any
}>({
  priceType: "priceQatar",
  priceTypeSign: "$",
  priceTypeSuffix: "ريال قطري",
  changePriceType: (arg: priceTypes) => {},
  changeRates: (arg: Rates) => {},
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
  return prices.find((price) => price[0] === priceType)?.[3] || "$"
}

type Props = {
  price: priceTypes
  children: ReactNode
}
export default function PriceProvider({ price = "priceQatar", ...props }: Props) {
  const [priceType, setPriceType] = useState<priceTypes>(price)
  const [rates, setRates] = useState<Rates | undefined>()

  const priceTypeSuffix = getPriceTypeSuffix(priceType)
  const priceTypeSign = getPriceTypeSign(priceType)

  const changePriceType = useCallback(
    (priceTypeValue: priceTypes) => {
      setPriceType(priceTypeValue)
    },
    [setPriceType]
  )

  return (
    <PriceContext.Provider
      value={{
        rates,
        priceType,
        priceTypeSign,
        changeRates: (newRates: Rates) => setRates(newRates),
        changePriceType,
        priceTypeSuffix,
      }}
      {...props}
    />
  )
}
