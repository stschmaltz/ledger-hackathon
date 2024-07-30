import { APIGatewayProxyHandler } from "aws-lambda";

export const sendResponse = (statusCode: number, body: any) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export const handleRequest =
  (
    handler: (event: any) => Promise<{ responseBody: any | undefined }>
  ): APIGatewayProxyHandler =>
  async (event) => {
    try {
      const result = await handler(event);
      return sendResponse(200, result.responseBody);
    } catch (error) {
      console.error("Error occurred:", error);
      return sendResponse(500, { error: (error as Error).message });
    }
  };
