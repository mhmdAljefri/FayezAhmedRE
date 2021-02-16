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
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
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
