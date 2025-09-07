import credentials from "@/lib/authorization/credentials";
import { AuthenticatedContext } from "@/middleware/flow";
import validation from "@/validation";
import { NotFoundError, UnauthorizedError } from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";
import { database } from "@/lib/database";
import dayjs from "dayjs";

type SummaryContext = AuthenticatedContext & {
  walletId: string;
  year: number;
  month: number;
};

export const handleGetValidation: Middleware<SummaryContext> = async (
  req,
  params,
  next
) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.walletSummary.ReadWalletSummary)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para acessar esse sumário.",
    });
  }

  const { searchParams } = new URL(req.url);

  const {
    id: walletId,
    year,
    month,
  } = await validation.walletSummary(
    { id: true, year: false, month: false },
    {
      id: params.walletId,
      year: Number(searchParams.get("year")),
      month: Number(searchParams.get("month")),
    }
  );

  req.context.walletId = walletId!;
  req.context.year = year!;
  req.context.month = month!;

  return next();
};

export const handleGet: Middleware<SummaryContext> = async (req) => {
  const user = req.context.session.user!;

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

  const year = req.context.year || dayjs().year();
  const month = req.context.month || dayjs().month();

  const startOfMonth = dayjs(`${year}-${month}-01`).startOf("month").toDate();
  const endOfMonth = dayjs(`${year}-${month}-01`).endOf("month").toDate();

  let summary = await database.walletSummary.findFirst({
    where: { walletId: req.context.walletId, year, month },
  });

  if (!summary) {
    const transactions = await database.transaction.findMany({
      where: {
        walletId: req.context.walletId,
        billingDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0);

    summary = await database.walletSummary.create({
      data: {
        balance: income + expense,
        expense: expense,
        income: income,
        month: month,
        year: year,
        walletId: req.context.walletId,
      },
    });
  }

  const output = await validation.walletSummary(
    {
      balance: true,
      expense: true,
      income: true,
      month: true,
      updatedAt: true,
      year: true,
    },
    summary
  );

  return Response.json(output);
};
