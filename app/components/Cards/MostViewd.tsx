import { Link } from "blitz"
import React from "react"
import { Box, Grid, Heading, Text } from "theme-ui"
import Image from "../Image"

export default function MostViewd({ project }) {
  return (
    <Grid
      columns={3}
      sx={{
        maxHeight: [130, null, 150],
        overflow: "hidden",
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
          <Image
            sx={{
              height: [130, null, 150],
              overflow: "hidden",
              maxWidth: ["auto"],
              objectFit: "cover",
            }}
            src={project.image}
          />
        </a>
      </Link>
      <Box sx={{ gridColumn: "span 2", p: [2, 3], flex: 1 }}>
        <Link passHref href={`/countries/${project.countryId}/projects/${project.id}`}>
          <a style={{ textDecoration: "none" }}>
            <Heading sx={{ fontSize: 2, color: "primary" }}>{project.name}</Heading>
          </a>
        </Link>

        <Link passHref href={`/countries/${project.countryId}/projects/${project.id}`}>
          <a style={{ textDecoration: "none" }}>
            <Text sx={{ fontSize: [0, 1], color: "primary" }}>{project.subTitle}</Text>
          </a>
        </Link>
        <Text as="small">{project.views} مشاهدة</Text>
      </Box>
    </Grid>
  )
}
