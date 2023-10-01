import { env } from "~/env.mjs";
import EmailSenderSingleton from "./sender";
import ResendEmailStrategy from "./resend";

const resendStrategy = new ResendEmailStrategy(env.RESEND_API_KEY);
export const emailSender = EmailSenderSingleton.getInstance(resendStrategy);
