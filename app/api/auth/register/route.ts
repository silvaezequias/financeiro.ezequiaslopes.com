import bcrypt from "bcryptjs";

import { database } from "@/lib/database";
import { controller } from "@/middleware";
import { Middleware } from "nextfastapi/types";
import { FlowContext } from "@/middleware/flow";
import { BadRequestError, UnauthorizedError } from "nextfastapi/errors";
import { User } from "@prisma/client";
import validation from "@/validation";
import { UserRole } from "@/lib/authorization/role";
import credentials from "@/lib/authorization/credentials";
import { locale } from "@/i18n";

type PostInputBody = {
  name: string;
  cpf: string;
  phone: string;
  birthDate: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type UserRegisterContext = { userData: Partial<User> } & FlowContext;

const handlePostValidation: Middleware<UserRegisterContext> = async (
  req,
  _,
  next
) => {
  const $ = locale(req.context.locale.lang);
  const user = req.context.session.user;

  if (!user.canDo(credentials.session.CreateSession)) {
    const { message, action } = $.api.user.cant.access.userRegister;
    throw new UnauthorizedError({
      message,
      action,
    });
  }

  const { confirmPassword, ...props } = (await req.json()) as PostInputBody;

  const userObject = await validation.user(
    {
      birthDate: true,
      cpf: true,
      email: true,
      name: true,
      phone: true,
      password: true,
    },
    props as unknown as Partial<User>
  );

  if (userObject.password !== confirmPassword) {
    const { message, action } = $.validation.password.mismatch;
    throw new BadRequestError({ message, action });
  }

  const existingUser = await database.user.findFirst({
    where: { OR: [{ cpf: userObject.cpf }, { email: userObject.email }] },
  });

  if (existingUser) {
    const { message, action } = $.validation.email_cpf.exists;

    throw new BadRequestError({
      message,
      action,
    });
  }

  req.context.userData = userObject;
  return next();
};

const handlePost: Middleware<UserRegisterContext> = async (req) => {
  const userData = req.context.userData;
  const hashedPassword = await bcrypt.hash(userData.password!, 10);

  const createdUser = await database.user.create({
    data: {
      name: userData.name!,
      birthDate: userData.birthDate!,
      cpf: userData.cpf!,
      email: userData.email!,
      password: hashedPassword,
      phone: userData.phone,
      role: UserRole.id,
      verified: false,
    },
  });

  return Response.json(userData, { status: 201 });
};

controller.post(handlePostValidation, handlePost);
export const POST = controller.expose();
