import React from "react"
import { Tooltip } from "react-tippy"
import { Text } from "theme-ui"
export default function Tippy({ children }) {
  return (
    <Tooltip
      html={<Text>قريبا سيتوفر</Text>}
      position="top"
      trigger="click"
      animation="shift"
      arrowSize="big"
      duration={500}
    >
      {children}
    </Tooltip>
  )
}
