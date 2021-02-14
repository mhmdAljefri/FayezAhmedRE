import { ProjectCard } from "app/layouts/ProjectsList"
import React from "react"
import { Box } from "theme-ui"
import { Swiper, SwiperSlide } from "./Swiper"

export default function ProjectSlider({ projects }) {
  return (
    <Swiper
      loop
      pagination={{ clickable: true }}
      autoHeight
      slidesPerView={3}
      breakpoints={{
        1200: {
          slidesPerView: 3,
          loop: false,
        },
        1100: {
          slidesPerView: 2,
          loop: false,
        },
        900: {
          slidesPerView: 1,
        },
      }}
    >
      {projects.map((project) => (
        <SwiperSlide key={project.id} virtualIndex={project.id}>
          <Box sx={{ mb: 5 }}>
            <ProjectCard {...project} roomWithPrices={[...project.roomsWithPrices]} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
