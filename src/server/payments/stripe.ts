import Stripe from "stripe";

import { env } from "~/env.mjs";

class StripeSingleton {
  private static instance: Stripe | null = null;
  private apiKey: string;

  private constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public static getInstance(apiKey: string): Stripe {
    if (!StripeSingleton.instance) {
      StripeSingleton.instance = new StripeSingleton(apiKey).initializeStripe();
    }

    return StripeSingleton.instance;
  }

  private initializeStripe(): Stripe {
    return new Stripe(this.apiKey, {
      apiVersion: "2023-08-16",
    });
  }
}

export const stripe = StripeSingleton.getInstance(env.STRIPE_SECRET_KEY);
