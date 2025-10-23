import {
  CreditCard,
  Transaction,
  User,
  Wallet,
  WalletAuditLog,
  WalletMember,
  WalletSummary,
} from "@prisma/client";
import { BadRequestError } from "nextfastapi/errors";
import validationKeys, { KOValidationKeys } from "./keys";
import { ZodError } from "zod";
import { locale, locales } from "@/i18n";

type Bool<Schema> = Partial<Record<keyof Schema, boolean>>;

const validation = {
  user: validate<User>,
  wallet: validate<Wallet>,
  walletMember: validate<WalletMember>,
  walletSummary: validate<
    WalletSummary & { toYear: number; toMonth: number; isPlaceholder: boolean }
  >,
  walletAuditLog: validate<WalletAuditLog>,
  transaction: validate<Transaction>,
  creditCard: validate<CreditCard>,
};

function validate<Model>(
  requiredKeys: Bool<Model>,
  data: Partial<Model>,
  lang: keyof typeof locales = "pt-br"
) {
  const $ = locale(lang);
  const filteredInput: Partial<Model> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key in requiredKeys)
      filteredInput[key as keyof Model] = value as typeof value & undefined;
  });

  for (const [key, value] of Object.entries(requiredKeys)) {
    if (value) {
      if (!(key in filteredInput)) {
        const { message, action } = $.validation.missingRequiredKeys;
        throw new BadRequestError({ message, action });
      }
    }

    if (key in validationKeys && key in filteredInput) {
      try {
        if (filteredInput[key as keyof Model] || value) {
          const validated = validationKeys[key as KOValidationKeys]?.parse(
            filteredInput[key as keyof Model]
          );

          filteredInput[key as keyof Model] = validated as typeof validated &
            undefined;
        }
      } catch (err) {
        let message = $.validation.someWrongData.message;

        if (err instanceof Error) message = err.message;
        if (err instanceof ZodError) message = err.errors[0].message;

        throw new BadRequestError({ message, action: key });
      }
    }
  }

  return filteredInput;
}

export default validation;
