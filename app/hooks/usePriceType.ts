import PriceProvider, { PriceContext } from "app/context/price"
import React from "react"

export default function usePriceType() {
  return React.useContext(PriceContext)
}
