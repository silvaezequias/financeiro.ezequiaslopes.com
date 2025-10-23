import credentials from "@/lib/authorization/credentials";
import { controller } from "@/middleware";
import { AuthenticatedSession, FlowContext } from "@/middleware/flow";
import validation from "@/validation";
import { Transaction } from "@prisma/client";
import { UnauthorizedError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";
import { database } from "@/lib/database";

type CreateTransactionContext = FlowContext & {
  transactionData: Partial<Transaction>;
};

type FlowParams = {
  walletId: string;
};

const handlePostValidation: Middleware<
  CreateTransactionContext,
  FlowParams
> = async (req, params, next) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.transaction.CreateTransaction)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para criar uma nova transação.",
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
    { ...props, walletId: params.walletId }
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

const handleGetValidation: Middleware<
  CreateTransactionContext,
  FlowParams
> = async (req, _, next) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.wallet.CreateWallet)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para acessar essa transação.",
    });
  }

  return next();
};

const handleGet: Middleware<
  CreateTransactionContext & AuthenticatedSession,
  FlowParams
> = async (req, params) => {
  const transactions = await database.transaction.findMany({
    where: { walletId: params.walletId },
    orderBy: { billingDate: "desc" },
    take: 50,
    skip: 0,
  });

  return Response.json({ transactions });
};

controller
  .get(handleGetValidation, handleGet)
  .post(handlePostValidation, handlePost);
export const POST = controller.expose();
export const GET = controller.expose();
