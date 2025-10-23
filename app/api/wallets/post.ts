import credentials, {
  WalletPermissions,
} from "@/lib/authorization/credentials";
import { AuthenticatedContext } from "@/middleware/flow";
import validation from "@/validation";
import { Wallet } from "@prisma/client";
import { ConflictError, ForbiddenError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";
import { database } from "@/lib/database";

type CreateWalletContext = AuthenticatedContext & {
  walletData: Partial<Wallet>;
};

export const handlePostValidation: Middleware<CreateWalletContext> = async (
  req,
  _,
  next
) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.wallet.CreateWallet)) {
    throw new ForbiddenError({
      message: "Você não tem permissão para criar uma carteira.",
    });
  }

  const props = await req.json();
  const walletObject = await validation.wallet(
    {
      name: true,
      currency: true,
      color: false,
      imageUrl: false,
    },
    props
  );

  const walletExists = await database.wallet.findFirst({
    where: { createdById: user.id, name: walletObject.name },
  });

  if (walletExists) {
    throw new ConflictError({
      message: "Este nome já está sendo usado por você.",
    });
  }

  req.context.walletData = walletObject;
  return next();
};

export const handlePost: Middleware<CreateWalletContext> = async (req) => {
  const { walletData } = req.context;
  const user = req.context.session.user;

  const walletObject = await database.wallet.create({
    data: { ...walletData, name: walletData.name!, createdById: user.id },
  });

  const walletMember = await database.walletMember.create({
    data: {
      permissions: WalletPermissions.walletMember.owner,
      userId: user.id,
      walletId: walletObject.id,
    },
  });

  const member = await validation.walletMember(
    { joinedAt: true, permissions: true },
    walletMember
  );

  const wallet = validation.wallet(
    {
      id: true,
      name: true,
      currency: true,
      color: false,
      imageUrl: false,
      balance: true,
      createdAt: true,
    },
    walletObject
  );

  const stats = {
    creditCards: 0,
    members: 1,
    transactions: 0,
  };

  return Response.json({ ...wallet, stats }, { status: 201 });
};
