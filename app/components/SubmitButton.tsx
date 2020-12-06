import React from "react"
import { BeatLoader } from "react-spinners"
import { Button, SxStyleProp } from "theme-ui"
import ArrowIcon from "./ArrowIcon"

type SubmitButtonProps = {
  sx?: SxStyleProp
  fetching?: boolean
}

export default function SubmitButton({ fetching, sx }: SubmitButtonProps) {
  return (
    <Button
      sx={{
        variant: "forms.field",
        backgroundColor: "background",
        color: "heading",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...sx,
      }}
      type="submit"
    >
      {fetching ? <BeatLoader size={15} /> : <span style={{ marginLeft: 20 }}>ارسال</span>}
      <ArrowIcon />
    </Button>
  )
}
