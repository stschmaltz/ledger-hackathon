import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";

interface Database {
  accounts: {
    id?: number;
    name: string;
    type: string;
    balance: number;
  };
  transactions: {
    id?: number;
    date: Date;
    description: string;
  };
  entries: {
    id?: number;
    transaction_id: number;
    account_id: number;
    entry_type: "credit" | "debit";
    amount: number;
  };
}

const db = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      database: RDS.Cluster.defaultDatabaseName,
      secretArn: RDS.Cluster.secretArn,
      resourceArn: RDS.Cluster.clusterArn,
      client: new RDSData({}),
    },
  }),
});
export default db;
