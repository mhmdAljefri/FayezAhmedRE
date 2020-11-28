import React, { useState } from "react"
import { Box, Flex, Link } from "theme-ui"
import { Global } from "@emotion/core"
import Burger from "./Burger"
import ChangeColorsMode from "./ChangeColorsMode"

type NavProps = {}

const Nav = (props: NavProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ minWidth: 100, position: "relative", zIndex: 999999, minHeight: 35 }}>
      <Burger onClick={() => setOpen(!open)} open={open} />
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
          opacity: open ? 1 : 0,

          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          direction: "ltr",
          display: open ? "block" : "none",
        }}
      >
        <Flex
          as="nav"
          sx={{
            paddingX: 4,

            direction: "rtl",
            paddingY: 5,
            width: ["90vw", null, null, 400],
            boxShadow: "default",
            flexDirection: "column",
          }}
        >
          <Link sx={{ fontSize: [3, null, 4, 5] }}>logo</Link>
          <Link sx={{ fontSize: [3, null, 4, 5] }}>salary</Link>
          <Link sx={{ fontSize: [3, null, 4, 5] }}>search</Link>
          <Link sx={{ fontSize: [3, null, 4, 5] }}>language</Link>
          <Link sx={{ fontSize: [3, null, 4, 5] }}>menu</Link>
          <ChangeColorsMode sx={{ fontSize: [3, null, 4, 5] }} />
        </Flex>
      </Box>
    </Box>
  )
}

export default Nav
