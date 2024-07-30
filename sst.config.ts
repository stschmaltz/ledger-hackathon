import { SSTConfig } from "sst";
import { LedgerStack } from "./stacks/LedgerStack";

export default {
  config(_input) {
    return {
      name: "jobber-ledger",
      region: "us-west-2", // or your preferred region
    };
  },
  stacks(app) {
    app.stack(LedgerStack);
  },
} satisfies SSTConfig;
