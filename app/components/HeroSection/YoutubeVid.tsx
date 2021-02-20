import React from "react"
import { Box } from "theme-ui"

export default function YoutubeVid({ secureVideoUrl }) {
  return (
    <Box
      sx={{
        position: "relative",
        ":after": {
          position: "absolute",
          content: '""',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          backgroundColor: "#000",
          opacity: 0.5,
        },
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{ height: "100%", width: "100%", minHeight: "100vh", objectFit: "cover" }}
        controls={false}
      >
        <track kind="captions" />
        <source src={secureVideoUrl} type="video/mp4" />
        <source src={secureVideoUrl} type="video/ogg" />
        <source src={secureVideoUrl} type="video/webm" />
        <object data={secureVideoUrl}>
          <embed src={secureVideoUrl} />
        </object>
      </video>
    </Box>
  )
}
