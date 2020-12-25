import { Furnish } from "@prisma/client"
import { Link, useRouter } from "blitz"
import React from "react"
import { Box, Image, Text, Link as ThemeLink } from "theme-ui"

type furnishCardProps = Pick<Furnish, "name" | "image">
export default function FurnishCard(furnish: furnishCardProps) {
  const { asPath } = useRouter()
  return (
    <Box
      key={furnish.name}
      sx={{
        borderRadius: "lg",
        margin: 3,
        overflow: "hidden",
        boxShadow: "default",
      }}
    >
      <Link passHref href={`${asPath}/${furnish.name}`}>
        <ThemeLink sx={{ textDecoration: "none" }}>
          <Box sx={{ height: 400, overflow: "hidden" }}>
            <Image
              src={furnish.image}
              sx={{ width: "100%", objectFit: "cover" }}
              alt={furnish.name}
            />
          </Box>
          <Text
            sx={{
              paddingY: 4,
              paddingX: 3,
              backgroundColor: "primary",
              color: "white",
              fontWeight: 700,
              fontSize: [3, 4],
            }}
          >
            {furnish.name}
          </Text>
        </ThemeLink>
      </Link>
    </Box>
  )
}
