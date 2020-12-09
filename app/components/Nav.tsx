import React from "react"
import { Box, Flex, Link as ThemeLink } from "theme-ui"
import { Global } from "@emotion/core"
import Burger from "./Burger"
import ChangeColorsMode from "./ChangeColorsMode"
import { Link } from "blitz"
import useOnClickout from "app/hooks/useOnClickout"
import Slide from "react-reveal/Slide"

type NavProps = {}

const Nav = (props: NavProps) => {
  const { open, setOpen, ref } = useOnClickout()
  return (
    <Box sx={{ minWidth: 100, position: "relative", zIndex: 999999, minHeight: 35 }}>
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
              backgroundColor: "background",

              direction: "rtl",
              paddingY: 2,
              width: ["90vw", null, null, 400],
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

              <Link href="/">
                <ThemeLink
                  sx={{
                    marginTop: 5,
                    color: "heading",
                    fontWeight: 700,
                    fontSize: [3, null, 5, 6],
                  }}
                >
                  الرئيسية
                </ThemeLink>
              </Link>
              <Link href="/furniture">
                <ThemeLink sx={{ color: "heading", fontWeight: 700, fontSize: [3, null, 5, 6] }}>
                  الاثاث
                </ThemeLink>
              </Link>
              <Link href="/search">
                <ThemeLink sx={{ color: "heading", fontWeight: 700, fontSize: [3, null, 5, 6] }}>
                  البحث
                </ThemeLink>
              </Link>
            </Flex>
            <ChangeColorsMode sx={{ fontSize: [3, null, 4, 5] }} />
          </Flex>
        </Slide>
      </Box>
    </Box>
  )
}

export default Nav
