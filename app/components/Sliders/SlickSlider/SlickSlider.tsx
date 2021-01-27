import React, { ReactElement, ReactNode } from "react"
import ReactSlick from "react-slick"

const noSizeDefaultProps = {
  rtl: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  centerMode: false,
  arrows: false,
  dots: true,
  pauseOnHover: true,
  autoplay: false,
  initialSlide: 0,
  infinite: false,
  className: "slick-with-padding",
}
const defaultProps: typeof noSizeDefaultProps & {
  responsive: {
    breakpoint: number
    settings: {
      variableWidth?: boolean
      centerMode?: boolean
      vertical?: boolean
      infinite?: boolean
      initialSlide?: number
      slidesToShow?: number
      slidesToScroll?: number
      rtl?: boolean
      dots?: boolean
    }
  }[]
} = {
  ...noSizeDefaultProps,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        rtl: true,
      },
    },
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        rtl: true,
      },
    },
    {
      breakpoint: 580,
      settings: {
        centerMode: true,
        vertical: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: true,
      },
    },
  ],
}

type SlickSliderProps = {
  children: ReactNode[]
  prevArrow?: ReactElement
  nextArrow?: ReactElement
  variableWidth?: boolean
  adaptiveHeight?: boolean
  arrows?: boolean
  customPaging?: (index: number) => any
} & typeof defaultProps

export default function SlickSlider({
  children,
  prevArrow,
  nextArrow,
  variableWidth,
  arrows,
  dots,
  ...props
}: SlickSliderProps) {
  const responsive = variableWidth
    ? props.responsive.map(({ breakpoint, settings }) => ({
        breakpoint,
        settings: { dots, variableWidth, arrows, ...settings },
      }))
    : props.responsive
  return (
    <ReactSlick
      {...props}
      variableWidth={variableWidth}
      responsive={responsive}
      arrows={arrows}
      prevArrow={prevArrow}
      dots={dots}
      nextArrow={nextArrow}
    >
      {children}
    </ReactSlick>
  )
}

SlickSlider.defaultProps = defaultProps
