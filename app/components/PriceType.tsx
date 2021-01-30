import usePriceType from "app/hooks/usePriceType"
import React from "react"
import { Avatar, Flex } from "theme-ui"
import Dropdown from "./Dropdown"

type PriceTypeProps = {}

export const prices = [
  ["price", "/icons/united-states.png", "دولار امريكي", "$"],
  ["priceQatar", "/icons/qatar.png", "ريال قطري", "QAR"],
  ["priceTurkey", "/icons/turkey.png", "ليرة تركية", "LT"],
  ["priceKSA", "/icons/saudi-arabia.png", "ريال سعودي", "SAR"],
  ["priceKuwait", "/icons/kuwait.png", "دينار كويتي", "KWD"],
  ["priceUAE", "/icons/united-arab-emirates.png", "درهم إمراتي", "UAD"],
  ["priceOman", "/icons/oman.png", "ريال عماني", "OMR"],
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
          <Flex sx={{ alignItems: "center" }} key={price[0]}>
            <Avatar
              sx={{ boxShadow: "card", marginInlineEnd: 10, height: 30, width: 30 }}
              src={price[1]}
            />
            <p
              style={{
                maxWidth: 130,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {price[2]}
            </p>
          </Flex>
        ),
      }))}
    />
  )
}

export default PriceType
