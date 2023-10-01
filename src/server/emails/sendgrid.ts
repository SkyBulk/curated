import * as sendgrid from "@sendgrid/mail";

import type { EmailSendingOptions, EmailSendingStrategy } from "./sender";

export default class SendgridEmailStrategy implements EmailSendingStrategy {
  constructor(private apiKey: string) {
    sendgrid.setApiKey(apiKey);
  }

  async send(options: EmailSendingOptions): Promise<void> {
    await sendgrid.send({
      from: "hello@curated.co",
      to: options.to,
      subject: options.subject,
      html: options.template as string,
    });
  }
}
