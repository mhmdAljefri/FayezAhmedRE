import React from "react"
import OptmizationImage from "../OptmizationImage"

export default function IdealDestinationBG() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0, zIndex: -1 }}>
      <OptmizationImage alt="..." objectFit="cover" src="/back2.jpg" localImage layout="fill" />
    </div>
  )
}
