"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  WalletIcon,
  AlertTriangle,
  Users,
  CreditCard,
  Trash2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { garamond } from "@/lib/fonts";
import { Layout } from "@/components/Interface/Layout";
import { useUserWallets } from "@/hooks/useUserWallets";
import { GetWallets } from "@/types/wallet";
import formatter from "@/formatter";
import smartFetch from "@/lib/smartFetch";
import Image from "next/image";

export default function DeleteWalletPage() {
  const params = useParams();
  const router = useRouter();
  const walletId = params.walletId as string;

  const [walletData, setWalletData] = useState<Partial<GetWallets>>({
    name: "",
    color: "#f59e0b",
    imageUrl: "",
    currency: "BRL",
    balance: 0,
    stats: {
      transactions: 0,
      members: 1,
      creditCards: 0,
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [confirmationText, setConfirmationText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { wallets } = useUserWallets();

  const currencies = [
    { code: "BRL", name: "Real Brasileiro", symbol: "R$" },
    { code: "USD", name: "Dólar Americano", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
  ];

  const handleDelete = async () => {
    if (confirmationText !== walletData.name) return;

    setIsDeleting(true);

    const response = await smartFetch(`/api/wallets/${walletId}/`, {
      method: "DELETE",
    });

    if ("deleted" in response) {
      router.push("/carteiras");
    }
  };

  const steps = [
    {
      id: "deletion",
      title: "CONFIRMAÇÃO DE EXCLUSÃO",
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-950/20",
      borderColor: "border-red-900/50",
      content: (
        <div>
          <p className="text-neutral-300 mb-4">
            Você está prestes a excluir permanentemente a carteira{" "}
            <strong className="text-amber-300">"{walletData.name}"</strong>.
          </p>
          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 mb-6">
            <p className="text-red-300 font-semibold mb-2">
              ⚠️ Esta ação é irreversível
            </p>
            <p className="text-neutral-300 text-sm">
              Uma vez excluída, a carteira e todos os seus dados não poderão ser
              recuperados.
            </p>
          </div>
          <Button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Entendo, continuar
          </Button>
        </div>
      ),
    },
    {
      id: "transactions",
      title: "TRANSAÇÕES AFETADAS",
      icon: CreditCard,
      color: "text-orange-400",
      bgColor: "bg-orange-950/20",
      borderColor: "border-orange-900/50",
      content: (
        <div>
          <div className="bg-orange-950/30 border border-orange-900/50 rounded-lg p-4 mb-6">
            <p className="text-orange-300 font-semibold mb-2">
              {walletData.stats?.transactions} transações serão permanentemente
              excluídas
            </p>
            <p className="text-neutral-300 text-sm">
              Todas as transações, histórico de movimentações e relatórios
              relacionados a esta carteira serão removidos do sistema e não
              poderão ser recuperados.
            </p>
          </div>
          <Button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            Confirmo a exclusão das transações
          </Button>
        </div>
      ),
    },
  ];

  if (walletData.stats?.members! > 1) {
    steps.push({
      id: "users",
      title: "USUÁRIOS AFETADOS",
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-950/20",
      borderColor: "border-purple-900/50",
      content: (
        <div>
          <div className="bg-purple-950/30 border border-purple-900/50 rounded-lg p-4 mb-6">
            <p className="text-purple-300 font-semibold mb-3">
              {walletData.stats?.members} usuários perderão acesso a esta
              carteira
            </p>
            <div className="space-y-2 mb-4">
              {/* {walletData.sharedUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-neutral-300"
                >
                  <Users className="h-4 w-4 text-purple-400" />
                  <span>{user}</span>
                </div>
              ))} */}
            </div>
            <p className="text-neutral-400 text-sm">
              Deseja realmente continuar?
            </p>
          </div>
          <Button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Confirmo a remoção dos usuários
          </Button>
        </div>
      ),
    });
  }

  steps.push({
    id: "final",
    title: "CONFIRMAÇÃO FINAL",
    icon: Trash2,
    color: "text-red-400",
    bgColor: "bg-red-950/20",
    borderColor: "border-red-900/50",
    content: (
      <div>
        <div className="mb-6">
          <Label
            htmlFor="confirmation-text"
            className="text-neutral-200 mb-2 block"
          >
            Digite o nome da carteira{" "}
            <strong className="text-amber-300">"{walletData.name}"</strong> para
            confirmar:
          </Label>
          <Input
            id="confirmation-text"
            type="text"
            placeholder={walletData.name}
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            className="bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
          />
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 border-neutral-700 text-neutral-300 hover:bg-neutral-800 bg-transparent"
            asChild
          >
            <Link href={`/carteiras/${walletId}/editar`}>Cancelar</Link>
          </Button>
          <Button
            onClick={handleDelete}
            disabled={confirmationText !== walletData.name || isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Permanentemente
              </>
            )}
          </Button>
        </div>
      </div>
    ),
  });

  useEffect(() => {
    if (wallets.length) {
      const wallet = wallets.find((w) => w.id === walletId);

      if (wallet) {
        setWalletData(wallet);
      } else {
        router.push("/carteiras/nao-encontrada");
      }

      setIsLoading(false);
    }
  }, [walletId, wallets, router]);

  if (isLoading) {
    return (
      <Layout>
        <section className="mx-auto max-w-2xl px-4 sm:px-6 pt-16 pb-24">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-300 mx-auto mb-4"></div>
              <p className="text-neutral-400">Carregando carteira...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-4 sm:px-6 pt-16 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/carteiras/${walletId}/editar`}>
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
            <h1 className={`${garamond.className} text-3xl text-red-400 mb-2`}>
              Excluir Carteira
            </h1>
            <p className="text-neutral-400">
              Etapa {currentStep + 1} de {steps.length}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentStep
                    ? "bg-amber-600 text-white"
                    : index === currentStep
                    ? "bg-amber-300 text-black"
                    : "bg-neutral-700 text-neutral-400"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 ${
                    index < currentStep ? "bg-amber-600" : "bg-neutral-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Carteira a ser excluída */}
        <Card className="bg-neutral-950/90 border-neutral-800/50 rounded-xl max-w-full mb-8">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              CARTEIRA A SER EXCLUÍDA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: walletData.color || "#aaa" }}
              >
                {walletData.imageUrl ? (
                  <Image
                    src={walletData.imageUrl || "/placeholder.svg"}
                    alt="Wallet icon"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <WalletIcon className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-neutral-100 font-semibold text-xl">
                  {walletData.name}
                </h3>
                <p className="text-neutral-400">
                  {currencies.find((c) => c.code === walletData.currency)?.name}
                </p>
                <p className="text-amber-300 font-bold text-lg">
                  {formatter.number.currency(
                    walletData.balance!,
                    walletData.currency!
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-neutral-950/90 border-neutral-800/50 rounded-xl max-w-full  border`}
        >
          <CardHeader>
            <CardTitle
              className={`${currentStepData.color} flex items-center gap-2`}
            >
              <currentStepData.icon className="h-5 w-5" />
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>{currentStepData.content}</CardContent>
        </Card>
      </section>
    </Layout>
  );
}
