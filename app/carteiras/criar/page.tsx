"use client";

import type React from "react";

import { useState } from "react";
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
import { ArrowLeft, Wallet, Palette } from "lucide-react";
import Link from "next/link";
import { garamond } from "@/lib/fonts";
import { Layout } from "@/components/Interface/Layout";
import smartFetch from "@/lib/smartFetch";
import formatter from "@/formatter";
import { useUserWallets } from "@/hooks/useUserWallets";
import Image from "next/image";
import { GetWallets } from "@/types/wallet";
import { useRouter } from "next/navigation";

export default function NewWalletPage() {
  const [walletData, setWalletData] = useState({
    name: "",
    color: "#f59e0b",
    imageUrl: "",
    currency: "BRL",
  });
  const [loading, setLoading] = useState(false);

  const { wallets, setCurrentWallet } = useUserWallets();
  const router = useRouter();

  const predefinedColors = [
    { name: "Verde", value: "#10b981", bg: "bg-emerald-500" },
    { name: "Teal", value: "#14b8a6", bg: "bg-teal-500" },
    { name: "Azul", value: "#3b82f6", bg: "bg-blue-500" },
    { name: "Índigo", value: "#6366f1", bg: "bg-indigo-500" },
    { name: "Roxo", value: "#8b5cf6", bg: "bg-violet-500" },
    { name: "Rosa", value: "#ec4899", bg: "bg-pink-500" },
    { name: "Vermelho", value: "#ef4444", bg: "bg-red-500" },
    { name: "Laranja", value: "#f97316", bg: "bg-orange-500" },
    { name: "Âmbar", value: "#f59e0b", bg: "bg-amber-300" },
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
    if (field === "name") {
      value = formatter.text.capitalize(value);
    }

    setWalletData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = (await smartFetch("/api/wallets/", {
      method: "POST",
      body: JSON.stringify(walletData),
    })) as GetWallets;

    if (res) router.push(`/carteiras/${res.id}`);

    setLoading(false);
  };

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {/* Header */}
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
              <div>
                <h1
                  className={`${garamond.className} text-3xl text-neutral-100 mb-2`}
                >
                  Nova Carteira
                </h1>
                <p className="text-neutral-400">
                  Crie uma nova carteira para organizar suas finanças
                </p>
              </div>
            </div>

            {/* Preview Card */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-amber-300 mb-4">
                Pré-visualização
              </h2>
              <Card className="bg-neutral-950/40 border-neutral-900 max-w-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: walletData.color }}
                    >
                      {walletData.imageUrl ? (
                        <Image
                          src={walletData.imageUrl || "/placeholder.svg"}
                          alt="Wallet icon"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <Wallet className="h-6 w-6 text-white" />
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <Card className="bg-neutral-950/40 border-neutral-900">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
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
                      <Wallet className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
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
                        value={walletData.color}
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
                      value={walletData.imageUrl}
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

                  {/* Botões de Ação */}
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
                      disabled={!walletData.name.trim() || loading}
                    >
                      {loading ? "Verificando..." : "Criar Carteira"}
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
                    <Wallet className="h-5 w-5" />
                    Suas Carteiras
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {wallets.length > 0 ? (
                    wallets.map((wallet) => (
                      <div
                        key={wallet.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700 transition-colors"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
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
                        <div className="flex-1 min-w-0">
                          <h4 className="text-neutral-100 font-medium text-sm truncate">
                            {wallet.name}
                          </h4>
                          <p className="text-amber-300 text-xs font-semibold">
                            {formatter.number.currency(
                              wallet.balance,
                              wallet.currency
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Wallet className="h-12 w-12 text-neutral-600 mx-auto mb-3" />
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
      </section>
    </Layout>
  );
}
