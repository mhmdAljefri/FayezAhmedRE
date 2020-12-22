import useOnClickout from "app/hooks/useOnClickout"
import useTimeout from "app/hooks/useTimeout"
import { useRouter } from "blitz"
import React, { useState } from "react"
import { Icon } from "react-icons-kit"
import { search } from "react-icons-kit/fa/search"
import { Box, Flex, Input } from "theme-ui"

type SearchProps = {}

const Search = (props: SearchProps) => {
  const [value, setValue] = useState<string>("")
  const { push } = useRouter()
  const { ref, open, setOpen } = useOnClickout()

  useTimeout(() => push("/search?q=" + value), 4000, value)

  return (
    <Box
      ref={ref}
      onClick={() => setOpen(true)}
      sx={{
        display: ["none", "initial"],
        justifyContent: "flex-end",
      }}
    >
      <Flex
        sx={{
          position: open ? "fixed" : "relative",
          left: open ? 50 : undefined,
          right: open ? 50 : undefined,
          top: open ? 50 : undefined,
          zIndex: open ? 50 : undefined,
          overflow: "hidden",
          backgroundColor: "text",
          color: "background",

          width: open ? undefined : 40,
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
