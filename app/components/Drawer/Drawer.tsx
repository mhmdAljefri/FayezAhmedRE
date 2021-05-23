import React from "react"
import { css, Global } from "@emotion/core"
import { Box } from "theme-ui"
import ClickOutside from "../click-outside"
import ReactDOM from "react-dom"
import { ReactNode } from "react"

type Props = { open: boolean; children?: ReactNode; onClose: () => void }

function RawDrawer({ open, children, onClose }: Props) {
  return (
    <>
      {open && (
        <Global
          styles={css`
            body {
              overflow: hidden;
            }
          `}
        />
      )}

      <ClickOutside onClick={onClose} active={open}>
        <Box
          sx={{ position: "fixed", top: 0, bottom: 0, overflow: "auto", right: 0, zIndex: 9999 }}
        >
          {children}
        </Box>
      </ClickOutside>
    </>
  )
}

export default function Drawer(props: Props) {
  let container
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div")
    const parentElem = document.querySelector("#__next")
    parentElem?.appendChild(rootContainer)
    container = rootContainer
  }

  console.log(container)

  return container ? ReactDOM.createPortal(<RawDrawer {...props} />, container) : null
}
