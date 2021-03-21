import React from "react"

import { CopyToClipboard as ReactCopy } from "react-copy-to-clipboard"
import IconWithText from "app/components/IconWithText"

import { copy } from "react-icons-kit/fa/copy"
import { Link } from "theme-ui"

export default function CopyToClipboard({ onCopy = () => {}, text }) {
  return (
    <ReactCopy text={text} onCopy={onCopy}>
      <Link as="span" sx={{ cursor: "pointer" }}>
        <IconWithText color="heading" icon={copy} text="نسخ للحافظة" />
      </Link>
    </ReactCopy>
  )
}
