import React, { ReactNode } from "react"
import { Box, Text } from "rebass"
import { Icon, IconProp } from "react-icons-kit"
import { SxStyleProp } from "theme-ui"

type Props = {
  icon: IconProp["icon"]
  color?: string
  style?: SxStyleProp
  text: ReactNode
  size?: number
}
function IconWithText({ icon, color = "text", text, style, size = 20, ...props }: Props) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        svg: {
          color,
        },
        ...style,
      }}
    >
      <Icon size={size} icon={icon} />
      <Text sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }} marginX={15} as="span">
        {text}
      </Text>
    </Box>
  )
}

export default IconWithText
