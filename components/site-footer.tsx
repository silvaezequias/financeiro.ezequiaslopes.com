import Link from "next/link";
import { garamond, jetmono } from "@/lib/fonts";
import brand from "@/lib/brand";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-900/60 bg-black">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className={`${garamond.className} text-lg text-neutral-200`}>
              Seu espaço seguro para gerenciar finanças.
            </h3>
            <p className="text-sm text-neutral-500 mt-1">
              Economize seu tempo e dinheiro com nossa plataforma financeira.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <a
              href="/contact"
              className={`${jetmono.className} text-xs uppercase tracking-widest text-amber-300 hover:text-amber-200`}
            >
              {brand.brandEmail}
            </a>
            <div
              className={`${jetmono.className} text-xs uppercase tracking-widest text-neutral-500`}
            >
              © {new Date().getFullYear()} Ezequias Lopes
            </div>
          </div>
        </div>
        <div className="mt-6 text-sm text-neutral-500">
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://github.com/silvaezequias"
              className="hover:text-neutral-300"
              target="_blank"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
