import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";
import { stripe } from "~/server/payments/stripe";

const monthlySubscriptionId = "price_1NvuQfD9O8N71IpYGb8e1BeC";

function parseRedirectionUrl(pathname: string) {
  const redirectionUrl = new URL(env.NEXTAUTH_URL);
  redirectionUrl.pathname = pathname;
  return redirectionUrl.href;
}

export const paymentsRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(z.object({ redirectionPage: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const redirectionUrl = parseRedirectionUrl(input.redirectionPage);

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: monthlySubscriptionId, quantity: 1 }],
        success_url: redirectionUrl,
        cancel_url: redirectionUrl,
        customer: ctx.session.user.stripeCustomerId,
      });

      if (!checkoutSession.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create checkout session",
        });
      }

      return { url: checkoutSession.url };
    }),

  createBillingPortalSession: protectedProcedure
    .input(z.object({ redirectionPage: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const redirectionUrl = parseRedirectionUrl(input.redirectionPage);

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: ctx.session.user.stripeCustomerId,
        return_url: redirectionUrl,
      });

      return { url: portalSession.url };
    }),
});
