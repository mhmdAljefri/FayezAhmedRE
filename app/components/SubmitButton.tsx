import React from "react"
import { BeatLoader } from "react-spinners"
import { Button, SxStyleProp, Box } from "theme-ui"
import ArrowIcon from "./ArrowIcon"

type SubmitButtonProps = {
  sx?: SxStyleProp
  fetching?: boolean
}

export default function SubmitButton({ fetching, sx }: SubmitButtonProps) {
  return fetching ? (
    <Box
      sx={{
        display: "flex",
        p: 3,
      }}
    >
      <BeatLoader color="white" size={15} />
    </Box>
  ) : (
    <Button
      sx={{
        variant: "forms.field",
        backgroundColor: "background",
        color: "heading",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...sx,
        pt: 2,
      }}
      type="submit"
    >
      <span style={{ marginLeft: 20, marginRight: 10 }}>ارسال</span>
      <ArrowIcon />
    </Button>
  )
}
