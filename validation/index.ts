import {
  CreditCard,
  Transaction,
  User,
  Wallet,
  WalletAuditLog,
  WalletMember,
} from "@prisma/client";
import { BadRequestError, transformError } from "nextfastapi/errors";
import validationKeys, { KOValidationKeys } from "./keys";
import { ZodError } from "zod";

type Bool<Schema> = Partial<Record<keyof Schema, boolean>>;

const validation = {
  user: validate<User>,
  wallet: validate<Wallet>,
  walletMember: validate<WalletMember>,
  walletAuditLog: validate<WalletAuditLog>,
  transaction: validate<Transaction>,
  creditCard: validate<CreditCard>,
};

async function validate<Model>(
  requiredKeys: Bool<Model>,
  data: Partial<Model>
) {
  const filteredInput: Partial<Model> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key in requiredKeys)
      filteredInput[key as keyof Model] = value as typeof value & undefined;
  });

  for (const [key, value] of Object.entries(requiredKeys)) {
    if (value) {
      if (!(key in filteredInput)) {
        throw new BadRequestError({
          message: "Insira todos os dados necessários.",
          action: key,
        });
      }
    }

    if (key in validationKeys && key in filteredInput) {
      try {
        if (filteredInput[key as keyof Model] || value) {
          const validated = await validationKeys[
            key as KOValidationKeys
          ]?.parseAsync(filteredInput[key as keyof Model]);

          filteredInput[key as keyof Model] = validated as typeof validated &
            undefined;
        }
      } catch (err) {
        let message = "Algum dado está incorreto.";

        if (err instanceof Error) message = err.message;
        if (err instanceof ZodError) message = err.errors[0].message;

        throw new BadRequestError({ message });
      }
    }
  }

  return filteredInput;
}

export default validation;
