import * as React from "react"
import { SliderItem, GetHandleProps, GetTrackProps } from "react-compound-slider"
import { Box } from "theme-ui"

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface IHandleProps {
  domain: number[]
  handle: SliderItem
  getHandleProps: GetHandleProps
}

export const Handle: React.SFC<IHandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
}) => (
  <Box
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    sx={{
      left: `${percent}%`,
      position: "absolute",
      marginLeft: "-11px",
      marginTop: "-6px",
      zIndex: 2,
      width: 24,
      height: 24,
      cursor: "pointer",
      borderRadius: "50%",
      boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
      backgroundColor: "primary",
      "&>div": {
        opacity: 0,
      },
      ":hover": {
        "&>div": {
          opacity: 1,
        },
      },
    }}
    {...getHandleProps(id)}
  >
    <Box
      sx={{
        position: "absolute",
        left: `${percent}%`,
        padding: 2,
        borderRadius: "default",
        boxShadow: "sm",
        backgroundColor: "background",
        display: "inline-block",
        marginTop: -50,
      }}
    >
      {norlizer(value)}
    </Box>
  </Box>
)

// *******************************************************
// TRACK COMPONENT
// *******************************************************
interface ITrackProps {
  source: SliderItem
  target: SliderItem
  getTrackProps: GetTrackProps
}

export const Track: React.SFC<ITrackProps> = ({ source, target, getTrackProps }) => (
  <Box
    sx={{
      position: "absolute",
      height: 14,
      zIndex: 1,
      backgroundColor: "light",
      borderRadius: 7,
      cursor: "pointer",
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
)

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface ITickProps {
  key: string
  tick: SliderItem
  count: number
}

const norlizer = (num: number) => {
  let norlizedNumber: string = num.toString()

  if (num >= 1000000) norlizedNumber = num / 1000000 + "M"
  else if (num >= 1000) norlizedNumber = num / 1000000 + "K"
  return norlizedNumber
}
export const Tick: React.FC<ITickProps> = ({ tick, count }) => (
  <Box>
    <Box
      sx={{
        position: "absolute",
        marginTop: 14,
        width: 1,
        height: 5,
        backgroundColor: "rgb(200,200,200)",
        left: `${tick.percent}%`,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        marginTop: 22,
        fontSize: 10,
        textAlign: "center",
        fontWeight: 700,
        color: "background",
        marginLeft: `${-(100 / count) / 2}%`,
        width: `${100 / count}%`,
        left: `${tick.percent}%`,
      }}
    >
      {norlizer(tick.value)}
    </Box>
  </Box>
)
