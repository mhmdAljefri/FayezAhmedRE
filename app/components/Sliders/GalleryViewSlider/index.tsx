import Image from "app/components/Image"
import { Box, Heading } from "theme-ui"
import { ArrowLeft, ArrowRight } from "../../Arrows/ProjectDetailsArrows"
import Wrapper from "../../Wrapper"
import { SwiperSlide, Swiper } from "../Swiper"

export default function GalleryViewSlider({ gallery }) {
  return (
    <>
      <Box sx={{ marginTop: -5, paddingTop: 6, paddingBottom: 5, backgroundColor: "dark" }}>
        <Wrapper
          sx={{
            display: "flex",
            justifyContent: ["space-between", null, "flex-start"],
            alignItems: "center",
          }}
        >
          <Heading
            sx={{ color: "white", marginBottom: 1, fontSize: [5, null, 6], paddingInlineEnd: 20 }}
          >
            المعرض
          </Heading>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              width: 150,
              pb: 4,
            }}
          >
            <ArrowRight className="GalleryArrowRight" />
            <ArrowLeft className="GalleryArrowLeft" />
          </Box>
        </Wrapper>
      </Box>

      <Wrapper
        sx={{
          marginTop: -5,
          ".swiper-slide": {
            width: "auto",
            marginInlineEnd: 10,
          },
        }}
      >
        <Swiper
          lazy
          navigation={{
            nextEl: ".GalleryArrowRight",
            prevEl: ".GalleryArrowLeft",
          }}
          slidesPerView="auto"
        >
          {gallery.map((item, index) => (
            <SwiperSlide virtualIndex={index} key={item + "_" + index}>
              <Image
                key={item + "_" + index}
                src={item}
                sx={{
                  borderRadius: 15,
                  width: "auto",
                  height: [200, 200, 250, 300],
                  objectFit: "contain",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
    </>
  )
}
