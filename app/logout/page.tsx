"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { garamond } from "@/lib/fonts";
import Layout from "@/components/Layout";
export default function LogoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();
  const user = {} as {
    name?: string;
    email?: string;
  };

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 sm:px-6 pt-16 pb-24">
        <div className="text-center mb-8">
          <h1
            className={`${garamond.className} text-3xl text-neutral-100 mb-2`}
          >
            Sair da sua conta
          </h1>
          <p className="text-neutral-400">Você será desconectado do sistema</p>
        </div>

        <Card className="bg-neutral-950/40 border-neutral-900">
          <CardHeader className="space-y-1">
            <CardTitle className="text-neutral-100 flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              Confirmar Logout
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Tem certeza que deseja sair da sua conta?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user && "name" in user && (
              <div className="p-3 bg-neutral-900/30 rounded border border-neutral-800">
                <p className="text-sm text-neutral-300">
                  <span className="text-neutral-500">Usuário:</span> {user.name}
                </p>
                <p className="text-sm text-neutral-300">
                  <span className="text-neutral-500">Email:</span> {user.email}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleLogout}
                className="w-full bg-amber-300 text-black hover:bg-amber-200"
                disabled={isLoading}
              >
                {isLoading ? "Saindo..." : "Confirmar Logout"}
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Cancelar e voltar ao Dashboard
                </Link>
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-neutral-400">Precisa de ajuda? </span>
              <Link
                href="/contact"
                className="text-amber-300 hover:text-amber-200 underline"
              >
                Entre em contato
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}
