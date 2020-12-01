import React, { ReactNode, useState } from "react"
import { Box, Flex } from "theme-ui"
import { Icon } from "react-icons-kit"
import { chevronDown } from "react-icons-kit/fa/chevronDown"
import useOnClickout from "app/hooks/useOnClickout"

type Option = { key: String; value: String; node?: ReactNode }

type DropdownProps = {
  options: Option[]
  defaultValue: String
}

// TODO add Price hooks and context

const Dropdown = ({ options, defaultValue }: DropdownProps) => {
  const defaultOption = options.find((option) => option.value === defaultValue)
  const [selected, setSelected] = useState(defaultOption)
  const { ref, open, setOpen } = useOnClickout()

  return (
    <Box ref={ref} sx={{ position: "relative", zIndex: 1111 }}>
      <Flex sx={{ alignItems: "center", color: "primary" }} onMouseEnter={() => setOpen(true)}>
        <Box sx={{ paddingX: 2, marginInlineEnd: 5 }}>{selected?.node || selected?.value}</Box>
        <Icon icon={chevronDown} />
      </Flex>
      <Box
        sx={{
          paddingY: 2,
          position: "absolute",
          backgroundColor: "background",
          opacity: open ? 1 : 0,
          borderRadius: 15,
          boxShadow: "default",
        }}
      >
        {options.map((option, index) => (
          <Box key={index} sx={{ paddingX: 2 }} onClick={() => setSelected(option)}>
            {option.node || option.value}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Dropdown