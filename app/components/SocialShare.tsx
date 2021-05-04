import React, { useEffect, useMemo, useState } from "react"
import { shareSquareO } from "react-icons-kit/fa/shareSquareO"
import { telegram } from "react-icons-kit/fa/telegram"
import { whatsapp } from "react-icons-kit/fa/whatsapp"
import { Button, Flex, Link, Box } from "theme-ui"
import IconWithText from "app/components/IconWithText"
import CopyToClipboard from "app/components/CopyToClipboard"
import useOnClickOutside from "app/hooks/useOnClickout"
import { SxStyleProp } from "theme-ui"
import { Icon } from "react-icons-kit"

export const facebookLinkGenerator = (page) =>
  `https://www.facebook.com/sharer/sharer.php?u=${page}`
export const twitterLinkGenerator = (page) => `http://www.twitter.com/share?url=${page}`

export const telegramLinkGenerator = (
  page,
  text = ""
) => `https://t.me/share/url?url=${page}&text=${text}
`

export const whatsappPreFilledLinkGenerator = (message) => `https://wa.me/?text=${message}`

export const whatsappDirectMessageLinkGenerator = (number, message) =>
  `https://wa.me/${number}?text=${message}`

type Props = {
  url: string
  title?: string
  sx?: SxStyleProp
}

export default function SocialShare({ url: pathname, title, sx }: Props) {
  const { ref, open, setOpen } = useOnClickOutside(false)
  const [baseUrl, setBaseUrl] = useState<string>()

  const url = baseUrl + pathname
  const whatsappLink = useMemo(() => whatsappPreFilledLinkGenerator(url), [url])
  const telegramLink = useMemo(() => telegramLinkGenerator(url), [url])

  const togglePopper = () => setOpen(!open)

  useEffect(() => {
    // use effects runs after render in other word runs on CSR
    setBaseUrl(window.location.origin)
  }, [])

  return (
    <Box ref={ref} sx={{ position: "relative", display: "inline-block" }}>
      <Button
        sx={{ ...sx, backgroundColor: "background", color: "text", boxShadow: "default" }}
        onClick={togglePopper}
      >
        <Icon size={18} icon={shareSquareO} />
      </Button>
      <Flex
        sx={{
          position: "absolute",
          top: 50,
          backgroundColor: "background",
          justifyContent: "center",
          flexDirection: ["column", null, "row"],
          alignItems: [null, null, "center"],
          p: 2,
          borderRadius: 15,
          mt: 0,
          opacity: open ? 1 : 0,
          width: ["auto", 200, 300, 350],
          visibility: open ? "visible" : "hidden",
        }}
      >
        <Link
          sx={{ textDecoration: "none", color: "text", my: 1 }}
          target="blank"
          rel="noreferrer noopener"
          href={whatsappLink}
        >
          <IconWithText icon={whatsapp} text="وتساب" />
        </Link>
        <Link
          sx={{ textDecoration: "none", color: "text", my: 1 }}
          target="blank"
          rel="noreferrer noopener"
          href={telegramLink}
        >
          <IconWithText icon={telegram} text="تليجرام" />
        </Link>
        <CopyToClipboard text={url} />
      </Flex>
    </Box>
  )
}
