import formatter from "@/formatter";
import { UserRole } from "@/lib/authorization/role";
import { validateCpf } from "@/lib/validateCpf";
import { User } from "@prisma/client";
import { BadRequestError } from "nextfastapi/errors";

type Bool<Schema> = Partial<Record<keyof Schema, boolean>>;

const validation = {
  user: validateUser,
};

async function validateUser(requiredKeys: Bool<User>, data: Partial<User>) {
  Object.entries(requiredKeys).forEach(([key, value]) => {
    if (value) {
      if (!(key in data) || !data[key as unknown as keyof User]) {
        throw new BadRequestError({
          message: "Insira todos os dados necessários.",
          action: key,
        });
      }
    }
  });

  const CPF = await validateCpf(data.cpf!);
  const userObject: Partial<User> = {};

  if (!CPF.valid) {
    throw new BadRequestError({
      message: "Este CPF é inválido.",
    });
  }

  const { cpf, phone, birthDate, ...leftData } = data;

  Object.entries(leftData).forEach(([key, value]) => {
    if (key in requiredKeys) {
      userObject[key as keyof User] = value as typeof value & undefined;
    }
  });

  if ("cpf" in requiredKeys) {
    userObject.cpf = formatter.extract.onlyNumbers(data.cpf!);
  }

  if ("phone" in requiredKeys) {
    userObject.phone = formatter.extract.onlyNumbers(data.phone!);

    if (
      !userObject.phone ||
      userObject.phone.length < 10 ||
      userObject.phone.length > 11
    ) {
      throw new BadRequestError({
        message: "Insira um telefone válido",
      });
    }
  }

  if ("birthDate" in requiredKeys) {
    userObject.birthDate = new Date(data.birthDate!);
  }

  if ("verified" in requiredKeys) {
    userObject.verified = CPF.verified;
  }

  if ("role" in requiredKeys) {
    userObject.role = UserRole.id;
  }

  return userObject;
}

export default validation;
