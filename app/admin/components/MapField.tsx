import GoogleMap from "app/components/GoogleMap"
import useLocation from "app/hooks/useLocation"
import React from "react"
import { Field } from "react-final-form"
import { Input } from "theme-ui"

export default function MapField({ name }) {
  const coords = useLocation()

  // https://www.google.com/maps/place/name-of-place/@12.8574172,44.9926662,17z/data=any
  const locationFromUrl = (event: React.FormEvent<HTMLInputElement>, onChange) => {
    const value = event.currentTarget.value
    const location: string = value.split("@")[1]
    const [lat, lng] = location?.split(",")

    if (lat && lng) onChange({ lat: parseFloat(lat), lng: parseFloat(lng) })
  }
  return (
    <Field
      name={name}
      render={({ input }) => (
        <>
          <Input
            placeholder="رابط الموقع من الخريطة"
            onChange={(event) => locationFromUrl(event, input.onChange)}
          />
          <GoogleMap
            center={{ lat: input.value?.lat || coords.lat, lng: input.value?.lng || coords.lng }}
            onDragEnd={(map) => {
              input.onChange({
                lat: map.center.lat(),
                lng: map.center.lng(),
              })
            }}
          />
        </>
      )}
    />
  )
}
