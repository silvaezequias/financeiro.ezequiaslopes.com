import credentials, {
  WalletPermissions,
} from "@/lib/authorization/credentials";
import controller from "@/middleware";
import { AuthenticatedSession, FlowContext } from "@/middleware/flow";
import validation from "@/validation";
import { Wallet } from "@prisma/client";
import { UnauthorizedError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";

type CreateWalletContext = FlowContext & {
  walletData: Partial<Wallet>;
};

const handleValidationPost: Middleware<CreateWalletContext> = async (
  req,
  _,
  next
) => {
  if (!req.context.session.user.canDo(credentials.wallet.CreateWallet)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para criar uma nova carteira.",
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

  req.context.walletData = walletObject;

  return next();
};

const handlePost: Middleware<
  CreateWalletContext & AuthenticatedSession
> = async (req) => {
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

controller.post(handleValidationPost, handlePost);
export const POST = controller.expose();
