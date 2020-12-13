import React from "react"
import ReactGoogleMap, { Props as MapProps } from "google-map-react"
import { Box } from "theme-ui"

const YOUR_API_KEY = "AIzaSyA52m6D9EzXX3xjYk-8RYs-v-S7ht2ihqk"
const defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
}

type GoogleMapProps = MapProps & typeof defaultProps

const Marker = ({ lat, lng }: { lat?: number; lng?: number }) => (
  <Box sx={{ width: 25, height: 25, borderRadius: 25, backgroundColor: "primary" }}></Box>
)

export default function GoogleMap(props: GoogleMapProps) {
  return (
    <Box sx={{ minHeight: 200, maxHeight: 500, height: "100vh" }}>
      <ReactGoogleMap
        {...props}
        draggable
        bootstrapURLKeys={{
          key: YOUR_API_KEY,
        }}
      >
        <Marker lat={props.center.lat} lng={props.center.lng} />
      </ReactGoogleMap>
    </Box>
  )
}

GoogleMap.defaultProps = defaultProps
