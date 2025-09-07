"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wallet as WalletIcon, Palette, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { garamond } from "@/lib/fonts";
import { AuthenticatedLayout } from "@/components/Layout";
import { useUserWallets } from "@/hooks/useUserWallets";
import { Wallet } from "@prisma/client";
import formatter from "@/formatter";

export default function EditWalletPage() {
  const params = useParams();
  const router = useRouter();
  const walletId = params.walletId as string;

  const [walletData, setWalletData] = useState<Partial<Wallet>>({
    name: "",
    color: "#f59e0b",
    imageUrl: "",
    currency: "BRL",
    balance: 0,
  });

  const { wallets } = useUserWallets();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento dos dados da carteira
    if (wallets.length) {
      const wallet = wallets.find((w) => w.id === walletId);

      if (wallet) {
        setWalletData(wallet);
      } else {
        // Redirecionar para página de carteira não encontrada
        router.push("/carteiras/404");
      }

      setIsLoading(false);
    }
  }, [walletId, router, wallets]);

  const predefinedColors = [
    { name: "Âmbar", value: "#f59e0b", bg: "bg-amber-500" },
    { name: "Azul", value: "#3b82f6", bg: "bg-blue-500" },
    { name: "Verde", value: "#10b981", bg: "bg-emerald-500" },
    { name: "Roxo", value: "#8b5cf6", bg: "bg-violet-500" },
    { name: "Rosa", value: "#ec4899", bg: "bg-pink-500" },
    { name: "Vermelho", value: "#ef4444", bg: "bg-red-500" },
    { name: "Laranja", value: "#f97316", bg: "bg-orange-500" },
    { name: "Teal", value: "#14b8a6", bg: "bg-teal-500" },
    { name: "Índigo", value: "#6366f1", bg: "bg-indigo-500" },
    { name: "Cinza", value: "#6b7280", bg: "bg-gray-500" },
  ];

  const currencies = [
    { code: "BRL", name: "Real Brasileiro", symbol: "R$" },
    { code: "USD", name: "Dólar Americano", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "Libra Esterlina", symbol: "£" },
    { code: "JPY", name: "Iene Japonês", symbol: "¥" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setWalletData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de atualização da carteira
    console.log("Carteira atualizada:", walletData);
    router.push("/carteiras");
  };

  const handleDelete = () => {
    if (
      confirm(
        "Tem certeza que deseja excluir esta carteira? Esta ação não pode ser desfeita."
      )
    ) {
      // TODO: Implementar lógica de exclusão da carteira
      console.log("Carteira excluída:", walletId);
      router.push("/carteiras");
    }
  };

  if (isLoading) {
    return (
      <AuthenticatedLayout>
        <section className="mx-auto max-w-2xl px-4 sm:px-6 pt-16 pb-24">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-300 mx-auto mb-4"></div>
              <p className="text-neutral-400">Carregando carteira...</p>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/carteiras">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-300 hover:text-amber-400"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex-1">
                <h1
                  className={`${garamond.className} text-3xl text-neutral-100 mb-2`}
                >
                  Editar Carteira
                </h1>
                <p className="text-neutral-400">
                  Atualize as informações da sua carteira
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-amber-300 mb-4">
                Pré-visualização
              </h2>
              <Card className="bg-neutral-950/40 border-neutral-900 max-w-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: walletData.color || "#aaa" }}
                    >
                      {walletData.imageUrl ? (
                        <img
                          src={walletData.imageUrl || "/placeholder.svg"}
                          alt="Wallet icon"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <WalletIcon className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-neutral-100 font-medium">
                        {walletData.name || "Nome da Carteira"}
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        {currencies.find((c) => c.code === walletData.currency)
                          ?.name || "Real Brasileiro"}
                      </p>
                      <p className="text-amber-300 font-semibold">
                        {formatter.number.currency(
                          walletData.balance || 0,
                          walletData.currency
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <Card className="bg-neutral-950/40 border-neutral-900">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center gap-2">
                  <WalletIcon className="h-5 w-5" />
                  DADOS DA CARTEIRA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome da Carteira */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-200">
                      Nome da Carteira *
                    </Label>
                    <div className="relative">
                      <WalletIcon className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Ex: Carteira Principal, Poupança, Investimentos"
                        value={walletData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="pl-10 bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Cor da Carteira */}
                  <div className="space-y-3">
                    <Label className="text-neutral-200">
                      Cor da Carteira *
                    </Label>
                    <div className="grid grid-cols-5 gap-3">
                      {predefinedColors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() =>
                            handleInputChange("color", color.value)
                          }
                          className={`
                            w-12 h-12 rounded-full border-2 transition-all
                            ${
                              walletData.color === color.value
                                ? "border-amber-300 scale-110"
                                : "border-neutral-600 hover:border-neutral-400"
                            }
                          `}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          {walletData.color === color.value && (
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Palette className="h-4 w-4 text-neutral-500" />
                      <Input
                        type="color"
                        value={walletData.color || "#aaa"}
                        onChange={(e) =>
                          handleInputChange("color", e.target.value)
                        }
                        className="w-16 h-8 p-0 border-neutral-700 bg-neutral-900/50"
                        title="Cor personalizada"
                      />
                      <span className="text-sm text-neutral-400">
                        Ou escolha uma cor personalizada
                      </span>
                    </div>
                  </div>

                  {/* URL da Imagem (Opcional) */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl" className="text-neutral-200">
                      URL da Imagem (Opcional)
                    </Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      placeholder="https://exemplo.com/imagem.png"
                      value={walletData.imageUrl || ""}
                      onChange={(e) =>
                        handleInputChange("imageUrl", e.target.value)
                      }
                      className="bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                    />
                    <p className="text-xs text-neutral-500">
                      Deixe em branco para usar o ícone padrão de carteira
                    </p>
                  </div>

                  {/* Moeda */}
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-neutral-200">
                      Moeda *
                    </Label>
                    <Select
                      value={walletData.currency}
                      onValueChange={(value) =>
                        handleInputChange("currency", value)
                      }
                    >
                      <SelectTrigger className="bg-neutral-900/50 border-neutral-700 text-neutral-200">
                        <SelectValue placeholder="Selecione a moeda" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-900 border-neutral-700">
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.code}
                            value={currency.code}
                            className="text-neutral-200 hover:bg-neutral-800"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-amber-300">
                                {currency.symbol}
                              </span>
                              <span>{currency.name}</span>
                              <span className="text-neutral-500">
                                ({currency.code})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-neutral-700 text-neutral-300 hover:bg-neutral-800 bg-transparent"
                      asChild
                    >
                      <Link href="/carteiras">Cancelar</Link>
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-amber-300 hover:bg-amber-200 text-black font-medium"
                      disabled={!walletData.name?.trim()}
                    >
                      Salvar Alterações
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card className="bg-neutral-950/40 border-neutral-900">
                <CardHeader>
                  <CardTitle className="text-amber-300 flex items-center gap-2 text-lg">
                    <WalletIcon className="h-5 w-5" />
                    Suas Carteiras
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {wallets.length > 0 ? (
                    wallets.map((wallet) => {
                      const isCurrentWallet = wallet.id === walletId;
                      return (
                        <div
                          key={wallet.id}
                          className={`
                            flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer
                            ${
                              isCurrentWallet
                                ? "bg-amber-300/10 border-2 border-amber-300/30"
                                : "bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50"
                            }
                          `}
                          onClick={() => {
                            if (!isCurrentWallet) {
                              router.push(`/carteiras/${wallet.id}/editar`);
                            }
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: wallet.color || "#aaa" }}
                          >
                            {wallet.imageUrl ? (
                              <img
                                src={wallet.imageUrl || "/placeholder.svg"}
                                alt="Wallet icon"
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <WalletIcon className="h-5 w-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-neutral-100 font-medium text-sm truncate">
                                {wallet.name}
                              </h4>
                              {isCurrentWallet && (
                                <span className="text-xs bg-amber-300 text-black px-2 py-0.5 rounded-full font-medium">
                                  Editando
                                </span>
                              )}
                            </div>
                            <p className="text-amber-300 text-xs font-semibold">
                              {currencies.find(
                                (c) => c.code === wallet.currency
                              )?.symbol || "R$"}{" "}
                              {wallet.balance.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <WalletIcon className="h-12 w-12 text-neutral-600 mx-auto mb-3" />
                      <p className="text-neutral-500 text-sm">
                        Nenhuma carteira criada ainda
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>{" "}
    </AuthenticatedLayout>
  );
}
