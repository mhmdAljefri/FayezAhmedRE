import React from "react"
import { Icon } from "react-icons-kit"
import { sunO } from "react-icons-kit/fa/sunO"
import { moonO } from "react-icons-kit/fa/moonO"
import { Box, Flex, SxStyleProp, useColorMode } from "theme-ui"

type ChangeColorsModeProps = {
  sx?: SxStyleProp
}

const iconStyle: SxStyleProp = {
  width: 25,
  lineHeight: "27 px",
  textAlign: "center",
  height: 25,
  borderRadius: 40,
}

export default function ChangeColorsMode({ sx }: ChangeColorsModeProps) {
  const [mode, changeColorsMode] = useColorMode()
  const isDark = mode === "dark"
  const newMode = isDark ? "light" : "dark"

  const handleChangeMode = () => changeColorsMode(newMode)

  return (
    <Flex
      onClick={handleChangeMode}
      sx={{
        width: 70,
        marginBottom: 3,
        justifyContent: "space-between",
        borderRadius: 25,
        boxShadow: "default",
      }}
    >
      <Box
        sx={{
          color: isDark ? "text" : "background",
          backgroundColor: !isDark ? "text" : "background",
          boxShadow: isDark ? undefined : "card",
          ...iconStyle,
        }}
      >
        <Icon icon={sunO} />
      </Box>
      <Box
        sx={{
          color: isDark ? "primary" : "white  ",
          backgroundColor: !isDark ? "primary" : "white ",
          boxShadow: isDark ? "card" : undefined,
          ...iconStyle,
        }}
      >
        <Icon icon={moonO} />
      </Box>
    </Flex>
  )
}
