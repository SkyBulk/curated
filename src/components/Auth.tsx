import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { signIn } from "next-auth/react";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";

import image from "../images/conversation@3x.png";

export default function Auth() {
  const { t } = useTranslation(["common"]);
  const [viewportHeight, setViewportHeight] = useState<number>();

  useEffect(() => {
    function getViewportHeight() {
      const vh = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isIOS) {
        return Math.min(vh, fullHeight);
      } else {
        return vh;
      }
    }

    setViewportHeight(getViewportHeight());
  }, []);

  return (
    <>
      <Head>
        <title>{t("common:meta.title")}</title>
        <meta name="description" content={t("common:meta.description")} />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
          sizes="32x32"
        />
      </Head>
      <Container
        maxW="md"
        height={viewportHeight ?? "100vh"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack mt={-4}>
          <Box
            boxSize={{
              base: "180px",
              md: "3xs",
            }}
          >
            <Image priority={true} src={image} alt={t("common:auth.img")} />
          </Box>
          <Heading fontSize="3xl" textAlign="center" mb={4} mt={-4}>
            curated.
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="GrayText"
            textAlign="center"
            mb={6}
          >
            {t("common:auth.headline")}
          </Text>
          <Button
            leftIcon={<BsGoogle />}
            w="full"
            onClick={() => void signIn("google")}
          >
            {t("common:auth.signIn", { provider: "Google" })}
          </Button>
        </VStack>
        <Text
          position="absolute"
          bottom={0}
          py={6}
          mt={4}
          fontSize="xs"
          color="GrayText"
          textAlign="center"
          px={4}
        >
          <Trans
            i18nKey="common:auth.legal"
            components={{
              terms: <Link href="/" textDecor="underline" />,
              privacy: <Link href="/" textDecor="underline" />,
            }}
          />
        </Text>
      </Container>
    </>
  );
}
