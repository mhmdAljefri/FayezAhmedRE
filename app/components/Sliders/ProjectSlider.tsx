import React from "react"
import { Box } from "theme-ui"
import { Swiper, SwiperSlide } from "./Swiper"
import ProjectCard from "../Cards/ProjectCard"

export default function ProjectSlider({ projects }) {
  return (
    <Swiper
      loop
      pagination={{ clickable: true }}
      autoHeight
      spaceBetween={20}
      breakpoints={{
        1200: {
          pagination: false,
          slidesPerView: 3,
        },
        900: {
          pagination: false,
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
