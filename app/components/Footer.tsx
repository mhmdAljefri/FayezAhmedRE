import React, { ReactNode } from "react"
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
import { Box, Image, Flex, Grid, Heading, Link as ThemeLink, Text } from "theme-ui"
import Wrapper from "./Wrapper"
import { Link } from "blitz"

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
        textDecoration: "none",
        cursor: "pointer",
        paddingY: 3,
        paddingX: [1, null, 3],
        marginX: 2,
        color: "primary",
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

type HRProps = {}
function HR(props: HRProps) {
  return <Box sx={{ marginY: 4, height: 1, backgroundColor: "white" }} />
}

export default function Footer() {
  const mobileNumber = "97470040087"
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
          <Heading sx={{ paddingBottom: 2, color: "white" }}>تحميل التطبيق عبر</Heading>
          <Flex sx={{ marginBottom: 4 }}>
            <ThemeLink>
              <Box
                sx={{
                  width: 200,
                  m: 1,
                  borderRadius: 5,
                  height: 56,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  sx={{ position: "absolute", top: 0, transform: "scale(1.03)" }}
                  src="/app-store.jpg"
                  alt="apple"
                />
              </Box>
            </ThemeLink>{" "}
            <ThemeLink>
              <Box
                sx={{
                  width: 200,
                  m: 1,
                  borderRadius: 5,
                  height: 56,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  sx={{ position: "absolute", bottom: -1, transform: "scale(1.03)" }}
                  src="/app-store.jpg"
                  alt="apple"
                />
              </Box>
            </ThemeLink>
          </Flex>
        </Box>
      </Wrapper>
      <Box sx={{ backgroundColor: "dark2" }}>
        <Wrapper>
          <Grid columns={[2, null, 4]}>
            <Link passHref href="/enquire">
              <ThemeLink sx={{ textDecoration: "none" }}>
                <CallUSButton icon={envelope}>استفسر الان</CallUSButton>
              </ThemeLink>
            </Link>
            <ThemeLink
              sx={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href={"tel:00" + mobileNumber}
            >
              <CallUSButton icon={phone}>مكالمة</CallUSButton>
            </ThemeLink>
            <ThemeLink
              sx={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href={"https://api.whatsapp.com/send?phone=" + mobileNumber}
            >
              <CallUSButton icon={whatsapp}>وتساب</CallUSButton>
            </ThemeLink>
            <Link href="/contacts">
              <ThemeLink sx={{ textDecoration: "none" }}>
                <CallUSButton icon={addressBook}>جهات الاتصال</CallUSButton>
              </ThemeLink>
            </Link>
          </Grid>
        </Wrapper>
      </Box>
    </Box>
  )
}
