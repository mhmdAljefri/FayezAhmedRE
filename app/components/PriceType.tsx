import usePriceType from "app/hooks/usePriceType"
import React from "react"
import { Avatar, Flex } from "theme-ui"
import Dropdown from "./Dropdown"

type PriceTypeProps = {}

const prices = [
  ["price", "", "دولار امريكي"],
  ["priceQatar", "", "ريال قطري"],
  ["priceTurkey", "", "ليرة تركية"],
  ["priceKSA", "", "ريال سعودي"],
  ["priceKuwait", "", "دينار كويتي"],
  ["priceUAE", "", "درهم إمراتي"],
  ["priceOman", "", "ريال عماني"],
]

const PriceType = (props: PriceTypeProps) => {
  const { priceType, changePriceType } = usePriceType()

  return (
    <Dropdown
      defaultValue={priceType}
      onChange={({ value }) => changePriceType(value)}
      options={prices.map((price) => ({
        key: price[0],
        value: price[0],
        node: (
          <Flex sx={{ width: 150 }} key={price[0]}>
            <Avatar sx={{ boxShadow: "card", marginInlineEnd: 10 }} size={30} src="/logo.png" />{" "}
            {price[2]}
          </Flex>
        ),
      }))}
    />
  )
}

export default PriceType
