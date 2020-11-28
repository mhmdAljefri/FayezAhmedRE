import React from "react"
const isBrowser = typeof window !== "undefined"

const withSwalInstance = isBrowser ? require("sweetalert2-react").withSwalInstance : () => {}
const swal = isBrowser ? require("sweetalert2") : () => {}
const SweetAlert = isBrowser ? withSwalInstance(swal) : <div />

type AlertType = {
  title: string
  text: string
  open: boolean
  onToggle: () => any
}
export default function Alert({ title, text, onToggle, open }: AlertType) {
  if (!isBrowser) return null
  return <SweetAlert show={open} title={title} text={text} onConfirm={onToggle} />
}
