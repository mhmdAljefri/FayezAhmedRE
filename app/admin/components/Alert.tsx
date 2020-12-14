import React, { useEffect } from "react"
import sweetalert2 from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const SweetAlert = withReactContent(sweetalert2)

type AlertType = {
  title: string
  text: string
  open: boolean
  onToggle: () => any
}
export default function Alert({ title, text, onToggle, open }: AlertType) {
  useEffect(() => {
    if (open)
      SweetAlert.fire({
        title: title,
        html: text,
        confirmButtonText: "تاكيد",
        click: () => onToggle(),
      })

    return () => {}
  }, [open, onToggle, title, text])

  return <div />
}
