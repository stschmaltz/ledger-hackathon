import { APIGatewayProxyHandler } from "aws-lambda";
import { handleRequest } from "./util";
import db from "../../db/db";

export const handler: APIGatewayProxyHandler = handleRequest(async () => {
  // Fetch all entries
  const entries = await db
    .selectFrom("entries")
    .select(["transaction_id", "entry_type", "amount"])
    .execute();

  // Calculate total debits and credits for each transaction
  const transactionBalances = entries.reduce((acc, entry) => {
    const { transaction_id, entry_type, amount } = entry;
    if (!acc[transaction_id]) {
      acc[transaction_id] = { debit: 0, credit: 0 };
    }
    if (entry_type === "debit") {
      acc[transaction_id].debit += Number(amount);
    } else if (entry_type === "credit") {
      acc[transaction_id].credit += Number(amount);
    }
    return acc;
  }, {} as Record<number, { debit: number; credit: number }>);

  // Calculate total debits and credits
  let totalDebit = 0;
  let totalCredit = 0;
  for (const balance of Object.values(transactionBalances)) {
    totalDebit += balance.debit;
    totalCredit += balance.credit;
  }

  // Check if all transactions are balanced
  const unbalancedTransactions = Object.entries(transactionBalances).filter(
    ([, balance]) => balance.debit !== balance.credit
  );

  return {
    responseBody: {
      isBalanced: unbalancedTransactions.length === 0,
      unbalancedTransactions,
      totalDebit,
      totalCredit,
    },
  };
});
