import validation from "@/validation";
import credentials, {
  WalletPermissions,
} from "@/lib/authorization/credentials";
import { authenticatedController } from "@/middleware";
import { AuthenticatedContext } from "@/middleware/flow";
import { Wallet } from "@prisma/client";
import { ConflictError, ForbiddenError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";

type CreateWalletContext = AuthenticatedContext & {
  walletData: Partial<Wallet>;
};

const handlePostValidation: Middleware<CreateWalletContext> = async (
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
      color: false,
      imageUrl: false,
    },
    props
  );

  const walletExists = await database!.wallet.findFirst({
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

const handlePost: Middleware<CreateWalletContext> = async (req) => {
  const { walletData } = req.context;
  const user = req.context.session.user;

  const walletObject = await database!.wallet.create({
    data: { ...walletData, name: walletData.name!, createdById: user.id },
  });

  const walletMember = await database!.walletMember.create({
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

  const wallet = await validation.wallet(
    {
      id: true,
      name: true,
      color: false,
      imageUrl: false,
    },
    walletObject
  );

  return Response.json({ member: { ...member, wallet } }, { status: 201 });
};

const handleGetValidation: Middleware<CreateWalletContext> = async (
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

const handleGet: Middleware<AuthenticatedContext> = async (req) => {
  const user = req.context.session.user;

  const walletsMember =
    (await database?.walletMember.findMany({
      where: { userId: user.id },
      include: { wallet: true },
    })) || [];

  const output = [];

  for (const walletMember of walletsMember) {
    const member = await validation.walletMember(
      { joinedAt: true, permissions: true },
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

    output.push({ member: { ...member, wallet } });
  }

  return Response.json(JSON.parse(JSON.stringify(output)));
};

authenticatedController
  .post(handlePostValidation, handlePost)
  .get(handleGetValidation, handleGet);

export const GET = authenticatedController.expose();
export const POST = authenticatedController.expose();
