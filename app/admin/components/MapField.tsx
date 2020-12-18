import GoogleMap from "app/components/GoogleMap"
import useLocation from "app/hooks/useLocation"
import React from "react"
import { Field } from "react-final-form"

export default function MapField({ name }) {
  const coords = useLocation()
  return (
    <Field
      name={name}
      render={({ input }) => (
        <GoogleMap
          center={{ lat: input.value?.lat || coords.lat, lng: input.value?.lng || coords.lng }}
          onDragEnd={(map) => {
            input.onChange({
              lat: map.center.lat(),
              lng: map.center.lng(),
            })
          }}
        />
      )}
    />
  )
}
