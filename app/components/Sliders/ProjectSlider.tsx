import React from "react"
import { Box } from "theme-ui"
import { Swiper, SwiperSlide } from "./Swiper"
import ProjectCard from "../Cards/ProjectCard"
import { Project, RoomWithPrice } from "@prisma/client"
import { Link } from "blitz"

type ProjectWithRooms = Project & { roomsWithPrices: RoomWithPrice[] }
type Props = {
  projects: ProjectWithRooms[]
}
export default function ProjectSlider({ projects }: Props) {
  return (
    <Swiper
      loop
      pagination={{ clickable: true }}
      autoHeight
      spaceBetween={20}
      breakpoints={{
        1200: {
          pagination: false,
          slidesPerView: projects.length >= 3 ? 3 : projects.length,
        },
        900: {
          pagination: false,
          slidesPerView: projects.length >= 2 ? 2 : projects.length,
        },
      }}
    >
      {projects.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 5, px: 2 }}>
          لاتوجد مشاريع بحسب الفلتر بامكانك التنقل الى صفحة{" "}
          <Link href="/countries/2/projects">
            <a>المشاريع</a>
          </Link>{" "}
          لعرض كل الخيارات
        </Box>
      ) : (
        projects.map((project) => (
          <SwiperSlide key={project.id} virtualIndex={project.id}>
            <Box sx={{ mb: [4, 4, 0] }}>
              <ProjectCard {...project} roomsWithPrices={project.roomsWithPrices} />
            </Box>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  )
}
