import { useEffect, useState } from "react"

export default function useLocation() {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 })
  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setCoords({
            lat: res.coords.latitude,
            lng: res.coords.longitude,
          })
          console.log(res)
        },
        (error) => {
          console.error(error)
        }
      )

      return () => {}
    }
  }, [])
  return coords
}
