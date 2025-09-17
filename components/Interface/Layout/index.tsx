"use client";

import SiteHeader from "@/components/Interface/Header";
import SiteFooter from "@/components/Interface/Footer";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { unauthorized } from "next/navigation"; // cuidado: unauthorized só funciona server-side
import { useRouter } from "next/navigation";
import { UserPropertiesContext, useUser } from "@/hooks/useUser";
import { useEffect } from "react";

type NoAuthBehaviors = "none" | "redirect" | "forbidden";

type LayoutProps = {
  children: React.ReactNode;
  waitForAuth?: boolean;
  handleAuthenticated?: (user: UserPropertiesContext) => void;
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
  const { loading, user } = useUser();
  const router = useRouter();

  let waitForAuth = true;
  if ("waitForAuth" in props) {
    waitForAuth = !!props.waitForAuth;
  }

  useEffect(() => {
    if (!loading && !user) {
      if (props.noAuthBehavior) {
        if (props.noAuthBehavior === "forbidden") {
          router.push("/forbidden");
        }
        if (props.noAuthBehavior === "redirect" && props.redirectUrl) {
          router.push(props.redirectUrl);
        }
      } else if (waitForAuth) {
        router.push("/login");
      }
    }
  }, [
    loading,
    user,
    props.noAuthBehavior,
    props.redirectUrl,
    waitForAuth,
    router,
  ]);

  if (waitForAuth && loading) {
    return (
      <LayoutContainer>
        <LoadingOverlay isVisible message="Aguarde verificação..." />
      </LayoutContainer>
    );
  }

  if (!loading && user) {
    props.handleAuthenticated?.(user);
  }

  return (
    <LayoutContainer>
      <SiteHeader />
      <div className="mx-auto max-w-5xl w-full">{props.children}</div>
      <SiteFooter />
    </LayoutContainer>
  );
}
