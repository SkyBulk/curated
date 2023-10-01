export type EmailSendingOptions = {
  to: string;
  subject: string;
  template: unknown;
};

export interface EmailSendingStrategy {
  send(options: EmailSendingOptions): Promise<void>;
}

export default class EmailSenderSingleton {
  private static instance: EmailSenderSingleton | null = null;
  private emailSendingStrategy: EmailSendingStrategy;

  constructor(strategy: EmailSendingStrategy) {
    this.emailSendingStrategy = strategy;
  }

  static getInstance(strategy: EmailSendingStrategy): EmailSenderSingleton {
    if (!EmailSenderSingleton.instance) {
      EmailSenderSingleton.instance = new EmailSenderSingleton(strategy);
    }
    return EmailSenderSingleton.instance;
  }

  send(options: EmailSendingOptions): Promise<void> {
    return this.emailSendingStrategy.send(options);
  }
}
