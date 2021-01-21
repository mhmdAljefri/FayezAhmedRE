import React from "react"
import { Box, Flex, Link as ThemeLink, SxStyleProp } from "theme-ui"
import { Global } from "@emotion/core"
import Burger from "./Burger"
import ChangeColorsMode from "./ChangeColorsMode"
import { Link, useParam } from "blitz"
import useOnClickout from "app/hooks/useOnClickout"
import Slide from "react-reveal/Slide"

type NavProps = {}

const Nav = (props: NavProps) => {
  const { open, setOpen, ref } = useOnClickout()
  const countryId = useParam("countryId")

  const NavItem = ({ sx, to, text }: { to: string; text: string; sx?: SxStyleProp }) => {
    return (
      <Link passHref href={to}>
        <ThemeLink
          onClick={() => setOpen(false)}
          sx={{
            ...sx,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: [3, 4, 4, 5],
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
          height: "100vh",

          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          direction: "ltr",
          display: open ? "block" : "none",
        }}
      >
        <Slide left when={open}>
          <Flex
            as="nav"
            ref={ref}
            sx={{
              paddingX: 4,
              height: "100vh",
              overflowX: "hidden",
              overflowY: "auto",
              backgroundColor: "dark",

              direction: "rtl",
              paddingY: 2,
              width: ["90vw", null, 400],
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
                }}
              />
              <NavItem to="/services" text="خدماتنا" />
              <NavItem to="/about-us" text="لماذا فايز احمد" />

              <NavItem to={`/countries/${countryId || 1}/#ServicesForm`} text="خطط لرحلتك معنا" />
              {countryId && (
                <>
                  <NavItem to={`/countries/${countryId}/projects`} text="المشاريع" />
                  <NavItem to={`/countries/${countryId}/offers`} text="العروض" />
                  <NavItem
                    to={`/countries/${countryId}/opration-companies`}
                    text="الشركات العاملة"
                  />
                </>
              )}
            </Flex>
            <ChangeColorsMode sx={{ fontSize: [3, null, 4, 5] }} />
          </Flex>
        </Slide>
      </Box>
    </Box>
  )
}

export default Nav
