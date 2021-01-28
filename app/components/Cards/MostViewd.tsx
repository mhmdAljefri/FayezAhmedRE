import { Link } from "blitz"
import React from "react"
import { Box, Grid, Heading, Text } from "theme-ui"
import { makeS3Url } from "app/utils/aws"

export default function MostViewd({ project }) {
  const bgImageSecureUrl = makeS3Url(project.image)

  return (
    <Grid
      columns={3}
      sx={{
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
          <Box
            sx={{
              overflow: "hidden",
              maxWidth: ["auto"],
              height: "100%",
              backgroundPosition: "center",
              backgroundImage: `url(${bgImageSecureUrl})`,
              backgroundSize: "cover",
            }}
          ></Box>
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
