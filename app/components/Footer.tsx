import React, { AnchorHTMLAttributes, ReactNode } from "react"
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
import { Box, Flex, Grid, Heading, Link, Text } from "theme-ui"
import Wrapper from "./Wrapper"

function Icon(props: IconProp) {
  return <RIconKit {...props} size={24} style={{ marginInlineEnd: 20, ...props.style }} />
}

type CallUSButtonProps = IconProp & {
  children: ReactNode
}
function CallUSButton({ icon, children }: CallUSButtonProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        paddingY: 3,
        paddingX: [1, null, 3],
        marginX: 2,
        marginY: 3,
        boxShadow: "0 1px 15px #111",
        borderRadius: 15,
      }}
    >
      <Icon style={{ marginInlineEnd: 0 }} icon={icon} />
      <Text>{children}</Text>
    </Box>
  )
}

type SupportBoxProp = AnchorHTMLAttributes<HTMLAnchorElement> & {
  title: string
  linkText: string
}
function SupportBox({ title, href, linkText }: SupportBoxProp) {
  return (
    <Box sx={{ paddingY: 3 }}>
      <Text>{title}</Text>
      <Link href={href}>{linkText}</Link>
    </Box>
  )
}

type HRProps = {}
function HR(props: HRProps) {
  return <Box sx={{ marginY: 4, height: 1, backgroundColor: "white" }} />
}

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "dark", paddingTop: 5, color: "white" }}>
      <Wrapper>
        <Box>
          <Heading sx={{ paddingBottom: 4, color: "white" }}>حسابات التواصل</Heading>
          <Flex>
            <Icon icon={instagram} />
            <Icon icon={youtube} />
            <Icon icon={facebook} />
            <Icon icon={twitter} />
            <Icon icon={snapchat} />
          </Flex>
        </Box>
        <HR />
        <Box>
          <Heading sx={{ paddingBottom: 4, color: "white" }}>تحميل التطبيق عبر</Heading>
        </Box>
        <HR />
        <Box>
          <Heading sx={{ paddingBottom: 4, color: "white" }}>نحن دائماً جاهزون لمساعدتك</Heading>
          <Grid columns={[1, 2, 3, 4]}>
            <SupportBox title="موقع الدعم" linkText="support.fayezahmed.com" href="" />
            <SupportBox title="بريد الدعم" linkText="support@fayezahmed.com" href="" />
            <SupportBox title="هاتف الدعم" linkText="support@fayezahmed.com" href="" />
          </Grid>
        </Box>
      </Wrapper>
      <Box sx={{ backgroundColor: "dark2" }}>
        <Wrapper>
          <Grid columns={[2, null, 4]}>
            <CallUSButton icon={envelope}>استعلام</CallUSButton>
            <CallUSButton icon={phone}>اتصال</CallUSButton>
            <CallUSButton icon={whatsapp}>وتساب</CallUSButton>
            <CallUSButton icon={addressBook}>ارقام التواصل</CallUSButton>
          </Grid>
        </Wrapper>
      </Box>
    </Box>
  )
}
