"use client";

import { ShieldX, Home, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AccessDeniedPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-black text-neutral-200 flex flex-col justify-between">
      <SiteHeader />
      <div className=" bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black border-neutral-700">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <ShieldX className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                Acesso Negado
              </h1>
              <p className="text-zinc-400">
                Você não tem permissão para acessar esta página.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-zinc-500">
                Entre em contato com o administrador se você acredita que
                deveria ter acesso a esta área.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="flex-1 bg-amber-300 hover:bg-amber-200 text-black"
                >
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Voltar à página inicial
                  </Link>
                </Button>
                {session ? (
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleLogin}
                    className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <SiteFooter />
    </main>
  );
}
