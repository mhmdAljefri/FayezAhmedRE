import React from "react"

export default function OfferCardPureVideo({ poster = "any", src }) {
  return (
    <video
      width="100%"
      height="100%"
      poster={poster}
      // poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
      controls
    >
      <track kind="captions" />
      <source src={src} type="video/mp4" />
      <source src={src} type="video/ogg" />
      <source src={src} type="video/webm" />
      <object data={src}>
        <embed src={src} />
      </object>
    </video>
  )
}
