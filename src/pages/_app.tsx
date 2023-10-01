import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { DM_Mono } from "next/font/google";

import { api } from "~/utils/api";
import { theme } from "~/theme";

const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-dm-mono: ${dmMono.style.fontFamily};
          }
        `}
      </style>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(appWithTranslation(App));
