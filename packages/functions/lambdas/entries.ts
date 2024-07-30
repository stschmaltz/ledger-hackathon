import { APIGatewayProxyHandler } from "aws-lambda";
import { handleRequest, sendResponse } from "./util";
import db from "../../db/db";

export const get: APIGatewayProxyHandler = handleRequest(async () => {
  const entries = await db.selectFrom("entries").selectAll().execute();
  return {
    responseBody: entries,
  };
});
