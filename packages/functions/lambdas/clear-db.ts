import { APIGatewayProxyHandler } from "aws-lambda";
import { handleRequest, sendResponse } from "./util";
import db from "../../db/db";

export const handler: APIGatewayProxyHandler = handleRequest(async () => {
  await db.deleteFrom("entries").execute();
  await db.deleteFrom("transactions").execute();
  await db.deleteFrom("accounts").execute();

  return {
    responseBody: { message: "Tables cleared successfully" },
  };
});
