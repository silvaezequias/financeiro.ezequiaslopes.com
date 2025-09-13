"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Plus, Edit, DollarSign } from "lucide-react";
import Link from "next/link";
import { garamond } from "@/lib/fonts";
import { Layout } from "@/components/Layout";
import { useUserWallets } from "@/hooks/useUserWallets";
import formatter from "@/formatter";
import { useRouter } from "next/navigation";
import Image from "next/image";

const currencies = [
  { code: "BRL", name: "Real Brasileiro", symbol: "R$" },
  { code: "USD", name: "Dólar Americano", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "Libra Esterlina", symbol: "£" },
  { code: "JPY", name: "Iene Japonês", symbol: "¥" },
];

export default function WalletsPage() {
  const { wallets } = useUserWallets();
  const router = useRouter();

  useEffect(() => {
    console.log(wallets);
  }, [wallets]);

  const totalBalance = wallets
    .filter((w) => w.currency === "BRL")
    .reduce((sum, wallet) => sum + wallet.balance, 0);

  const handleOpenWallet = (walletId: string) => {
    router.push(`/carteiras/${walletId}/`);
  };

  const handleEditWallet = (walletId: string) => {
    router.push(`/carteiras/${walletId}/editar`);
  };

  return (
    <Layout noAuthBehavior="redirect" redirectUrl="/login">
      <section className="pt-16 px-5 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className={`${garamond.className} text-3xl text-neutral-100 mb-2`}
            >
              Minhas Carteiras
            </h1>
            <p className="text-neutral-400">
              Gerencie suas carteiras e acompanhe seus saldos
            </p>
          </div>
          <Button
            className="bg-amber-300 hover:bg-amber-200 text-black font-medium"
            asChild
          >
            <Link href="/carteiras/criar">
              <Plus className="h-4 w-4 mr-2" />
              Nova Carteira
            </Link>
          </Button>
        </div>

        {/* Resumo */}
        <Card className="bg-neutral-950/40 border-neutral-900 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-300 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="text-neutral-100 font-medium">
                  Saldo Total (BRL)
                </h3>
                <p className="text-2xl font-bold text-amber-300">
                  {formatter.number.currency(totalBalance, "BRL")}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-neutral-400 text-sm">
                  {wallets.length} carteiras
                </p>
                <p className="text-neutral-500 text-xs">Atualizado agora</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Carteiras */}
        {wallets.length === 0 ? (
          <Card className="bg-neutral-950/40 border-neutral-900">
            <CardContent className="p-12 text-center">
              <Wallet className="h-16 w-16 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-xl text-neutral-300 mb-2">
                Nenhuma carteira encontrada
              </h3>
              <p className="text-neutral-500 mb-6">
                Crie sua primeira carteira para começar a organizar suas
                finanças
              </p>
              <Button
                className="bg-amber-300 hover:bg-amber-200 text-black font-medium"
                asChild
              >
                <Link href="/carteiras/criar">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Carteira
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallets.map((wallet) => (
              <Card
                key={wallet.id}
                className="bg-neutral-950/40 aspect-[3/2] justify-between hover:shadow-amber-300/10 hover:scale-110 hover:shadow-xl transform hover:cursor-pointer transition-all border-amber-300/50 "
              >
                <CardHeader className="pb-3">
                  <label htmlFor={`wallet_${wallet.id}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-3 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: wallet.color || "#aAa" }}
                        >
                          {wallet.imageUrl ? (
                            <Image
                              src={wallet.imageUrl || "/placeholder.svg"}
                              alt="Wallet icon"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <Wallet className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-neutral-100 text-md ">
                            {wallet.name}
                          </CardTitle>
                          <p className="text-neutral-500 text-sm">
                            {
                              currencies.find((c) => c.code === wallet.currency)
                                ?.name
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                </CardHeader>
                <CardContent className="pt-0">
                  <label htmlFor={`wallet_${wallet.id}`}>
                    <p className="text-2xl font-bold text-amber-300">
                      {formatter.number.currency(
                        wallet.balance,
                        wallet.currency
                      )}
                    </p>
                    <p className="text-neutral-500 text-xs">
                      Criada em{" "}
                      {new Date(wallet.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </label>
                  <div className="flex max-w-full gap-2">
                    <Button
                      id={`wallet_${wallet.id}`}
                      variant={"default"}
                      onClick={() => handleOpenWallet(wallet.id)}
                      className="flex-4 mt-3 text-neutral-500 hover:bg-neutral-700 hover:text-neutral-300"
                    >
                      Abrir Carteira
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => handleEditWallet(wallet.id)}
                      className="flex-1 mt-3 text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300"
                    >
                      <Edit />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>{" "}
    </Layout>
  );
}
