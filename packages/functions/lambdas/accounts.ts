import { APIGatewayProxyHandler } from "aws-lambda";
import { handleRequest } from "./util";
import db from "../../db/db";

export const create: APIGatewayProxyHandler = handleRequest(async (event) => {
  const { id, name, type } = JSON.parse(event.body!);

  const result = await db
    .insertInto("accounts")
    .values({ id, name, type, balance: 0 })
    .returningAll()
    .executeTakeFirst();

  return {
    responseBody: result,
  };
});

export const get: APIGatewayProxyHandler = handleRequest(async () => {
  const accounts = await db.selectFrom("accounts").selectAll().execute();
  return {
    responseBody: accounts,
  };
});
