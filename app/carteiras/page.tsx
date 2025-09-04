"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Plus, Edit, Trash2, DollarSign } from "lucide-react";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { garamond } from "@/lib/fonts";
import Layout from "@/components/Layout";
import { useUserWallets } from "@/hooks/useUserWallets";

// Mock data para demonstração
const mockWallets = [
  {
    id: "1",
    name: "Carteira Principal",
    color: "#f59e0b",
    imageUrl: "",
    currency: "BRL",
    balance: 2500.75,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Poupança",
    color: "#10b981",
    imageUrl: "",
    currency: "BRL",
    balance: 15000.0,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Investimentos",
    color: "#8b5cf6",
    imageUrl: "",
    currency: "USD",
    balance: 1250.3,
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    name: "Gastos Pessoais",
    color: "#ec4899",
    imageUrl: "",
    currency: "BRL",
    balance: 850.45,
    createdAt: "2024-01-20",
  },
];

const currencies = [
  { code: "BRL", name: "Real Brasileiro", symbol: "R$" },
  { code: "USD", name: "Dólar Americano", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "Libra Esterlina", symbol: "£" },
  { code: "JPY", name: "Iene Japonês", symbol: "¥" },
];

export default function WalletsPage() {
  const { wallets } = useUserWallets();

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return `${currency?.symbol || "R$"} ${amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
  };

  const handleDeleteWallet = (walletId: string) => {
    // TODO: Implementar lógica de exclusão
    console.log("Excluir carteira:", walletId);
  };

  const totalBalance = wallets
    .filter((w) => w.currency === "BRL")
    .reduce((sum, wallet) => sum + 0, 0);

  return (
    <Layout>
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
              <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="text-neutral-100 font-medium">
                  Saldo Total (BRL)
                </h3>
                <p className="text-2xl font-bold text-amber-300">
                  {formatCurrency(totalBalance, "BRL")}
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
              <Link href={`/carteiras/${wallet.id}/`}>
                <Card
                  key={wallet.id}
                  className="bg-neutral-950/40 hover:shadow-amber-300/10 hover:scale-110 hover:shadow-xl transform hover:cursor-pointer transition-all border-amber-300/50 "
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-3 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: wallet.color || "#aAa" }}
                        >
                          {wallet.imageUrl ? (
                            <img
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
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="">
                      <p className="text-2xl font-bold text-amber-300">
                        {formatCurrency(
                          /* wallet.balance, wallet.currency*/ 0,
                          "BRL"
                        )}
                      </p>
                      <p className="text-neutral-500 text-xs">
                        Criada em{" "}
                        {new Date(wallet.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>{" "}
    </Layout>
  );
}
