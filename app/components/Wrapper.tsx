import React, { ComponentPropsWithoutRef, ReactNode } from "react"
import { Box, SxStyleProp } from "theme-ui"

type WrapperProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode
  sx?: SxStyleProp
}

const Wrapper = ({ children, sx, ...props }: WrapperProps) => {
  return (
    <Box
      {...props}
      sx={{
        width: ["95vw", null, null, null, 1400],
        maxWidth: ["auto", null, null, 1400],
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
