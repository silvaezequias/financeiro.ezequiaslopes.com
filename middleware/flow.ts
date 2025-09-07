import { locales } from "@/i18n";
import { Credentials } from "@/lib/authorization/credentials";
import { User } from "@prisma/client";

export type AnonymousSession = {
  session: {
    user: {
      role: string;
      canDo: (credential: Credentials) => boolean;
    };
  };
};

export type AuthenticatedSession = {
  session: {
    user: User & {
      canDo: (credential: Credentials) => boolean;
    };
  };
};

export type LocaleContext = {
  locale: { lang: keyof typeof locales };
};

export type PassportSession = AnonymousSession | AuthenticatedSession;
export type FlowContext = PassportSession &
  Record<string, unknown> &
  LocaleContext;
export type AuthenticatedContext = FlowContext & AuthenticatedSession;
