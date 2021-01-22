/** @jsx jsx */
import { Box, Flex, jsx, SxStyleProp } from "theme-ui"
import { useState, useRef, useEffect, Fragment, ReactNode } from "react"
import { arrowLeft } from "react-icons-kit/feather/arrowLeft"
import { arrowRight } from "react-icons-kit/feather/arrowRight"
import { Icon } from "react-icons-kit"
import useInterval from "app/hooks/useInterval"

const defaultProps = {
  duration: 5000,
  autoplay: false,
  nextArrow: null,
  prevArrow: null,
  nextArrowStyle: {},
  prevArrowStyle: {},
  renderDots: () => null,
}

type MySliderProps = {
  autoplay: boolean
  duration: number
  nextArrow: ReactNode | null
  prevArrow: ReactNode | null
  nextArrowStyle: SxStyleProp
  prevArrowStyle: SxStyleProp
  activeSlideStyle?: SxStyleProp
  children: ReactNode[]
  slideStyle?: SxStyleProp
  renderDots: (x: { index: number; active: boolean; onClick: () => void }[]) => void
}

export default function MySlider({
  children,
  slideStyle,
  nextArrow,
  nextArrowStyle,
  prevArrow,
  prevArrowStyle,
  activeSlideStyle,
  autoplay,
  duration,
  renderDots,
}: MySliderProps) {
  const [cindex, setCindex] = useState(0)
  const [offsetHeight, setOffsetHeight] = useState<number>()
  const [reset, setReset] = useState(false)
  const wrapper = useRef<HTMLDivElement | null>(null)
  const list = children
  const nextIndex = cindex + 1 >= children.length ? 0 : cindex + 1
  const prevIndex = cindex - 1 >= 0 ? cindex - 1 : children.length - 1
  const currentSlide = list[cindex]

  const dots = renderDots(
    [...Array(list.length)].map((_, index) => ({
      index,
      active: index === cindex,
      setIndex: setCindex,
      onClick: () => {
        setCindex(index)
        setReset(true)
      },
    }))
  )

  const isSSR = () => typeof window === "undefined"

  const handleNext = () => setCindex(nextIndex)

  const handlePrev = () => setCindex(prevIndex)

  const handlePrevPress = () => {
    handlePrev()
    setReset(true)
  }
  const handleNextPress = () => {
    handleNext()
    setReset(true)
  }

  useInterval(() => autoplay && handleNext(), duration, reset)

  useEffect(() => {
    const handleResize = () => {
      const hieght = wrapper?.current?.offsetHeight
      hieght && hieght !== offsetHeight && setOffsetHeight(hieght)
    }

    if (!offsetHeight) handleResize()
    if (reset) setReset(false)
    if (!isSSR()) {
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [offsetHeight, reset])

  return (
    <Fragment>
      <div ref={wrapper} style={{ position: "relative", overflow: "hidden" }}>
        <Box sx={{ ...slideStyle, ...activeSlideStyle }}>{currentSlide}</Box>
        {offsetHeight ? (
          <Flex
            style={{
              position: "absolute",
              zIndex: 99,
              direction: "rtl",
              left: 0,
              right: 0,
              top: `${offsetHeight / 2 - 15}px`,
            }}
            sx={{ justifyContent: "space-between" }}
          >
            <Box
              sx={prevArrowStyle}
              role="button"
              aria-label="prev arrow"
              tabIndex={0}
              onKeyPress={handlePrevPress}
              onClick={handlePrevPress}
            >
              {prevArrow || <Icon size={27} icon={arrowRight} />}
            </Box>
            <Box
              sx={nextArrowStyle}
              role="button"
              araia-label="next arrow"
              tabIndex={0}
              onKeyPress={handleNextPress}
              onClick={handleNextPress}
            >
              {nextArrow || <Icon size={27} icon={arrowLeft} />}
            </Box>
          </Flex>
        ) : null}
        {dots}
      </div>
    </Fragment>
  )
}

MySlider.defaultProps = defaultProps
