import { createTRPCRouter } from "~/server/api/trpc";
import { contentRouter } from "./routers/content";
import { paymentsRouter } from "./routers/payments";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  content: contentRouter,
  payments: paymentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
