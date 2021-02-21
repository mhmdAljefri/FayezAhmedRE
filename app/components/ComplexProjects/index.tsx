import React from "react"
import { Box, Heading, Flex } from "theme-ui"
import Wrapper from "app/components/Wrapper"
import { dynamic } from "blitz"
import Skeleton from "react-loading-skeleton"
import LazyLoad from "react-lazyload"

const ComplexProjectsSlider = dynamic(() => import("./ComplexProjectsSlider"), {
  ssr: false,
  loading: () => (
    <div>
      <Flex>
        <div>
          <Skeleton />
          <Skeleton count={2} />
        </div>
        <div>
          <Skeleton height={200} />
          <Skeleton count={2} />
        </div>
      </Flex>
      <Skeleton height={300} />
    </div>
  ),
})

export default function ComplexProjects({ projects }) {
  return (
    <Box sx={{ backgroundColor: "light", py: 4 }}>
      <Wrapper
        sx={{
          minHeight: 400,

          ".upper--bullets": {
            top: [220, 280],
            maxHeight: 30,

            alignItems: "flex-start",
            justifyContent: "flex-end",
            ".swiper-pagination-bullet": {
              marginX: "8px",
            },
          },
        }}
      >
        <Heading sx={{ marginY: 5, fontSize: [5, 6] }}>مجمعات بارزة</Heading>

        <LazyLoad height={200} offset={200}>
          <ComplexProjectsSlider projects={projects} />
        </LazyLoad>
      </Wrapper>
    </Box>
  )
}
