import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
import { buffer } from "micro";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { stripe } from "~/server/payments/stripe";

export const config = {
  api: {
    bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestBuffer = await buffer(req);
    const signature = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(),
        signature,
        env.STRIPE_WEBHOOK_SIGNING_SECRET
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send("Webhook verification failed");
    }

    const subscription = event.data.object as Stripe.Subscription;
    const stripeCustomerId = subscription.customer as string;

    switch (event.type) {
      case "customer.subscription.created": {
        await db.user.update({
          where: { stripeCustomerId },
          data: { isActive: true },
        });
        break;
      }

      case "customer.subscription.deleted": {
        await db.user.update({
          where: { stripeCustomerId },
          data: { isActive: false },
        });
        break;
      }

      default: {
        console.warn(`Unhandled event type ${event.type}`);
      }
    }

    res.send(200);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
}
