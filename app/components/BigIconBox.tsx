import React, { ReactNode } from "react"
import { Icon, IconProp } from "react-icons-kit"
import { Box, SxStyleProp, Text } from "theme-ui"

interface BigIconTextProps extends IconProp {
  text: ReactNode
  sx?: SxStyleProp
}

export default function BigIconText({ text, icon, sx }: BigIconTextProps) {
  return (
    <Box sx={{ color: "white", textAlign: "center", ...sx }}>
      <Icon size={60} icon={icon} />
      <Text
        sx={{
          marginTop: 35,
        }}
      >
        {text}
      </Text>
    </Box>
  )
}
