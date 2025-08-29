import controller from "@/middleware";
import { AuthenticatedSession, FlowContext } from "@/middleware/flow";
import validation from "@/validation";
import { Wallet } from "@prisma/client";
import { NotFoundError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";

type WalletParms = {
  walletId: string;
};

type WalletContext = FlowContext & {
  walletData: Pick<Wallet, "id">;
};

const handleValidationGet: Middleware<WalletContext, WalletParms> = async (
  req,
  promiseParams,
  next
) => {
  const params = await (promiseParams as unknown as Promise<WalletParms>);
  const walletObject = await validation.wallet(
    { id: true },
    { id: params.walletId }
  );

  req.context.walletData = walletObject as WalletContext["walletData"];

  return next();
};

const handleGet: Middleware<WalletContext & AuthenticatedSession> = async (
  req,
  promiseParams
) => {
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

controller.get(handleValidationGet, handleGet);

export const GET = controller.expose();
