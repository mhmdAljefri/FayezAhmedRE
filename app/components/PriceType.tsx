import React from "react"
import { Avatar, Flex } from "theme-ui"
import Dropdown from "./Dropdown"

type PriceTypeProps = {}

const PriceType = (props: PriceTypeProps) => {
  return (
    <Dropdown
      defaultValue="1"
      options={[
        {
          key: "1",
          value: "1",
          node: (
            <Flex key="1">
              <Avatar sx={{ boxShadow: "card", marginInlineEnd: 10 }} size={30} src="/logo.png" />{" "}
              UAE
            </Flex>
          ),
        },
        {
          key: "2",
          value: "2",
          node: (
            <Flex key={"2"}>
              <Avatar sx={{ boxShadow: "card", marginInlineEnd: 10 }} size={30} src="/logo.png" />{" "}
              USA
            </Flex>
          ),
        },
      ]}
    />
  )
}

export default PriceType
