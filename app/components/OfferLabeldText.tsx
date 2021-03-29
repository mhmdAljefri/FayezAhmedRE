import React, { ReactNode } from "react"
import { Icon, IconProp } from "react-icons-kit"
import { Flex, Heading, Text, Box } from "theme-ui"

type OfferIconTextProps = {
  icon: IconProp["icon"]
  heading: string
  text?: ReactNode
  small?: boolean
}
const OfferIconText = ({ small = false, icon, heading, text }: OfferIconTextProps) =>
  !!text ? (
    <Flex
      sx={{ flexDirection: small ? "column" : "row", alignItems: small ? "center" : undefined }}
    >
      <Icon size={24} icon={icon} />
      <Box sx={{ px: 2 }}>
        {!small && <Heading sx={{ fontSize: 3 }}>{heading}</Heading>}
        <Text>{text}</Text>
      </Box>
    </Flex>
  ) : (
    <div />
  )

export default OfferIconText
