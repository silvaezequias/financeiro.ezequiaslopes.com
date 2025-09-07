import credentials from "@/lib/authorization/credentials";
import { AuthenticatedContext } from "@/middleware/flow";
import validation from "@/validation";
import { ForbiddenError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";
import { database } from "@/lib/database";

export const handleGetValidation: Middleware<AuthenticatedContext> = async (
  req,
  _,
  next
) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.wallet.ReadWalletList)) {
    throw new ForbiddenError({
      message: "Você não tem permissão para acessar a lista de carteiras.",
    });
  }

  return next();
};

export const handleGet: Middleware<AuthenticatedContext> = async (req) => {
  const user = req.context.session.user;

  const walletsMember =
    (await database?.walletMember.findMany({
      where: {
        userId: user.id,
        wallet: { deleted: false },
      },
      include: {
        wallet: {
          include: {
            _count: {
              select: {
                WalletMember: true,
                Transaction: true,
                CreditCard: true,
              },
            },
          },
        },
      },
    })) || [];

  const output = [];

  for (const { wallet: currentWallet } of walletsMember) {
    const wallet = await validation.wallet(
      {
        id: true,
        name: true,
        color: false,
        imageUrl: false,
        balance: true,
        currency: true,
        createdAt: true,
      },
      currentWallet
    );

    const stats = {
      creditCards: currentWallet._count.CreditCard,
      members: currentWallet._count.WalletMember,
      transactions: currentWallet._count.Transaction,
    };

    output.push({ ...wallet, stats });
  }

  return Response.json(JSON.parse(JSON.stringify(output)));
};
