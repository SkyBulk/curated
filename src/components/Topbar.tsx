import {
  Avatar,
  Container,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  PiCrownSimpleBold,
  PiSignOutBold,
  PiGearSixBold,
} from "react-icons/pi";

import { api } from "~/utils/api";

export default function Topbar() {
  const { t } = useTranslation(["common"]);
  const router = useRouter();
  const session = useSession();

  const checkout = api.payments.createCheckoutSession.useMutation({
    onSuccess: ({ url }) => window.location.assign(url),
  });

  const billingPortal = api.payments.createBillingPortalSession.useMutation({
    onSuccess: ({ url }) => window.location.assign(url),
  });

  const handleManageSubscription = () => {
    void billingPortal.mutate({ redirectionPage: router.asPath });
  };

  const handleSubscribe = () => {
    void checkout.mutate({ redirectionPage: router.asPath });
  };

  const handleLogOut = () => {
    void signOut({ callbackUrl: "/" });
  };

  return (
    <Container>
      <HStack justify="space-between" align="center" pt={4}>
        <Heading size="md">curated.</Heading>
        <Menu>
          <MenuButton
            as={Avatar}
            size="sm"
            name={session.data?.user.name ?? undefined}
            src={session.data?.user.image ?? undefined}
          />
          <MenuList>
            <MenuOptionGroup title="Subscription">
              {!session.data?.user.isActive && (
                <MenuItem
                  disabled={checkout.isLoading}
                  icon={<PiCrownSimpleBold />}
                  color="GrayText"
                  onClick={handleSubscribe}
                >
                  {t("common:topbar.premium")}
                </MenuItem>
              )}
              <MenuItem
                disabled={billingPortal.isLoading}
                icon={<PiGearSixBold />}
                color="GrayText"
                onClick={handleManageSubscription}
              >
                {t("common:topbar.manage")}
              </MenuItem>
            </MenuOptionGroup>
            <MenuOptionGroup title="Account">
              <MenuItem
                icon={<PiSignOutBold />}
                color="GrayText"
                onClick={handleLogOut}
              >
                {t("common:topbar.signOut")}
              </MenuItem>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
    </Container>
  );
}
