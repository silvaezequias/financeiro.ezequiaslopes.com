import brand from "@/lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Entre em contato - ${brand.brandName}`,
  description:
    "Fale diretamente comigo sobre projetos, colaborações ou dúvidas.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
