import credentials from "@/lib/authorization/credentials";
import controller from "@/middleware";
import { FlowContext } from "@/middleware/flow";
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

const handlePost: Middleware<CreateWalletContext> = async (req) => {
  const { walletData } = req.context;

  const createdWallet = await database?.wallet.create({
    data: { ...walletData, name: walletData.name! },
  });

  return Response.json({ createdWallet }, { status: 201 });
};

controller.post(handleValidationPost, handlePost);
export const POST = controller.expose();
