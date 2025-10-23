import credentials from "@/lib/authorization/credentials";
import { AuthenticatedContext } from "@/middleware/flow";
import validation from "@/validation";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "nextfastapi/errors";
import { Middleware } from "nextfastapi/types";
import { database } from "@/lib/database";
import { WalletSummary } from "@prisma/client";

type SummaryContext = AuthenticatedContext & {
  walletId: string;
  year: number;
  toYear?: number;
};

type SummaryParams = {
  walletId: string;
  year: string;
};

export const handleGetValidation: Middleware<
  SummaryContext,
  SummaryParams
> = async (req, params, next) => {
  const user = req.context.session.user;

  if (!user.canDo(credentials.walletSummary.ReadWalletSummary)) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para acessar esse sumário.",
    });
  }

  const { searchParams } = new URL(req.url);

  const MAX_YEAR_RANGE = 20;

  const {
    id: walletId,
    year,
    toYear,
  } = validation.walletSummary(
    { walletId: true, year: true, toYear: false },
    {
      walletId: params.walletId,
      toYear: Number(searchParams.get("to")),
      year: Number(params.year),
    }
  );

  if (toYear) {
    if (toYear < year!) {
      throw new BadRequestError({
        message: "Range de anos não pode ser negativo.",
      });
    }

    if (toYear - year! > MAX_YEAR_RANGE) {
      throw new BadRequestError({
        message: `Range de anos não pode exceder ${MAX_YEAR_RANGE}.`,
      });
    }
  }

  req.context.walletId = walletId!;
  req.context.year = year!;
  req.context.toYear = toYear;

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

  const year = req.context.year;
  const toYear = req.context.toYear || year;

  // const startOfYear = dayjs(`${year}-0-01`).startOf("year").toDate();
  // const endOfYear = dayjs(`${toYear}-11-01`).endOf("year").toDate();

  const summary = await database.walletSummary.findMany({
    where: {
      walletId: req.context.walletId,
      year: {
        gte: year,
        lte: toYear,
      },
    },
  });

  for (let i = 0; i < toYear - year + 1; i++) {
    const currentSummary = summary.find((s) => {
      return s.year === year + i;
    });

    if (!currentSummary) {
      const lastBalance =
        summary.find((s) => s.year === year + i - 1)?.balance || 0;

      summary.push({
        year: year + i,
        balance: lastBalance,
        income: 0,
        expense: 0,
        isPlaceholder: true,
      } as WalletSummary & {
        isPlaceholder: boolean;
      });
    }
  }

  // for (let i = 0; i < toYear - year + 1; i++) {
  //   for (let j = 0; j < 11; j++) {
  //     const currentSummary = summary.find((s) => {
  //       return s.year === year + i && s.month === j;
  //     });

  //     if (!currentSummary) {
  //       summary.push({
  //         balance: 0,
  //         expense: 0,
  //         income: 0,
  //         month: j,
  //         year: year + i,
  //         updatedAt: new Date(),
  //       } as WalletSummary);
  //     }
  //   }
  // }

  const output = summary
    .map((yearSummary) =>
      validation.walletSummary(
        {
          balance: true,
          expense: true,
          income: true,
          updatedAt: false,
          year: true,
          isPlaceholder: false,
        },
        yearSummary
      )
    )
    .sort((a, b) => a.year! - b.year!)
    .map((yearSummary) => {
      return {
        ...yearSummary,
        updatedAt: yearSummary.updatedAt || null,
        isPlaceholder: !!(yearSummary as any).isPlaceholder,
      };
    });

  return Response.json(output);
};
