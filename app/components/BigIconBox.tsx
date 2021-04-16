import useScreenSize from "app/hooks/useScreenSize"
import React, { ReactNode } from "react"
import { Icon, IconProp } from "react-icons-kit"
import { Box, SxStyleProp, Text } from "theme-ui"

interface BigIconTextProps extends IconProp {
  text: ReactNode
  sx?: SxStyleProp
}

export default function BigIconText({ text, icon, sx }: BigIconTextProps) {
  const isSmall = useScreenSize() < 500
  const iconSize = isSmall ? 15 : 30
  const boxSize = isSmall ? 25 : 60
  return (
    <Box sx={{ color: "white", textAlign: "center", ...sx }}>
      <Box
        sx={{
          height: boxSize,
          borderRadius: boxSize,
          width: boxSize,
          marginX: "auto",
          backgroundColor: "background",
          color: "primary",
        }}
      >
        <Icon style={{ marginTop: isSmall ? 5 : 15 }} size={iconSize} icon={icon} />
      </Box>
      <Text
        sx={{
          marginTop: isSmall ? 15 : 35,
          fontWeight: 700,
          fontSize: [0, 1, 1, 4],
        }}
      >
        {text}
      </Text>
    </Box>
  )
}
