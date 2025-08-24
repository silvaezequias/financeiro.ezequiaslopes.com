import Link from "next/link";
import {
  PieChart,
  Users,
  TrendingUp,
  Shield,
  Smartphone,
  BarChart3,
  Target,
  DollarSign,
} from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import GrainBG from "@/components/grain-bg";
import { Button } from "@/components/ui/button";
import { garamond, jetmono } from "@/lib/fonts";

export default function FinancePage() {
  return (
    <main className="min-h-screen bg-black text-neutral-200">
      <GrainBG>
        <SiteHeader />
        <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 items-center">
            <div>
              <p
                className={`${jetmono.className} text-[11px] uppercase tracking-widest text-neutral-500`}
              >
                Finanças • Pessoal • Grupos
              </p>
              <h1
                className={`${garamond.className} mt-3 text-4xl sm:text-5xl leading-tight text-neutral-100`}
              >
                Controle suas finanças pessoais e em grupos com simplicidade.
              </h1>
              <p className="mt-5 text-neutral-400 max-w-prose">
                Organize seus gastos, planeje seu futuro e colabore com amigos e
                família. Tudo em um só lugar, de forma simples e segura.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  className="bg-amber-300 text-black hover:bg-amber-200"
                >
                  <Link href="/dashboard">Acessar Dashboard</Link>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div className="rounded-lg border border-neutral-900 bg-neutral-950/40 p-4">
                  <PieChart className="h-5 w-5 text-amber-300" />
                  <div className="mt-2 text-sm text-neutral-400">
                    Controle de Gastos
                  </div>
                </div>
                <div className="rounded-lg border border-neutral-900 bg-neutral-950/40 p-4">
                  <Users className="h-5 w-5 text-amber-300" />
                  <div className="mt-2 text-sm text-neutral-400">
                    Finanças em Grupo
                  </div>
                </div>
                <div className="rounded-lg border border-neutral-900 bg-neutral-950/40 p-4">
                  <Target className="h-5 w-5 text-amber-300" />
                  <div className="mt-2 text-sm text-neutral-400">
                    Metas Financeiras
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-900 bg-neutral-950">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    <DollarSign className="h-5 w-5" />
                    <span
                      className={`${jetmono.className} text-xs uppercase tracking-widest`}
                    >
                      Resumo Financeiro
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Receitas</span>
                      <span className="text-amber-300 font-semibold">
                        R$ 5.240
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Gastos</span>
                      <span className="text-neutral-200 font-semibold">
                        R$ 3.180
                      </span>
                    </div>
                    <div className="border-t border-neutral-800 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-200 font-medium">
                          Saldo
                        </span>
                        <span className="text-amber-300 font-bold text-xl">
                          R$ 2.060
                        </span>
                      </div>
                    </div>
                    <div className="bg-neutral-900/60 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <TrendingUp className="h-4 w-4 text-amber-300" />
                        <span>+12% em relação ao mês passado</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-neutral-900/60" />
              </div>
              <p
                className={`${jetmono.className} mt-3 text-[10px] uppercase tracking-widest text-neutral-500`}
              >
                {'"Organize. Planeje. Conquiste."'}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
          <div className="flex items-end justify-between">
            <h2 className={`${garamond.className} text-2xl text-neutral-100`}>
              Recursos Principais
            </h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BarChart3,
                title: "Relatórios Detalhados",
                description:
                  "Análises completas dos seus hábitos financeiros com insights personalizados",
              },
              {
                icon: Shield,
                title: "Segurança Total",
                description:
                  "Seus dados protegidos com criptografia de ponta e backup automático",
              },
              {
                icon: Smartphone,
                title: "Acesso Multiplataforma",
                description:
                  "Use no celular, tablet ou computador. Seus dados sempre sincronizados",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-neutral-900 bg-neutral-950/40 p-6"
              >
                <feature.icon className="h-6 w-6 text-amber-300 mb-3" />
                <h3 className="text-neutral-100 font-medium mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SiteFooter />
      </GrainBG>
    </main>
  );
}
