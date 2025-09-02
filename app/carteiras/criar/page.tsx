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
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { garamond } from "@/lib/fonts";
import Layout from "@/components/Layout";
import smartFetch from "@/lib/smartFetch";

export default function NewWalletPage() {
  const [walletData, setWalletData] = useState({
    name: "",
    color: "#f59e0b",
    imageUrl: "",
    currency: "BRL",
  });

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
    setWalletData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    smartFetch("/api/wallets/", {
      method: "POST",
      body: JSON.stringify(walletData),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log);
  };

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-4 sm:px-6 pt-16 pb-24">
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
                    <img
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
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              {/* Cor da Carteira */}
              <div className="space-y-3">
                <Label className="text-neutral-200">Cor da Carteira *</Label>
                <div className="grid grid-cols-5 gap-3">
                  {predefinedColors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleInputChange("color", color.value)}
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
                    onChange={(e) => handleInputChange("color", e.target.value)}
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
                  <Link href="/dashboard">Cancelar</Link>
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-amber-300 hover:bg-amber-200 text-black font-medium"
                  disabled={!walletData.name.trim()}
                >
                  Criar Carteira
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}
