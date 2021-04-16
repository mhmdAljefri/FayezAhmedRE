import future from "./future"
import { Theme } from "theme-ui"

const theme: Theme = {
  ...future,
  breakpoints: ["40em", "56em", "64em", "120em"],
  initialColorModeName: "light",
  fonts: {
    ...future.fonts,
    monospace: "Menlo, monospace",
  },
  colors: {
    ...future.colors,
    text: "#333",
    heading: "#000",
    lightText: "#999",
    background: "#fff",
    primary: "#751a46",
    primary100: "#751a46d1",
    white100: "#ffffff6e",
    black100: "#d4d4d4d9",
    secondary100: "#0a090487",
    input: "#65143b",
    light: "#f6f6ff",
    dark: "#f6f6ff",
    dark2: "#202020",
    shadow: "rgba(0, 0, 0, .125)",
    modes: {
      dark: {
        muted: "#111",
        text: "#eee",
        white100: "#00000094",
        heading: "#fff",
        lightText: "#555",
        background: "#111",
        primary: "#a5165b",
        light: "#222",
        dark: "#000",
        dark2: "#111",
        shadow: "rgba(255, 255, 255, .125)",
      },
    },
  },
  shadows: {
    card: `0 0 4px #a5a5a5a6`,
    input: `0 2px 2px #a5a5a5a6`,
    default: `0 0 10px #a5a5a5a6`,
    countryCard: `0 20px 50px #a5a5a5a6`,
  },
  text: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      color: "heading",
    },
  },
  zIndices: {
    header: 999,
    contactForm: 10,
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
    outline: {
      variant: "links.default",

      backgroundColor: "background",
      color: "heading",
      display: "block",
      border: "primary",
      borderRadius: "md",
      paddingY: 1,
      paddingX: 2,
      borderColor: "primary",
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
      color: "white",
      fontWeight: "bold",
    },
    field: {
      p: 1,
      fontFamily: "body",
      borderRadius: "md",
      color: "white",
      borderWidth: "1px",
      borderColor: "white",
      backgroundColor: "input",
      boxShadow: "input",
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
    checkbox: {
      backgroundColor: "white",
    },
    select: {
      variant: "forms.field",
      "&+svg": {
        marginRight: -28,
        marginLeft: "auto",
        color: "background",
      },
      option: {
        backgroundColor: "background",
        color: "text",
      },
    },
  },

  styles: {
    root: {
      // uses the theme values provided above
      padding: 30,
      fontFamily: "body",
      fontWeight: "body",
      ":before": {
        borderColor: "background",
        content: '""',
        pointerEvents: "none",
        borderWidth: 30,
        borderStyle: "solid",
        borderTop: 0,
        borderBottom: 0,
        zIndex: 111111111111,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
  },
}

export default theme
