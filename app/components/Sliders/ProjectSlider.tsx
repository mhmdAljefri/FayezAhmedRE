import { ProjectCard } from "app/layouts/ProjectsList"
import React from "react"
import { Box } from "theme-ui"
import { Swiper, SwiperSlide } from "./Swiper"

export default function ProjectSlider({ projects, pagination = false }) {
  return (
    <Swiper
      loop
      pagination={pagination ? { clickable: true } : false}
      autoHeight
      spaceBetween={20}
      breakpoints={{
        1200: {
          slidesPerView: 3,
        },
        900: {
          slidesPerView: 2,
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
