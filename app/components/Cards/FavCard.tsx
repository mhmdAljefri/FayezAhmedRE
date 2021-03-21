import { Link } from "blitz"
import React from "react"
import { Box, Grid, Heading, Text } from "theme-ui"
import OptmizationImage from "../OptmizationImage"

type Props = {
  name: string
  href: string
  subTitle: string
  image?: string
}
export default function FavCard({ name, href, image, subTitle }: Props) {
  return (
    <Grid
      columns={3}
      sx={{
        marginBottom: 3,
        overflow: "hidden",
        position: "relative",
        border: "1px solid #eee",
        borderColor: "primary",
        borderRadius: "sm",
        // flexWrap: ["nowrap", "wrap"],
        flexDirection: ["row", "column"],
        backgroundColor: "background",
      }}
      key={name}
    >
      {image ? (
        <Link passHref href={href}>
          <a>
            <OptmizationImage layout="fill" objectFit="cover" src={image} />
          </a>
        </Link>
      ) : (
        <div />
      )}
      <Box
        sx={{
          gridColumn: "span 2",
          p: [2, 3],
          flex: 1,
          position: "relative",
          zIndex: 1,
          backgroundColor: "background",
        }}
      >
        <Link passHref href={href}>
          <a style={{ textDecoration: "none" }}>
            <Heading sx={{ fontSize: 3, color: "primary" }}>{name}</Heading>
          </a>
        </Link>

        <Link passHref href={href}>
          <a style={{ textDecoration: "none" }}>
            <Text sx={{ fontSize: [1], color: "primary" }}>{subTitle}</Text>
          </a>
        </Link>
      </Box>
    </Grid>
  )
}
