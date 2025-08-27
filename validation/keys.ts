import { RolesId } from "@/lib/authorization/role";
import { validateCpf } from "@/lib/validateCpf";
import { z } from "zod";

const MIN_AGE = 16;
const validationKeys = {
  cpf: z
    .string()
    .transform((doc) => doc.replace(/\D/g, ""))
    .refine(
      (doc) => /^\d{11}$/.test(doc),
      "CPF precisa estar em um formato válido"
    )
    .refine(async (doc) => {
      const { valid, verified } = await validateCpf(doc);
      return valid && verified;
    }, "CPF não existe ou não é válido."),

  phone: z
    .string()
    .transform((doc) => doc.replace(/\D/g, ""))
    .refine((doc) => {
      return [10, 11].includes(doc.length);
    }, "Telefone inserido não é válido."),

  email: z.string().email("Email inserido não é válido."),
  role: z.enum(RolesId),
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inserido está inválido"),
  name: z
    .string()
    .min(3, "Nome precisa ter no mínimo 3 caracteres.")
    .max(100, "Nome pode ter no máximo 100 caracteres.")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome não está em um formato válido.")
    .transform((val) => val.trim().toLowerCase()),
  verified: z.boolean({
    message: "A chave de verificado não está em um formato válido.",
  }),

  birthDate: z
    .string()
    .refine((val) => {
      const parsed = new Date(val);
      return !isNaN(parsed.getTime());
    }, "Data inserida está inválida.")
    .transform((val) => new Date(val))
    .refine((date) => {
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      const dayDiff = today.getDate() - date.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      return age >= MIN_AGE;
    }, `Lei nº 10.406/2002 | A idade mínima para essa operação é de ${MIN_AGE} anos.`),

  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(64, "Senha deve ter no máximo 64 caracteres")
    .refine(
      (val) => /[A-Z]/.test(val),
      "Senha deve conter pelo menos uma letra maiúscula"
    )
    .refine(
      (val) => /[a-z]/.test(val),
      "Senha deve conter pelo menos uma letra minúscula"
    )
    .refine(
      (val) => /[0-9]/.test(val),
      "Senha deve conter pelo menos um número"
    )
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Senha deve conter pelo menos um caractere especial"
    ),

  color: z.string().regex(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Cor em HEX inválida",
  }),

  imageUrl: z.string().regex(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "URL inválido para imagem",
  }),

  amount: z
    .number()
    .int({ message: "O valor deve ser em números inteiros (em centavos)." }),
  limit: z
    .number()
    .int({ message: "O valor deve ser em números inteiros (em centavos)." }),
  usedAmout: z
    .number()
    .int({ message: "O valor deve ser em números inteiros (em centavos)." }),
  billingDate: z
    .number()
    .int({ message: "O dia da fatura deve ser um número inteiro" })
    .min(1, { message: "O dia da fatura deve estar entre 1 e 31" })
    .max(31, { message: "O dia da fatura deve estar entre 1 e 31" }),
  visibleTo: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "ID está inválido")),
  get walletId() {
    return this.id;
  },
  get userId() {
    return this.id;
  },
  get creditCardId() {
    return this.id;
  },
};

export type KOValidationKeys = keyof typeof validationKeys;
export default validationKeys;
