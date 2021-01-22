import { Link as ThemeLink } from "theme-ui"
import React from "react"
import { Icon } from "react-icons-kit"
import { whatsapp } from "react-icons-kit/fa/whatsapp"
import { WHATSAPP_NUMBER } from "app/constants"

export default function WhatsappButton() {
  return (
    <ThemeLink
      target="_blank"
      rel="noopener noreferrer"
      href={"https://api.whatsapp.com/send?phone=" + WHATSAPP_NUMBER}
      sx={{
        textDecoration: "none",
        fontWeight: 700,
        marginInlineEnd: [10, 15, 20],
        fontSize: [3],
      }}
    >
      <Icon size={30} icon={whatsapp} />
    </ThemeLink>
  )
}
