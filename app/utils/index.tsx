export const numberFormat = (number: number): string => {
  let nf = new Intl.NumberFormat()
  return nf.format(number)
}

export function getPriceTypeName(priceType: string) {
  switch (priceType) {
    case "priceQatar":
      return "بالريال القطري"
    case "priceKSA":
      return "بالريال السعودي"
    case "priceTurkey":
      return "بالدولار"
    case "priceKuwait":
      return "بالدينار الكويتي"
    case "priceUAE":
      return "بالدرهم الاماراتي"
    case "priceOman":
      return "بالريال العماني"

    default:
      return "بالدولار"
  }
}

export function getPriceTypeValue(priceType: string) {
  switch (priceType) {
    case "priceQatar":
      return "priceQatar"
    case "priceKSA":
      return "priceKSA"
    case "priceTurkey":
      return "priceTurkey"
    case "priceKuwait":
      return "priceKuwait"
    case "priceUAE":
      return "priceUAE"
    case "priceOman":
      return "priceOman"

    default:
      return "price"
  }
}
