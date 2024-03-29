import React, { ReactNode } from "react"
import { Flex, Heading, Text, Box } from "theme-ui"

type OfferIconTextProps = {
  icon: ReactNode
  heading: string
  text?: ReactNode
  small?: boolean
  keepWord?: boolean
}
const OfferIconText = ({
  keepWord = false,
  small = false,
  icon,
  heading,
  text,
}: OfferIconTextProps) =>
  !!text ? (
    <Flex
      sx={{ flexDirection: small ? "column" : "row", alignItems: small ? "center" : undefined }}
    >
      {icon}
      <Box sx={{ px: 2, mt: 1 }}>
        {!small && <Heading sx={{ fontSize: 3 }}>{heading}</Heading>}
        <Text
          sx={{ textAlign: small ? "center" : "start", whiteSpace: keepWord ? "nowrap" : "normal" }}
        >
          {text}
        </Text>
      </Box>
    </Flex>
  ) : null

export default OfferIconText
