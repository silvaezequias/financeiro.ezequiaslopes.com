import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { database } from "@/lib/database";
import controller from "@/middleware";
import { Middleware } from "nextfastapi/types";
import { FlowContext } from "@/middleware/flow";
import { BadRequestError } from "nextfastapi/errors";
import { User } from "@prisma/client";
import validation from "@/validation";

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

  if (props.password !== confirmPassword) {
    throw new BadRequestError({ message: "As senhas não conferem." });
  }

  const existingUser = await database.user.findFirst({
    where: { OR: [{ cpf: userObject.cpf }, { email: userObject.email }] },
  });

  if (existingUser) {
    throw new BadRequestError({
      message: "Já existe um cadastrado com esse CPF ou Email.",
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
      role: userData.role,
    },
  });

  return Response.json(userData, { status: 201 });
};

controller.post(handlePostValidation, handlePost);
export const POST = controller.expose();
