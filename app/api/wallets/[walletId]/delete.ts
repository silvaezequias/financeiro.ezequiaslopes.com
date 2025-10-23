import { NotFoundError, UnauthorizedError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";
import { AuthenticatedContext } from "@/middleware/flow";
import validation from "@/validation";
import credentials from "@/lib/authorization/credentials";
import { database } from "@/lib/database";

type DeleteParams = {
  walletId: string;
};

type DeleteContext = AuthenticatedContext & {
  walletId: string;
};

export const handleDeleteValidation: Middleware<DeleteContext> = async (
  req,
  params,
  next
) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.wallet.DeleteWallet)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para deletar essa carteira.",
    });
  }

  const { id: walletId } = await validation.wallet(
    { id: true },
    { id: params.walletId }
  );

  req.context.walletId = walletId!;

  return next();
};

export const handleDelete: Middleware<DeleteContext, DeleteParams> = async (
  req
) => {
  const user = req.context.session.user;

  const walletMember = await database.walletMember.findFirst({
    where: {
      userId: user.id,
      walletId: req.context.walletId,
      wallet: { deleted: false },
    },
    include: { wallet: true },
  });

  if (!walletMember || !walletMember.wallet) {
    throw new NotFoundError({
      message: "Essa carteira não foi encontrada.",
    });
  }

  await database?.wallet.update({
    where: { id: walletMember.walletId },
    data: { deleted: true },
  });

  return Response.json({ deleted: "ok" }, { status: 200 });
};
