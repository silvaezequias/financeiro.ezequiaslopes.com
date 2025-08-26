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

export type PassportSession = AnonymousSession | AuthenticatedSession;
export type FlowContext = PassportSession & Record<string, unknown>;
