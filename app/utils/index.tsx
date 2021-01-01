import { Country } from "@prisma/client"

export const numberFormat = (number: number): string => {
  let nf = new Intl.NumberFormat()
  return nf.format(number)
}

type priceTypes =
  | "price"
  | "priceQatar"
  | "priceTurkey"
  | "priceKSA"
  | "priceKuwait"
  | "priceUAE"
  | "priceOman"

export const getPriceType = (country: Country): priceTypes => {
  switch (true) {
    case country.isTurkey:
      return "priceTurkey"
    case country.isQatari:
      return "priceQatar"

    default:
      return "price"
  }
}
