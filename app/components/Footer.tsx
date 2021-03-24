import React, { ReactNode, useEffect, useRef, useState } from "react"
import { Icon as RIconKit, IconProp } from "react-icons-kit"
import { instagram } from "react-icons-kit/fa/instagram"
import { facebook } from "react-icons-kit/fa/facebook"
import { youtube } from "react-icons-kit/fa/youtube"
import { twitter } from "react-icons-kit/fa/twitter"
import { snapchat } from "react-icons-kit/fa/snapchat"
import { envelope } from "react-icons-kit/fa/envelope"
import { phone } from "react-icons-kit/fa/phone"
import { whatsapp } from "react-icons-kit/fa/whatsapp"
import { addressBook } from "react-icons-kit/fa/addressBook"
import { Box, Flex, Grid, Heading, Link as ThemeLink, Text } from "theme-ui"
import Wrapper from "./Wrapper"
import { Link } from "blitz"
import useScroll from "app/hooks/useScroll"
import { MOBILE_NUMBER, WHATSAPP_NUMBER } from "app/constants"

function Icon(props: IconProp & { href?: string }) {
  return (
    <ThemeLink
      style={{ color: "inherit" }}
      target="blank"
      rel="noopener norefrence"
      href={props.href}
      as={props.href ? "a" : "span"}
    >
      <RIconKit {...props} size={22} style={{ marginInlineEnd: 20, ...props.style }} />
    </ThemeLink>
  )
}

type CallUSButtonProps = IconProp & {
  children: ReactNode
}
function CallUSButton({ icon, children }: CallUSButtonProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        textDecoration: "none",
        cursor: "pointer",
        paddingY: 1,
        paddingX: 1,
        marginX: 0,
        color: "white",
        marginY: 1,
        boxShadow: "0 1px 15px #111",
        borderRadius: 15,
      }}
    >
      <Icon style={{ marginInlineEnd: 0 }} icon={icon} />
      <Text sx={{ fontSize: 10 }}>{children}</Text>
    </Box>
  )
}

type HRProps = {}
function HR(props: HRProps) {
  return <Box sx={{ marginY: 4, height: 1 }} />
}

export default function Footer() {
  const prefScroll = useRef(0)
  const timeout = useRef(setTimeout(() => {}, 0))
  const scroll = useScroll()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    clearTimeout(timeout.current)
    if (prefScroll.current > scroll) {
      setOpen(true)
      timeout.current = setTimeout(() => setOpen(false), 5000)
    } else {
      setOpen(false)
    }
    prefScroll.current = scroll

    return () => {}
  }, [scroll])

  return (
    <Box
      sx={{
        backgroundColor: "muted",
        paddingTop: 4,
        paddingBottom: 3,
        color: "white",
        position: "relative",
      }}
    >
      <Wrapper>
        <Box>
          <Heading sx={{ paddingBottom: 1 }}>تابعنا</Heading>
          <Flex sx={{ flexWrap: "wrap" }}>
            <Icon
              href="https://instagram.com/fayez_projects?igshid=1joclb832c6qt"
              icon={instagram}
            />
            <Icon href="https://www.youtube.com/channel/UCtDgEC5W-5Rs8Wk8ecYs8NA" icon={youtube} />
            <Icon href="https://www.facebook.com/profile.php?id=100011271579057" icon={facebook} />
            <Icon href="https://twitter.com/fayez_projects" icon={twitter} />
            <Icon href="https://www.snapchat.com/add/projects_live" icon={snapchat} />
          </Flex>
        </Box>
        <HR />
      </Wrapper>
      <Box
        sx={{
          backgroundColor: "dark2",
          color: "white",
          position: open ? "fixed" : "absolute",
          zIndex: 100,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Wrapper>
          <Grid gap={[0, 1, 2]} columns={[4]}>
            <Link passHref href="/enquire">
              <ThemeLink sx={{ textDecoration: "none" }}>
                <CallUSButton icon={envelope}>استفسر الان</CallUSButton>
              </ThemeLink>
            </Link>
            <ThemeLink
              sx={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href={"tel:00" + MOBILE_NUMBER}
            >
              <CallUSButton icon={phone}>مكالمة</CallUSButton>
            </ThemeLink>
            <ThemeLink
              sx={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href={"https://api.whatsapp.com/send?phone=" + WHATSAPP_NUMBER}
            >
              <CallUSButton icon={whatsapp}>وتساب</CallUSButton>
            </ThemeLink>
            <Link href="/contacts">
              <ThemeLink as="span" sx={{ textDecoration: "none" }}>
                <CallUSButton icon={addressBook}>جهات الاتصال</CallUSButton>
              </ThemeLink>
            </Link>
          </Grid>
        </Wrapper>
      </Box>
    </Box>
  )
}
