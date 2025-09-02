import credentials from "@/lib/authorization/credentials";
import { authenticatedController } from "@/middleware";
import {
  AuthenticatedContext,
  AuthenticatedSession,
  FlowContext,
} from "@/middleware/flow";
import validation from "@/validation";
import { Wallet } from "@prisma/client";
import { NotFoundError, UnauthorizedError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";

type WalletParms = {
  walletId: string;
};

type WalletContext = AuthenticatedContext & {
  walletData: Pick<Wallet, "id">;
};

const handleValidationGet: Middleware<WalletContext, WalletParms> = async (
  req,
  promiseParams,
  next
) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.wallet.ReadWallet)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para acessar a essa carteira.",
    });
  }

  const params = await (promiseParams as unknown as Promise<WalletParms>);
  const walletObject = await validation.wallet(
    { id: true },
    { id: params.walletId }
  );

  req.context.walletData = walletObject as WalletContext["walletData"];

  return next();
};

const handleGet: Middleware<WalletContext> = async (req) => {
  const user = req.context.session.user;
  const walletObject = req.context.walletData;

  const walletMember = await database!.walletMember.findUnique({
    where: {
      userId_walletId: {
        userId: user.id,
        walletId: walletObject.id,
      },
    },
    include: { wallet: true },
  });

  if (!walletMember) {
    throw new NotFoundError({
      message: "Essa carteira não existe ou você não tem acesso à ela.",
    });
  }

  const member = await validation.walletMember(
    {
      joinedAt: true,
      permissions: true,
    },
    walletMember
  );

  const wallet = await validation.wallet(
    {
      id: true,
      name: true,
      color: false,
      imageUrl: false,
    },
    walletMember.wallet
  );

  return Response.json({ member: { ...member, wallet } });
};

const handleDeleteValidation: Middleware<WalletContext> = (req, _, next) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.wallet.DeleteWallet)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para deletar essa carteira.",
    });
  }

  return next();
};

const handleDelete: Middleware<WalletContext, WalletParms> = async (
  req,
  params
) => {
  const user = req.context.session.user;

  const walletMember = await database!.walletMember.findFirst({
    where: {
      userId: user.id,
      walletId: params.walletId,
    },
    include: { wallet: true },
  });

  if (!walletMember || !walletMember.wallet) {
    throw new NotFoundError({
      message: "Essa carteira não foi encontrada.",
    });
  }

  return Response.json({ params });
};

authenticatedController
  .get(handleValidationGet, handleGet)
  .delete(handleDeleteValidation, handleDelete);

export const GET = authenticatedController.expose();
export const DELETE = authenticatedController.expose();
