import React, { ReactNode, useRef } from "react"
import { Box, Flex, SxStyleProp } from "theme-ui"
import { Icon } from "react-icons-kit"
import { chevronDown } from "react-icons-kit/fa/chevronDown"
import { useState } from "react"

type Option = { key: string | number; value: string | number; node?: ReactNode }

type DropdownProps = {
  options?: Option[]
  defaultValue?: string
  showIcon?: boolean
  selectedItemStyle?: SxStyleProp

  /**
   * this prop for unselectable dropdown such list of navigations
   */
  // TODO read next image prop type
  children?: ReactNode
  outterStyle?: SxStyleProp
  menuSx?: SxStyleProp
  title?: ReactNode
  onChange: (value: any) => void
}

const Dropdown = ({
  children,
  options,
  title,
  outterStyle,
  defaultValue,
  showIcon = true,
  selectedItemStyle,
  menuSx,
  onChange,
}: DropdownProps) => {
  const defaultOption = options?.find((option) => option.value === defaultValue)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  const isBottom = wrapperRef.current && wrapperRef.current.offsetTop > window.innerHeight / 2
  return (
    <Box
      onMouseLeave={() => setOpen(false)}
      ref={wrapperRef}
      sx={{ position: "relative", zIndex: 1111, ...outterStyle }}
    >
      <Flex
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(true)}
        sx={{
          alignItems: "center",
          color: "primary",
          ...selectedItemStyle,
        }}
      >
        <Box sx={{ marginInlineEnd: 5 }}>
          {title || defaultOption?.node || defaultOption?.value}
        </Box>
        {showIcon && (
          <Box sx={{}}>
            <Icon icon={chevronDown} />
          </Box>
        )}
      </Flex>
      {open && (
        <Box
          sx={{
            paddingY: 2,
            position: "absolute",
            backgroundColor: "background",
            borderRadius: 15,
            bottom: isBottom ? 30 : undefined,
            boxShadow: "default",
            zIndex: 1111,
            ...menuSx,
          }}
        >
          {options
            ? options.map((option, index) => (
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
              ))
            : children}
        </Box>
      )}
    </Box>
  )
}

export default Dropdown
