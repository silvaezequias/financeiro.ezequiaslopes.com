import { ptBR } from "./locales/pt";

export const locales = {
  "pt-br": ptBR,
};

export function locale(lang: keyof typeof locales = "pt-br") {
  return locales[lang];
}
