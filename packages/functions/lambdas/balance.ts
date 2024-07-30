import { APIGatewayProxyHandler } from "aws-lambda";
import { handleRequest } from "./util";
import db from "../../db/db";

export const get: APIGatewayProxyHandler = handleRequest(async (event) => {
  const { accountId } = JSON.parse(event.body!);

  const { totalCredits } = await db
    .selectFrom("entries")
    .select(db.fn.sum("amount").as("totalCredits"))
    .where("account_id", "=", accountId)
    .where("entry_type", "=", "credit")
    .executeTakeFirstOrThrow();

  const { totalDebits } = await db
    .selectFrom("entries")
    .select(db.fn.sum("amount").as("totalDebits"))
    .where("account_id", "=", accountId)
    .where("entry_type", "=", "debit")
    .executeTakeFirstOrThrow();

  const totalCreditsZeroed = numberOrZero(totalCredits);
  const totalDebitsZeroed = numberOrZero(totalDebits);

  // Calculate the balance
  const balance = totalCreditsZeroed - totalDebitsZeroed;

  return {
    responseBody: {
      accountId,
      balance,
      totalCredits: totalCreditsZeroed,
      totalDebits: totalDebitsZeroed,
    },
  };
});

const numberOrZero = (value: any | null) => (value as number) ?? 0;
