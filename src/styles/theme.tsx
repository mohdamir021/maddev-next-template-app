import { extendTheme, theme as base } from "@chakra-ui/react";
import { Button } from "./Button";

const customTheme = {
  colors: {
    primary: {
      default: "#182F43",
      secondary: "#3FDD78",
      light: "#3FDD78",
      blue: "#0084FF",
      "01": {
        "100": "rgba(0, 132, 255, 1)", // *blue.100
        "75": "rgba(0, 132, 255, 0.75)", // *blue.75
        "50": "rgba(0, 132, 255, 0.50)", // *blue.50
      },
      "02": "rgba(63, 221, 120, 1)", // *green.100,
    },
    neutral: {
      "100": "#FEFEFE",
      "200": "#F3F5F7",
      "400": "#6C7275",
      "500": "#6C727580",
      "600": "#232627",
      "700": "#141718",
      "01": {
        "25": "rgba(254, 254, 254, 0.25)",
        "50": "rgba(254, 254, 254, 0.5)",
        "75": "rgba(254, 254, 254, 0.75)",
        "100": "rgba(254, 254, 254, 1)",
      },
      "02": {
        "25": "rgba(243, 245, 247, 0.25)",
        "50": "rgba(243, 245, 247, 0.5)",
        "75": "rgba(243, 245, 247, 0.75)",
        "100": "rgba(243, 245, 247, 1)",
      },
      "03": {
        "75": "rgba(232, 236, 239, 0.25)",
        "50": "rgba(232, 236, 239, 0.5)",
        "25": "rgba(232, 236, 239, 0.75)",
        "100": "rgba(232, 236, 239, 1)",
      },
      "04": {
        "25": "rgba(108, 114, 117, 0.25)",
        "50": "rgba(108, 114, 117, 0.5)",
        "75": "rgba(108, 114, 117, 0.75)",
        "100": "rgba(108, 114, 117, 1)",
      },
      "05": {
        "25": "rgba(52, 56, 57, 0.25)",
        "50": "rgba(52, 56, 57, 0.5)",
        "75": "rgba(52, 56, 57, 0.75)",
        "100": "rgba(52, 56, 57, 1)",
      },
      "06": {
        "25": "rgba(35, 38, 39, 0.25)",
        "50": "rgba(35, 38, 39, 0.5)",
        "75": "rgba(35, 38, 39, 0.75)",
        "100": "rgba(35, 38, 39, 1)",
      },
      "07": {
        "25": "rgba(20, 23, 24, 0.25)",
        "50": "rgba(20, 23, 24, 0.5)",
        "75": "rgba(20, 23, 24, 0.75)",
        "100": "rgba(20, 23, 24, 1)",
      },
    },
    success: "#41CB11",
    // PCARI-ADMIN
    main: {
      default: "#32BAA5", // Green->Keppel
      light: "#C7ECE7", // Background
      lighter: "#E9FAF7", // Lighter Background
      dark: "#32907B",
      grey: "#32907B",
      neutral: "#777980",
    },
    warning: {
      default: "#FFC400",
      light: "#FCF8E9", // Background
    },
    failure: {
      default: "#DF3326",
      light: "rgba(255, 0, 0, 0.12)",
    },
    input: {
      background: "#F4FBFA",
    },
  },

  fonts: {
    heading: `'Exo 2', ${base.fonts?.heading}`,
    body: `'Poppins', ${base.fonts?.body}`,
  },

  breakpoints: {
    base: "0px",
    xs: "290px",
    sm: "480px",
    md: "768px",
    lg: "992px",
    xl: "1280px",
    "2xl": "1536px",
  },

  components: {
    // Menu,
    Button,
    //   Checkbox,
    //   FormControl,
    //   FormLabel,
    //   Input,
    //   Link,
    //   Radio,
    //   Select,
    //   Divider,
    //   Text,
  },
};

export const theme = extendTheme(customTheme);
