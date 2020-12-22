import React, { ReactElement, ReactNode } from "react"
import ReactSlick from "react-slick"

const defaultProps = {
  rtl: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  centerMode: false,
  autoplay: false,
  initialSlide: 0,
  className: "slick-with-padding",
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

type SlickSliderProps = {
  children: ReactNode[]
  prevArrow?: ReactElement
  nextArrow?: ReactElement
  customPaging?: (index: number) => any
} & typeof defaultProps

export default function SlickSlider({
  children,
  prevArrow,
  nextArrow,
  ...props
}: SlickSliderProps) {
  return (
    <ReactSlick prevArrow={prevArrow} nextArrow={nextArrow} {...props}>
      {children}
    </ReactSlick>
  )
}

SlickSlider.defaultProps = defaultProps
