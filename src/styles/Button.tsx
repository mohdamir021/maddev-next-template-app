import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 600,
  },
  variants: {
    "default-main": {
      bgColor: "main.default",
      textColor: "white",
    },
    "variant-001": {
      bgColor: "purple",
      textColor: "white",
    },
    // ... add more variants
  },
  defaultProps: {
    variant: "default-main",
  },
});
