import React, { ReactNode } from "react"
import { Box, SxStyleProp } from "theme-ui"

type WrapperProps = {
  children: ReactNode
  sx?: SxStyleProp
}

const Wrapper = ({ children, sx }: WrapperProps) => {
  return (
    <Box
      sx={{
        width: ["95vw", null, null, null, 1400],
        maxWidth: ["auto", null, null, "100%", 1400],
        paddingX: [2, null, null, null, 3],
        boxSizing: "border-box",
        marginX: "auto",
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default Wrapper
