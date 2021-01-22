import { Link } from "blitz"
import { Link as ThemeLink } from "theme-ui"
import React from "react"
import { Icon } from "react-icons-kit"
import { search } from "react-icons-kit/fa/search"

export default function SearchButton() {
  return (
    <Link passHref href="/search">
      <ThemeLink
        sx={{
          textDecoration: "none",
          fontWeight: 700,
          marginInlineEnd: [10, 15, 20],
          fontSize: [3],
        }}
      >
        <Icon size={26} icon={search} />
      </ThemeLink>
    </Link>
  )
}
