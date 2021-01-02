import React from "react"
import { Box } from "theme-ui"

type BurgerProps = {
  open: Boolean
  onClick: () => void
  onOpenedColor?: string
  onClosedColor?: string
}

const Burger = ({ open, onOpenedColor, onClosedColor, onClick }: BurgerProps) => {
  return (
    <Box
      role="button"
      onClick={onClick}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "1.5rem",
        height: "1.5rem",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 1,
        boxSizing: "content-box",
        span: {
          width: "1.5rem",
          height: "1px",
          backgroundColor: open ? onClosedColor : onOpenedColor,
          borderRadius: "10px",
          transition: "all 0.3s linear",
          position: "relative",
          transformOrigin: "1px",
          ":first-of-type": {
            transform: open ? "rotate(45deg)" : "rotate(0)",
          },
          ":nth-of-type(2)": {
            opacity: open ? "0" : "1",
            transform: open ? "translateX(20px)" : "translateX(0)",
            width: "1rem",
          },
          ":nth-of-type(3)": {
            transform: open ? "rotate(-45deg)" : "rotate(0)",
          },
        },
      }}
    >
      <span />
      <span />
      <span />
    </Box>
  )
}

Burger.defaultProps = {
  onOpenedColor: "primary",
  onClosedColor: "text",
}
export default Burger
