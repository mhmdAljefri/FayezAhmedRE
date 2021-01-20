import { ProjectCard } from "app/layouts/ProjectsList"
import React from "react"
import { Box, Flex, Heading } from "theme-ui"
import ShowMoreButton from "./ShowMoreButton"
import SlickSlider from "./Sliders/SlickSlider"
import Wrapper from "./Wrapper"

export default function CountriesProjectsSection({ countries }) {
  return (
    <Box>
      {countries.map(({ name, projects, id, isTurkey }) => (
        <Box key={id} sx={{ backgroundColor: isTurkey ? "light" : "background", py: 4 }}>
          <Wrapper>
            <Flex
              sx={{ justifyContent: ["space-between", null, "flex-start"], alignItems: "center" }}
            >
              <Heading sx={{ pt: 4, pb: 4, fontSize: [4, 5, 6], paddingInlineEnd: 20 }}>
                عرض مشاريع {name}
              </Heading>
              <ShowMoreButton href={`/countries/${id}`} />
            </Flex>

            <SlickSlider
              arrows={false}
              infinite
              slidesToShow={3}
              slidesToScroll={1}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    rtl: true,
                  },
                },
                {
                  breakpoint: 1100,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    rtl: true,
                  },
                },
                {
                  breakpoint: 900,
                  settings: {
                    centerMode: false,
                    vertical: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rtl: true,
                  },
                },
              ]}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  roomWithPrices={[...project.roomsWithPrices]}
                />
              ))}
            </SlickSlider>
          </Wrapper>
        </Box>
      ))}
    </Box>
  )
}
