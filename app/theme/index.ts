import future from "./future"

const theme = {
  ...future,
  initialColorModeName: "light",
  fonts: {
    ...future.fonts,
    monospace: "Menlo, monospace",
  },
  colors: {
    ...future.colors,
    text: "#555",
    heading: "#000",
    lightText: "#999",
    background: "#fff",
    primary: "#ccb87d",
    light: "#fff8ea",
    dark: "#051e1e",
    dark2: "#202020",
    shadow: "rgba(0, 0, 0, .125)",
    modes: {
      dark: {
        text: "#eee",
        heading: "#fff",
        lightText: "#555",
        background: "#111",
        primary: "#d1b271",
        light: "#222",
        dark: "#000",
        dark2: "#111",
        shadow: "rgba(255, 255, 255, .125)",
      },
    },
  },
  shadows: {
    card: `0 0 4px #cccccca6`,
    default: `0 0 10px #cccccca6`,
    countryCard: `0 20px 50px #cccccca6`,
  },
  text: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      color: "heading",
    },
  },
  buttons: {
    link: {
      backgroundColor: "transparent",
      color: "primary",
    },
  },
  links: {
    default: {
      cursor: "pointer",
      opacity: 0.8,
      "&:hover": {
        opacity: 1,
      },
      textDecoration: "none",
      fontWeight: "bold",
    },
    dashboard: {
      variant: "links.default",

      color: "text",
    },
  },
  borders: {
    primary: "2px solid #eee",
  },
  radii: {
    sm: 5,
    md: 10,
    default: 15,
    lg: 20,
    xl: 25,
    xxl: 35,
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: "bold",
    },
    field: {
      borderRadius: "md",
      color: "white",
      borderWidth: "2px",
      borderColor: "white",
      backgroundColor: "primary",
      boxShadow: "default",
      marginBottom: 2,
      "&::placeholder": {
        color: "white",
      },
      "&:focus": {
        boxShadow: (t) => `0 0 0 1px white`,
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
}

export default theme
