import credentials from "@/lib/authorization/credentials";
import controller from "@/middleware";
import { AuthenticatedSession, FlowContext } from "@/middleware/flow";
import validation from "@/validation";
import { Transaction } from "@prisma/client";
import { UnauthorizedError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";

type CreateTransactionContext = FlowContext & {
  transactionData: Partial<Transaction>;
};

const handlePostValidation: Middleware<CreateTransactionContext> = async (
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

  const transactionObject = await validation.transaction(
    {
      amount: true,
      category: true,
      description: true,
      walletId: true,
      creditCardId: false,
      billingDate: false,
    },
    props
  );

  req.context.transactionData = transactionObject;

  return next();
};

const handlePost: Middleware<
  CreateTransactionContext & AuthenticatedSession
> = (req) => {
  const { transactionData } = req.context;

  return Response.json(transactionData);
};

controller.post(handlePostValidation);
export const POST = controller.expose();
