"use client";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { useSession } from "next-auth/react";
import { LoadingOverlay } from "./loading-overlay";
import { se } from "date-fns/locale";
import { unauthorized, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col justify-between">
      <SiteHeader />
      <div className="mx-auto max-w-5xl">{children}</div>
      <SiteFooter />
    </main>
  );
}

export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (!session && status === "unauthenticated") {
    unauthorized();
    return null;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col justify-between">
      <SiteHeader />
      {status === "loading" ? (
        <LoadingOverlay
          isVisible={true}
          message="Verificando autenticação..."
        />
      ) : (
        <div className="mx-auto max-w-5xl">{children}</div>
      )}
      <SiteFooter />
    </main>
  );
}

export function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (session && status === "authenticated") {
    router.push("/dashboard");
    return null;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col justify-between">
      <SiteHeader />
      {status === "loading" ? (
        <LoadingOverlay isVisible={true} message="Analisando conexão..." />
      ) : (
        <div className="mx-auto max-w-5xl">{children}</div>
      )}
      <SiteFooter />
    </main>
  );
}
