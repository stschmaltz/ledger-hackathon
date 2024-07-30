import { APIGatewayProxyHandler } from "aws-lambda";
import { handleRequest } from "./util";
import db from "../../db/db";

export const create: APIGatewayProxyHandler = handleRequest(async (event) => {
  const {
    amount,
    sourceAccountId,
    destinationAccountId,
    date,
    description,
    transactionId,
  } = JSON.parse(event.body!);

  console.log("creating new transaction", {
    amount,
    sourceAccountId,
    destinationAccountId,
    date,
    description,
    transactionId,
  });

  const transaction = await db
    .insertInto("transactions")
    .values({ id: transactionId, date: new Date(date), description })
    .returning("id")
    .executeTakeFirst();

  if (!transaction?.id) {
    throw new Error("Failed to create transaction");
  }

  console.log("creating debit entry for source account", {
    transactionId: transaction.id,
    account_id: sourceAccountId,
    entry_type: "debit",
    amount,
  });
  // Create debit entry for the source account
  await db
    .insertInto("entries")
    .values({
      transaction_id: transaction.id,
      account_id: sourceAccountId,
      entry_type: "debit",
      amount,
    })
    .execute();

  console.log("creating debit entry for destination account", {
    transactionId: transaction.id,
    account_id: destinationAccountId,
    entry_type: "credit",
  });

  // Create credit entry for the destination account
  await db
    .insertInto("entries")
    .values({
      transaction_id: transaction.id,
      account_id: destinationAccountId,
      entry_type: "credit",
      amount,
    })
    .execute();

  return {
    responseBody: { transactionId: transaction.id },
  };
});

export const get: APIGatewayProxyHandler = handleRequest(async () => {
  const transactions = await db
    .selectFrom("transactions")
    .selectAll()
    .execute();
  return {
    responseBody: transactions,
  };
});
