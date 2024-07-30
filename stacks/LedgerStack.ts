import { StackContext, Api, RDS } from "sst/constructs";

export function LedgerStack({ stack }: StackContext) {
  const cluster = new RDS(stack, "Cluster", {
    engine: "postgresql13.12",
    defaultDatabaseName: "ledgerdb",
    migrations: "packages/db/migrations",
    scaling: {
      autoPause: true,
      minCapacity: "ACU_2",
      maxCapacity: "ACU_2",
    },
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [cluster],
        environment: {
          DATABASE_URL: cluster.clusterEndpoint.socketAddress,
          DATABASE_NAME: cluster.defaultDatabaseName,
          CLUSTER_ARN: cluster.clusterArn,
          SECRET_ARN: cluster.secretArn,
        },
        timeout: 60 * 5, // 5 minutes
      },
    },
    routes: {
      "GET /accounts": "packages/functions/lambdas/accounts.get",
      "GET /transactions": "packages/functions/lambdas/transactions.get",
      "GET /entries": "packages/functions/lambdas/entries.get",
      "GET /validateLedger":
        "packages/functions/lambdas/validate-ledger.handler",

      "POST /accounts/create": "packages/functions/lambdas/accounts.create",
      "POST /transactions/create":
        "packages/functions/lambdas/transactions.create",
      "POST /clear-db": "packages/functions/lambdas/clear-db.handler",
      "POST /getBalance": "packages/functions/lambdas/balance.get",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SecretArn: cluster.secretArn,
    ClusterIdentifier: cluster.clusterIdentifier,
  });
}
