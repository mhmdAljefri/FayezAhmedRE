import React from "react"
import usePriceType from "app/hooks/usePriceType"
import { priceTypes, RateKeys } from "app/context/price"
import { numberFormat } from "app/utils"

type Props = {
  price: number
}

export default function CurrencyPrice({ price }: Props) {
  const { priceType, rates } = usePriceType()
  const priceTypeRate: Record<priceTypes, RateKeys> = {
    priceQatar: "QAR",
    price: "USD",
    priceOman: "OMR",
    priceKuwait: "KWD",
    priceKSA: "SAR",
    priceTurkey: "TRY",
    priceUAE: "AED",
  }

  const rate: number = rates ? rates[priceTypeRate[priceType]] : 1

  return <span>{numberFormat(price * rate)}</span>
}
