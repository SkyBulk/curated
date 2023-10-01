import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { api } from "~/utils/api";

export default function PayWall() {
  const { t } = useTranslation(["common"]);
  const router = useRouter();

  const checkout = api.payments.createCheckoutSession.useMutation({
    onSuccess: ({ url }) => window.location.assign(url),
  });

  const handleCheckout = () => {
    void checkout.mutate({ redirectionPage: router.asPath });
  };

  return (
    <Box
      backgroundColor="orange.500"
      px={{ base: 4, md: 8 }}
      py={10}
      borderRadius="md"
      boxShadow="xl"
      mt={10}
    >
      <Heading
        textAlign="center"
        color="white"
        size="md"
        pb={4}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        style={{ textWrap: "balance" }}
      >
        {t("common:paywall.headline")}
      </Heading>
      <Heading
        textAlign="center"
        color="orange.100"
        size="sm"
        fontWeight="400"
        pb={6}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        style={{ textWrap: "balance" }}
      >
        {t("common:paywall.subheadline")}
      </Heading>
      <Button
        onClick={handleCheckout}
        isLoading={checkout.isLoading}
        w="full"
        colorScheme="gray"
        color="orange.500"
      >
        {t("common:paywall.action")}
      </Button>
    </Box>
  );
}
