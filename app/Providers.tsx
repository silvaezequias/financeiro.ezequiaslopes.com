// app/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { UserProvider } from "@/hooks/useUser";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) {
  return (
    <SessionProvider session={session}>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
}
