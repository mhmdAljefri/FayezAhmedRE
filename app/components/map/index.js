import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel"
import DarkThemeStyle from "./darkThemeStyle.json"

const YOUR_API_KEY = "AIzaSyA52m6D9EzXX3xjYk-8RYs-v-S7ht2ihqk"
const GOOGLE_URL = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
const MapComponent = compose(
  withProps({
    googleMapURL: GOOGLE_URL,
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "100%", position: "relative" }} />,
    mapElement: <div style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      zoom={11}
      options={{
        styles: props.isDark && DarkThemeStyle,
      }}
      center={props.location}
    >
      <MarkerWithLabel
        position={props.location}
        style={{ width: 100 }}
        animation={window.google.maps.Animation.DROP}
        labelAnchor={new window.google.maps.Point(65, 5)}
        // icon={markerIcon}
      >
        <div />
      </MarkerWithLabel>
    </GoogleMap>
  )
})

export default MapComponent
