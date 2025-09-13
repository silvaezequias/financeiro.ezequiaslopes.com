"use client";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { SessionContextValue, useSession } from "next-auth/react";
import { LoadingOverlay } from "./loading-overlay";
import { unauthorized, useRouter } from "next/navigation";

type NoAuthBehaviors = "none" | "redirect" | "forbidden";

type LayoutProps = {
  children: React.ReactNode;
  waitForAuth?: boolean;
  handleAuthenticated?: (session: SessionContextValue) => void;
} & (
  | { noAuthBehavior?: "redirect"; redirectUrl: string }
  | {
      noAuthBehavior?: Exclude<NoAuthBehaviors, "redirect">;
      redirectUrl?: never;
    }
);

function LayoutContainer({ children }: LayoutProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col justify-between">
      {children}
    </main>
  );
}

export function Layout(props: LayoutProps) {
  const session = useSession();
  const router = useRouter();

  let waitForAuth = true;

  "waitForAuth" in props && (waitForAuth = !!props.waitForAuth!);

  if (waitForAuth && session.status === "loading") {
    return (
      <LayoutContainer>
        <LoadingOverlay isVisible message="Aguarde verificação..." />
      </LayoutContainer>
    );
  }

  if (!session.data && session.status === "unauthenticated") {
    if (props.noAuthBehavior) {
      if (props.noAuthBehavior !== "none") {
        if (props.noAuthBehavior === "forbidden") unauthorized();
        if (props.noAuthBehavior === "redirect") router.push(props.redirectUrl);

        return <LayoutContainer children />;
      }
    } else if (waitForAuth) {
      router.push("/login");
    }
  }

  if (session.status === "authenticated") {
    props.handleAuthenticated?.(session);
  }

  return (
    <LayoutContainer>
      <SiteHeader session={session} />
      <div className="mx-auto max-w-5xl w-full">{props.children}</div>
      <SiteFooter />
    </LayoutContainer>
  );
}
