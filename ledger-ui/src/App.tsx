import React, { useState, useEffect } from "react";
import {
  getAccounts,
  getTransactions,
  getEntries,
  getBalance,
  validateLedger,
} from "./api/api";
import { Account, Entry, Transaction } from "./api/types";
import styles from "./App.module.css";

interface EnrichedEntry extends Entry {
  accountName: string;
}

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [entries, setEntries] = useState<EnrichedEntry[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [isBalanced, setIsBalanced] = useState<boolean | null>(null);
  const [totalDebit, setTotalDebit] = useState<number | null>(null);
  const [totalCredit, setTotalCredit] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [selectedAccountId, transactions, entries]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        accountsResponse,
        transactionsResponse,
        entriesResponse,
        validationResponse,
      ] = await Promise.all([
        getAccounts(),
        getTransactions(),
        getEntries(),
        validateLedger(),
      ]);

      const accountsWithBalances = await Promise.all(
        accountsResponse.data.map(async (account: Account) => {
          const balanceResponse = await getBalance(account.id);
          return { ...account, balance: balanceResponse.data.balance };
        })
      );

      const accountMap = new Map<number, string>();
      accountsWithBalances.forEach((account) => {
        accountMap.set(account.id!, account.name);
      });

      const enrichedEntries = entriesResponse.data.map((entry: Entry) => {
        const accountName =
          accountMap.get(entry.account_id) || "Unknown Account";
        return {
          ...entry,
          accountName,
        };
      });

      setAccounts(accountsWithBalances);
      setTransactions(
        transactionsResponse.data.sort(
          (a: Transaction, b: Transaction) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
      setEntries(enrichedEntries.sort((a: Entry, b: Entry) => b.id - a.id));
      setIsBalanced(validationResponse.data.isBalanced);
      setTotalDebit(validationResponse.data.totalDebit);
      setTotalCredit(validationResponse.data.totalCredit);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    if (!selectedAccountId) {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) =>
        entries.some(
          (entry) =>
            entry.transaction_id === transaction.id &&
            entry.account_id === selectedAccountId
        )
      );
      setFilteredTransactions(filtered);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Ledger Visualized</h1>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.refreshButton}
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          <section className={styles.section}>
            <div className={styles.accountsAndValidation}>
              <div className={styles.validationStatus}>
                <h2>Ledger Validation</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Is Balanced:</strong>
                      </td>
                      <td
                        className={
                          isBalanced ? styles.balanced : styles.unbalanced
                        }
                      >
                        {isBalanced ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total Debit:</strong>
                      </td>
                      <td>{centsToDollarsFormatted(totalDebit ?? 0)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total Credit:</strong>
                      </td>
                      <td>{centsToDollarsFormatted(totalCredit ?? 0)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.accountsContainer}>
                <h2>Accounts</h2>
                <select
                  onChange={(e) => setSelectedAccountId(Number(e.target.value))}
                  value={selectedAccountId || ""}
                >
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account) => (
                      <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.name}</td>
                        <td>{account.type}</td>
                        <td>{centsToDollarsFormatted(account.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2>
              {!selectedAccountId && "All"} Transactions{" "}
              {!!selectedAccountId &&
                `for ${
                  accounts.find((account) => account.id === selectedAccountId)
                    ?.name
                }`}
            </h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className={styles.section}>
            <h2>Entries</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Transaction ID</th>
                  <th>Account</th>
                  <th>Entry Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.id}</td>
                    <td>{entry.transaction_id}</td>
                    <td>{entry.accountName}</td>
                    <td>{entry.entry_type}</td>
                    <td>{centsToDollarsFormatted(entry.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
};

const centsToDollarsFormatted = (cents: number) =>
  (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default Dashboard;
