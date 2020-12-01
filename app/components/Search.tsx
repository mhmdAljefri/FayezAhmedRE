import useOnClickout from "app/hooks/useOnClickout"
import React, { useState } from "react"
import { Icon } from "react-icons-kit"
import { search } from "react-icons-kit/fa/search"
import { Box, Flex, Input } from "theme-ui"

type SearchProps = {}

const Search = (props: SearchProps) => {
  const [value, setValue] = useState<string>("")
  const { ref, open, setOpen } = useOnClickout()

  return (
    <Box
      ref={ref}
      onClick={() => setOpen(true)}
      sx={{
        justifyContent: "flex-end",
      }}
    >
      <Flex
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "text",
          color: "background",

          width: open ? 180 : 40,
          transitionDuration: "0.4s",
          transitionProperty: "width",
          transitionTimingFunction: "ease-in-out",
          height: 40,
          borderRadius: 40,
          alignItems: "center",
        }}
      >
        <Icon
          style={{ marginTop: -5, position: "absolute", zIndex: 1, width: 40, textAlign: "center" }}
          size={20}
          icon={search}
        />
        <Input
          value={value}
          onChange={(e): void => setValue(e?.target.value)}
          onBlur={() => setValue("")}
          sx={{
            position: "absolute",
            zIndex: 0,
            border: 0,
            top: -5,
            bottom: -5,
            right: -2,
            left: -2,
            paddingY: 2,
            backgroundColor: "transparent",
            boxShadow: "none",
            paddingInlineStart: 42,
          }}
        />
      </Flex>
    </Box>
  )
}

export default Search
