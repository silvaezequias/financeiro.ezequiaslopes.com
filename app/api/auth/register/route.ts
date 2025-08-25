import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { database } from "@/lib/database";
import { validateCpf } from "@/lib/validateCpf";

export async function POST(req: NextRequest) {
  const { name, cpf, phone, birthDate, email, password, confirmPassword } =
    await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "As senhas não conferem" },
      { status: 400 }
    );
  }

  const existingUser = await database.user.findFirst({
    where: { OR: [{ cpf }, { email }] },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "CPF ou Email já existe" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { valid, verified } = await validateCpf(cpf);

  if (!valid) {
    return NextResponse.json({ error: "CPF Inválido" }, { status: 400 });
  }

  const user = await database.user.create({
    data: {
      name,
      cpf,
      phone,
      birthDate: new Date(birthDate),
      email,
      password: hashedPassword,
      verified,
    },
  });

  return NextResponse.json({ status: "ok" }, { status: 201 });
}
