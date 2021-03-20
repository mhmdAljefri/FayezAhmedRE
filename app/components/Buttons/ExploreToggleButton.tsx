import React from "react"
import { Box } from "theme-ui"

export default function ExploreToggleButton({ onClick, isActive, children }) {
  return (
    <Box
      onClick={onClick}
      role="buttom"
      title={children}
      aria-label={children}
      tabIndex={0}
      sx={{
        paddingY: 2,
        cursor: "pointer",
        width: 200,
        fontWeight: 700,
        color: isActive ? "white" : "text",
        textAlign: "center",
        backgroundColor: isActive ? "primary" : "muted",
        borderRadius: "md",
      }}
    >
      {children}
    </Box>
  )
}
