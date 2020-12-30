import React from "react"
import RCDrawer from "rc-drawer"
import { css, Global } from "@emotion/core"

export default function Drawer({ open, children, onClose, handler }) {
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
      <RCDrawer placement="right" handler={handler} onClose={onClose} open={open}>
        {children}
      </RCDrawer>
    </>
  )
}
