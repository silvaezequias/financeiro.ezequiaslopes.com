"use client";

import type React from "react";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { garamond } from "@/lib/fonts";
import Layout from "@/components/Layout";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    phone: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatCPF = (value: string) => {
    let numbers = value.replace(/\D/g, "");

    numbers = numbers.replace(/^(\d{3})(\d)/, "$1.$2");
    numbers = numbers.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    numbers = numbers.replace(/\.(\d{3})(\d)/, ".$1-$2");
    numbers = numbers.slice(0, 14);

    return numbers;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // TODO: Implementar lógica de registro
    console.log("Registro:", formData);
  };

  const handleGoogleRegister = () => {
    // TODO: Implementar registro com Google
    console.log("Registro com Google");
  };

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 sm:px-6 pt-16 pb-24">
        <div className="text-center mb-8">
          <h1
            className={`${garamond.className} text-3xl text-neutral-100 mb-2`}
          >
            Criar sua conta
          </h1>
          <p className="text-neutral-400">
            Comece a controlar suas finanças hoje
          </p>
        </div>

        <Card className="bg-neutral-950/40 border-neutral-900">
          <CardHeader className="space-y-1">
            <CardTitle className="text-neutral-100">Registro</CardTitle>
            <CardDescription className="text-neutral-400">
              Preencha seus dados para criar uma conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleRegister}
              variant="outline"
              className="w-full border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Registrar com Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-950 px-2 text-neutral-500">ou</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-neutral-200">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="pl-10 bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-neutral-200">
                  CPF
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) =>
                      handleInputChange("cpf", formatCPF(e.target.value))
                    }
                    className="pl-10 bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                    maxLength={14}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-neutral-200">
                  Telefone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="phone"
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", formatPhone(e.target.value))
                    }
                    className="pl-10 bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                    maxLength={15}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-neutral-200">
                  Data de Nascimento
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    className="pl-10 bg-neutral-900/50 border-neutral-700 text-neutral-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-neutral-200">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10 bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-neutral-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-neutral-200">
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="pl-10 pr-10 bg-neutral-900/50 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-neutral-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-300 text-black hover:bg-amber-200"
              >
                Criar Conta
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-neutral-400">Já tem uma conta? </span>
              <Link
                href="/login"
                className="text-amber-300 hover:text-amber-200 underline"
              >
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}
