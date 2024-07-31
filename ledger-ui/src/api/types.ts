export interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
}

export interface Entry {
  id: number;
  transaction_id: number;
  account_id: number;
  entry_type: "debit" | "credit";
  amount: number;
}
