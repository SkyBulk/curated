import { type Theme, extendTheme } from "@chakra-ui/react";

const fonts: Partial<Theme["fonts"]> = {
  heading: "var(--font-dm-mono)",
  body: "var(--font-dm-mono)",
  mono: "var(--font-dm-mono)",
};

const config: Partial<Theme["config"]> = {
  initialColorMode: "light",
};

const styles: Partial<Theme["styles"]> = {
  global: (props) => ({
    body: {
      backgroundImage: `url('/dotted.webp')`,
      backgroundRepeat: "repeat",
    },
  }),
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
const components: Partial<Theme["components"]> = {
  Container: {
    /* @ts-ignore */
    baseStyle: {
      maxW: "1200px",
    },
  },
  Button: {
    defaultProps: {
      colorScheme: "orange",
    },
  },
};
/* eslint-enable @typescript-eslint/ban-ts-comment */

export const theme: Partial<Theme> = extendTheme({
  fonts,
  config,
  components,
  styles,
});
