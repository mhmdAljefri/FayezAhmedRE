import { Link } from "blitz"
import React from "react"
import { Box, Grid, Heading, Text } from "theme-ui"
import OptmizationImage from "../OptmizationImage"

export default function MostViewd({ project }) {
  return (
    <Grid
      columns={3}
      sx={{
        overflow: "hidden",
        position: "relative",
        border: "1px solid #eee",
        borderColor: "primary",
        borderRadius: "sm",
        // flexWrap: ["nowrap", "wrap"],
        flexDirection: ["row", "column"],
        backgroundColor: "background",
      }}
      key={project.name}
    >
      <Link passHref href={`/countries/${project.countryId}/projects/${project.id}`}>
        <a>
          <OptmizationImage layout="fill" objectFit="cover" src={project.image} />
        </a>
      </Link>
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
        <Link passHref href={`/countries/${project.countryId}/projects/${project.id}`}>
          <a style={{ textDecoration: "none" }}>
            <Heading sx={{ fontSize: 3, color: "primary" }}>{project.name}</Heading>
          </a>
        </Link>

        <Link passHref href={`/countries/${project.countryId}/projects/${project.id}`}>
          <a style={{ textDecoration: "none" }}>
            <Text sx={{ fontSize: [1], color: "primary" }}>{project.subTitle}</Text>
          </a>
        </Link>
        <Text as="small">{project.views} مشاهدة</Text>
      </Box>
    </Grid>
  )
}
