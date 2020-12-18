import React from "react"
import RCDrawer from "rc-drawer"
import { css, Global } from "@emotion/core"

export default function Drawer({ open, children, onClose }) {
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
      <RCDrawer placement="right" handler={false} onClose={onClose} open={open}>
        {children}
      </RCDrawer>
    </>
  )
}
