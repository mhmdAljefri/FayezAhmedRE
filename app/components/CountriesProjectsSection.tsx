import React from "react"
import { Box, Flex, Heading } from "theme-ui"
import ShowMoreButton from "./ShowMoreButton"
import ProjectSlider from "./Sliders/ProjectSlider"
import Wrapper from "./Wrapper"

export default function CountriesProjectsSection({ countries }) {
  return (
    <Box
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "500px" /* Explained in the next section. */,
      }}
    >
      {countries.map(({ name, projects, id, isTurkey }) => (
        <Box key={id} sx={{ backgroundColor: isTurkey ? "light" : "background", py: 4 }}>
          <Wrapper>
            <Flex
              sx={{ justifyContent: ["space-between", null, "flex-start"], alignItems: "center" }}
            >
              <Heading sx={{ pt: 4, pb: 4, fontSize: [4, 5, 6], paddingInlineEnd: 20 }}>
                عرض مشاريع {name}
              </Heading>
              <ShowMoreButton href={`/countries/${id}/projects`} />
            </Flex>

            <ProjectSlider pagination={false} projects={projects} />
          </Wrapper>
        </Box>
      ))}
    </Box>
  )
}
