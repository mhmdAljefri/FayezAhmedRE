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
      <Box
        sx={{
          height: 60,
          borderRadius: 60,
          width: 60,
          marginX: "auto",
          backgroundColor: "background",
          color: "primary",
        }}
      >
        <Icon style={{ marginTop: 15 }} size={30} icon={icon} />
      </Box>
      <Text
        sx={{
          marginTop: 35,
          fontWeight: 700,
          fontSize: [1, 4],
        }}
      >
        {text}
      </Text>
    </Box>
  )
}
