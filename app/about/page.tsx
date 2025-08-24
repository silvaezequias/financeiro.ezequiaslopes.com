import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import GrainBG from "@/components/grain-bg";
import { garamond, jetmono } from "@/lib/fonts";
import type { Metadata } from "next";
import brand from "@/lib/brand";

export const metadata: Metadata = {
  title: `Sobre Nós - ${brand.brandName}`,
  description:
    "Conheça mais sobre mim, Ezequias Lopes, e minha paixão por tecnologia, fotografia e música.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-neutral-200">
      <GrainBG>
        <SiteHeader />
        <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-20">
          <div className="grid gap-10 items-center justify-center">
            <div>
              <h1
                className={`${garamond.className} text-3xl sm:text-4xl text-neutral-100`}
              >
                Sobre Nós
              </h1>
              <p
                className={`${jetmono.className} mt-3 text-neutral-400 max-w-prose text-justify`}
              >
                Seja bem-vindo à nossa plataforma financeira, sua parceira ideal
                para um controle financeiro descomplicado e eficiente. Nós
                acreditamos que a gestão das suas finanças deve ser simples,
                transparente e acessível a todos.
                <br />
                <br /> Nosso objetivo é ajudar você a organizar seus gastos e
                receitas, oferecendo uma visão clara e detalhada da sua saúde
                financeira. Com uma interface intuitiva, você pode registrar
                suas transações, acompanhar seu progresso e fazer projeções
                futuras, ajudando você a tomar decisões mais inteligentes.
                <br />
                <br />
                Valorizamos a confiança e a segurança dos nossos usuários. Por
                isso, nossos sistemas são projetados com os mais altos padrões
                de proteção de dados (Seguindo a{" "}
                <a
                  className="text-amber-300 underline"
                  target="_blank"
                  href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
                >
                  {" "}
                  Lei nº13.709/2018
                </a>
                ). Além disso, estamos sempre em busca de inovação: no futuro,
                vamos integrar transações diretamente na plataforma e também
                implementar recursos de open finance, permitindo que você tenha
                uma visão ainda mais completa das suas finanças, integrando
                todas as suas contas bancárias em um só lugar.
                <br />
                <br /> No momento, nosso foco principal é ajudar você a
                economizar e a manter suas finanças em dia, mas nosso
                compromisso é crescer junto com você, sempre trazendo novas
                funcionalidades que facilitem ainda mais a sua vida.
              </p>
            </div>
          </div>
        </section>
        <SiteFooter />
      </GrainBG>
    </main>
  );
}
