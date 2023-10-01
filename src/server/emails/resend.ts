import { Resend } from "resend";

import type { EmailSendingOptions, EmailSendingStrategy } from "./sender";

export default class ResendEmailStrategy implements EmailSendingStrategy {
  private resend: Resend;

  constructor(private apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async send(options: EmailSendingOptions): Promise<void> {
    await this.resend.emails.send({
      from: "hello@curated.co",
      to: options.to,
      subject: options.subject,
      html: options.template as string,
    });
  }
}
