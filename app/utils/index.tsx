export const numberFormat = (number: number): string => {
  let nf = new Intl.NumberFormat()
  return nf.format(number)
}

export function getPriceTypeName(priceType: string) {
  switch (priceType) {
    case "priceQatar":
      return "بالريال القطري"
    default:
      return "بالدولار"
  }
}

export function getPriceTypeValue(priceType: string) {
  switch (priceType) {
    case "priceQatar":
      return "priceQatar"

    default:
      return "price"
  }
}
