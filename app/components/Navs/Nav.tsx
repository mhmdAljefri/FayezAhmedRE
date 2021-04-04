import React, { useLayoutEffect, useRef } from "react"
import { Box, Flex, Link as ThemeLink, SxStyleProp } from "theme-ui"
import { Global } from "@emotion/core"
import Burger from "app/components/Burger"
import ChangeColorsMode from "app/components/ChangeColorsMode"
import { Link, Router } from "blitz"
import useOnClickout from "app/hooks/useOnClickout"
import UserDropdwon from "../UserDropdwon"
// import CountriesItemsList from "../NavItems/CountriesItemsList"

type NavProps = {}

const Nav = (props: NavProps) => {
  const prevRouter = useRef<string | null>(null)
  const { open, setOpen, ref } = useOnClickout()
  // const countryId = useParam("countryId")

  useLayoutEffect(() => {
    const isClient = typeof window !== "undefined"
    if (isClient && open && prevRouter.current !== Router.asPath) {
      prevRouter.current = Router.asPath
      setOpen(false)
    }
  })

  const NavItem = ({ sx, to, text }: { to: string; text: string; sx?: SxStyleProp }) => {
    return (
      <Link passHref href={to}>
        <ThemeLink
          onClick={() => setOpen(false)}
          sx={{
            ...sx,
            textDecoration: "none",
            fontWeight: 700,
            my: 3,
            fontSize: [2, 3, 4],
          }}
        >
          {text}
        </ThemeLink>
      </Link>
    )
  }

  return (
    <Box sx={{ minWidth: 50, position: "relative", zIndex: 999999, minHeight: 35 }}>
      <Burger onClick={() => setOpen(true)} open={open} />
      {open && (
        <Global
          styles={{
            body: { overflow: "hidden" },
          }}
        />
      )}
      <Box
        sx={{
          backdropFilter: "blur(10px)",
          position: "fixed",

          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          direction: "ltr",
          display: open ? "block" : "none",
        }}
      >
        <Flex
          as="nav"
          ref={ref}
          sx={{
            paddingX: 4,
            pb: 4,
            position: "absolute",
            top: 0,
            bottom: 0,
            overflowX: "hidden",
            overflowY: "auto",
            backgroundColor: "dark",

            direction: "rtl",
            paddingY: 2,
            width: ["80%", null, 400],
            boxShadow: "default",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
            }}
          >
            <Burger onClick={() => setOpen(false)} open={open} />

            <NavItem
              to="/search"
              text="البحث"
              sx={{
                marginTop: 5,
                fontSize: [2, 3, 4],
              }}
            />
            <NavItem to="/countries/2/projects" text="المشاريع" />
            <NavItem to="/countries/2/offers" text="العروض" />
            <NavItem to="/services" text="خدماتنا" />
            <NavItem to="/about-us" text="لماذا فايز احمد" />

            <NavItem to={`/#ServicesForm`} text="خطط لرحلتك معنا" />
            <NavItem to="/furniture/" text="أثث منزلك" />
            <NavItem to="/partners/" text="شركاء النجاح" />
          </Flex>
          <Flex>
            <UserDropdwon />

            <ChangeColorsMode sx={{ fontSize: [3, null, 4, 5] }} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Nav
