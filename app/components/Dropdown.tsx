import React, { ReactNode } from "react"
import { Box, Flex, SxStyleProp } from "theme-ui"
import { Icon } from "react-icons-kit"
import { chevronDown } from "react-icons-kit/fa/chevronDown"
import { useState } from "react"

type Option = { key: string | number; value: string | number; node?: ReactNode }

type DropdownProps = {
  options: Option[]
  defaultValue?: string
  /**
   * this prop for unselectable dropdown such list of navigations
   */

  outterStyle?: SxStyleProp
  title?: ReactNode
  onChange: (value: any) => void
}

const Dropdown = ({ options, title, outterStyle, defaultValue, onChange }: DropdownProps) => {
  const defaultOption = options.find((option) => option.value === defaultValue)
  const [open, setOpen] = useState(false)

  return (
    <Box
      onMouseLeave={() => setOpen(false)}
      sx={{ position: "relative", zIndex: 1111, ...outterStyle }}
    >
      <Flex
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(true)}
        sx={{
          alignItems: "center",
          color: "primary",
        }}
      >
        <Box sx={{ marginInlineEnd: 5 }}>
          {title || defaultOption?.node || defaultOption?.value}
        </Box>
        <Box sx={{}}>
          <Icon icon={chevronDown} />
        </Box>
      </Flex>
      {open && (
        <Box
          sx={{
            paddingY: 2,
            position: "absolute",
            backgroundColor: "background",
            borderRadius: 15,
            boxShadow: "default",
            zIndex: 1111,
          }}
        >
          {options.map((option, index) => (
            <Box
              key={index}
              sx={{ paddingX: 2, cursor: "pointer" }}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              {option.node || option.value}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Dropdown
