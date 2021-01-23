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
