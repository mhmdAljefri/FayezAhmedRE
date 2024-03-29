export const numberFormat = (number: number): string => {
  let nf = new Intl.NumberFormat()
  return nf.format(number)
}

export const facebookLinkGenerator = (link, text = "") =>
  `https://www.facebook.com/sharer/sharer.php?u=${link}&quote=${text}`
export const twitterLinkGenerator = (link, text = "") =>
  `http://www.twitter.com/share?url=${link}&text=${text}`

export const telegramLinkGenerator = (
  link,
  text = ""
) => `https://t.me/share/url?url=${link}&text=${text}
`

export const whatsappPreFilledLinkGenerator = (message) => `https://wa.me/?text=${message}`

export const whatsappDirectMessageLinkGenerator = (number, message) =>
  `https://wa.me/${number}?text=${message}`

export function makeS3Url(src?: string) {
  const imageName = src?.split("/").reverse()[0]
  const awsSrc = `https://fayezahmed.s3.ap-south-1.amazonaws.com/fayez/${imageName}`
  return awsSrc
}

export function getSearchQuery(search: string | undefined, keys: string[]) {
  if (!search) return []
  return keys.map((key) => search.split(" ").map((word) => ({ [key]: { contains: word } }))).flat()
}

export const getListOfPrice = (price?: number[]): number[] => {
  if (!price) return []
  const [firstPrice, lastPrice] = price.toString().split(",") // wtf
  if (isNaN(parseInt(firstPrice, 10))) return []

  return [parseInt(firstPrice, 10), parseInt(lastPrice, 10)]
}
