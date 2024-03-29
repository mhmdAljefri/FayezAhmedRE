import { FurnishCategory } from "@prisma/client"
import { Link } from "blitz"
import React from "react"
import { Box, Text, Link as ThemeLink } from "theme-ui"
import Image from "./Image"

type furnishCategoryCardProps = Pick<FurnishCategory, "name" | "image">
export default function FurnishCategoryCard(furnishCategory: furnishCategoryCardProps) {
  return (
    <Box
      key={furnishCategory.name}
      sx={{
        borderRadius: "lg",
        overflow: "hidden",
        direction: "rtl",
        boxShadow: "default",
      }}
    >
      <Link passHref href={`/furniture/${furnishCategory.name}`}>
        <ThemeLink sx={{ textDecoration: "none" }}>
          <Image src={furnishCategory.image} alt={furnishCategory.name} />
          <Text sx={{ paddingY: 4, paddingX: 3, fontSize: [3, 4], fontWeight: 700 }}>
            {furnishCategory.name}
          </Text>
        </ThemeLink>
      </Link>
    </Box>
  )
}
