import { ColorModeScript } from "@chakra-ui/react";
import {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentProps,
} from "next/document";

import { theme } from "~/theme";

export default function Document({ locale }: DocumentProps) {
  return (
    <Html lang={locale}>
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config!.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
