import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import SuperJSON from "superjson";

import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

export const getSSRHelpers = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const session = await getServerAuthSession(ctx);

  const ssrHelpers = createServerSideHelpers({
    router: appRouter,
    ctx: { session, db },
    transformer: SuperJSON,
  });

  return { ssrHelpers, session };
};
