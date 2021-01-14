import React, { ReactNode } from "react"
import { useSwipeable } from "react-swipeable"
import { Box } from "theme-ui"

const NEXT = "NEXT"
const PREV = "PREV"
const STOP_SLIDING = "STOP_SLIDING"
const initialState = { position: 0, sliding: false, dir: NEXT }

type types = "NEXT" | "PREV" | "STOP_SLIDING" | "reset"
function reducer(state, { type, numItems }: { type: types; numItems: number }) {
  switch (type) {
    case "reset":
      return initialState
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        position: state.position === 0 ? numItems - 1 : state.position - 1,
      }
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        position: state.position === numItems - 1 ? 0 : state.position + 1,
      }
    case STOP_SLIDING:
      return { ...state, sliding: false }
    default:
      return state
  }
}

type Props = {
  children: ReactNode[]
}

export default function SwipableSlider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const numItems = React.Children.count(children)
  const slide = (dir) => {
    console.log({ dir })
    dispatch({ type: dir, numItems })
    setTimeout(() => {
      dispatch({ type: STOP_SLIDING, numItems })
    }, 50)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return (
    <div {...handlers}>
      {/* <Flex sx={{ overflow: "hidden" }}>{children}</Flex> */}

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: `${state.sliding ? "none" : "transform 1s ease"}`,
            transform: `${() => {
              if (!state.sliding) return "translateX(calc(-80% - 20px))"
              if (state.dir === PREV) return "translateX(calc(2 * (-80% - 20px)))"
              return "translateX(0%)"
            }}`,
          }}
        >
          {children}
        </Box>
      </Box>
    </div>
  )
}
