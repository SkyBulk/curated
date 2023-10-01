import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Auth from "~/components/Auth";
import PrivateArticle from "~/components/PrivateArticle";
import { getSSRHelpers } from "~/utils/ssr";

type Props = {
  trpcState: unknown;
  isAuthenticated: boolean;
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const { ssrHelpers, session } = await getSSRHelpers(ctx);

  if (session) {
    await ssrHelpers.content.getPrivateArticle.prefetch();
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["common"])),
      trpcState: ssrHelpers.dehydrate(),
      isAuthenticated: !!session,
    },
  };
}

export default function Home({ isAuthenticated }: Props) {
  if (!isAuthenticated) {
    return <Auth />;
  }

  return <PrivateArticle />;
}
