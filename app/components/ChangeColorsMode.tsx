import React from "react"
import { Button, SxStyleProp, useColorMode } from "theme-ui"

type ChangeColorsModeProps = {
  sx?: SxStyleProp
}

export default function ChangeColorsMode({ sx }: ChangeColorsModeProps) {
  const [mode, changeColorsMode] = useColorMode()
  const newMode = mode === "dark" ? "light" : "dark"

  const handleChangeMode = () => changeColorsMode(newMode)

  return (
    <Button variant="link" onClick={handleChangeMode} sx={sx}>
      الوضع اليلي
    </Button>
  )
}
