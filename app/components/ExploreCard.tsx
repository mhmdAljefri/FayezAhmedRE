import { Link } from "blitz"
import React from "react"
import { Box, Flex } from "theme-ui"
import Image from "./Image"

export default function ExploreCard({ href, title, image }) {
  return (
    <Link passHref href={href}>
      <Box
        as="a"
        sx={{
          display: "block",
          height: [150, null, 200, 250],
          borderRadius: "lg",
          overflow: "hidden",
          position: "relative",
          boxShadow: "default",
        }}
      >
        <Image
          sx={{ objectFit: "cover", width: "100%", minHeight: "100%" }}
          src={image}
          alt={title}
        />
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            cursor: "pointer",
            left: 0,
            right: 0,
            bottom: 0,
            textAlign: "center",
            padding: 2,
            backgroundColor: "primary",
            color: "white",
            fontSize: 3,
            fontWeight: 700,
            opacity: 0,
            transition: "all 500ms linear",
            ":hover": {
              opacity: 1,
            },
          }}
        >
          {title}
        </Flex>
      </Box>
    </Link>
  )
}
