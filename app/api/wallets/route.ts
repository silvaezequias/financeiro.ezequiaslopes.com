import credentials, {
  WalletPermissions,
} from "@/lib/authorization/credentials";
import controller from "@/middleware";
import { AuthenticatedSession, FlowContext } from "@/middleware/flow";
import validation from "@/validation";
import { Wallet, WalletMember } from "@prisma/client";
import { UnauthorizedError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";

type AuthenticatedContext = FlowContext & AuthenticatedSession;
type CreateWalletContext = AuthenticatedContext & {
  walletData: Partial<Wallet>;
};

const handleAuthentication: Middleware<FlowContext> = (req, _, next) => {
  if (!req.context.session.user.canDo(credentials.wallet.CreateWallet)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para criar uma nova carteira.",
    });
  }

  return next();
};

const handlePostValidation: Middleware<CreateWalletContext> = async (
  req,
  _,
  next
) => {
  const props = await req.json();
  const walletObject = await validation.wallet(
    {
      name: true,
      color: false,
      imageUrl: false,
    },
    props
  );

  req.context.walletData = walletObject;
  return next();
};

const handlePost: Middleware<CreateWalletContext> = async (req) => {
  const { walletData } = req.context;

  const user = req.context.session.user;

  const wallet = await database!.wallet.create({
    data: { ...walletData, name: walletData.name! },
  });

  const walletMember = await database?.walletMember.create({
    data: {
      permissions: WalletPermissions.walletMember.owner,
      userId: user.id,
      walletId: wallet.id,
    },
  });

  return Response.json({ wallet, walletMember }, { status: 201 });
};

const handleGet: Middleware<AuthenticatedContext> = async (req) => {
  const walletsMember =
    (await database?.walletMember.findMany({
      where: { userId: req.context.session.user.id },
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

controller
  .use(handleAuthentication)
  .post(handlePostValidation, handlePost)
  .get(handleGet);

export const GET = controller.expose();
export const POST = controller.expose();
