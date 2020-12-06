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
  changePriceType: (priceTypeValue: priceTypes) => {},
})

export default function PriceProvider(props) {
  const [priceType, setPriceType] = useState<priceTypes>("price")

  const changePriceType = (priceTypeValue: priceTypes) => {
    setPriceType(priceTypeValue)
  }
  return <PriceContext.Provider value={{ priceType, changePriceType }} {...props} />
}
