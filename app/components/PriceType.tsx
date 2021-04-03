import usePriceType from "app/hooks/usePriceType"
import React from "react"
import { Box, Flex } from "theme-ui"
import Dropdown from "./Dropdown"
import OptmizationImage from "./OptmizationImage"

type PriceTypeProps = {
  color?: string
}

export const prices = [
  ["price", "/icons/united-states.png", "دولار امريكي", "$"],
  ["priceQatar", "/icons/qatar.png", "ريال قطري", "QAR"],
  ["priceTurkey", "/icons/turkey.png", "ليرة تركية", "LT"],
  ["priceKSA", "/icons/saudi-arabia.png", "ريال سعودي", "SAR"],
  ["priceKuwait", "/icons/kuwait.png", "دينار كويتي", "KWD"],
  ["priceUAE", "/icons/united-arab-emirates.png", "درهم إمراتي", "UAD"],
  ["priceOman", "/icons/oman.png", "ريال عماني", "OMR"],
]

const PriceType = ({ color }: PriceTypeProps) => {
  const { priceType, changePriceType } = usePriceType()

  return (
    <Dropdown
      defaultValue={priceType}
      selectedItemStyle={{ color }}
      onChange={({ value }) => changePriceType(value)}
      options={prices.map((price) => ({
        key: price[0],
        value: price[0],
        node: (
          <Flex sx={{ alignItems: "center", minWidth: 100 }} key={price[0]}>
            <Box
              sx={{
                boxShadow: "card",
                borderRadius: 555,
                overflow: "hidden",
                position: "relative",
                marginInlineEnd: 10,
                height: 30,
                minHeight: 30,
                width: 30,
                minWidth: 30,
              }}
            >
              <OptmizationImage
                localImage
                layout="fixed"
                width={30}
                height={30}
                src={price[1]}
                alt={price[2]}
              />
            </Box>
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
