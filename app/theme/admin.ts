import main from "./index"

const theme = {
  ...main,
  fonts: {
    ...main.fonts,
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: "bold",
    },
    field: {
      borderRadius: "md",
      borderWidth: "2px",
      boxShadow: "card",
      borderColor: "muted",
      marginBottom: 2,
      "&:focus": {
        boxShadow: (t) => `0 0 0 1px ${t.colors.muted}`,
        outline: "none",
      },
    },
    input: {
      variant: "forms.field",
    },
    textarea: {
      variant: "forms.field",
    },
    select: {
      variant: "forms.field",
      "&+svg": {
        marginRight: -28,
        marginLeft: "auto",
      },
    },
  },
  styles: {
    root: {
      // uses the theme values provided above
      fontFamily: "body",
      fontWeight: "body",
      ":before": {
        content: "",
      },
    },
  },
}

export default theme
