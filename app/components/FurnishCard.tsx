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
          <Box sx={{ height: 400 }}>
            <Image src={furnish.image} sx={{ objectFit: "cover" }} alt={furnish.name} />
          </Box>
          <Text
            sx={{
              paddingY: 5,
              paddingX: 3,
              backgroundColor: "primary",
              color: "white",
              fontWeight: 700,
              fontSize: 5,
            }}
          >
            {furnish.name}
          </Text>
        </ThemeLink>
      </Link>
    </Box>
  )
}
