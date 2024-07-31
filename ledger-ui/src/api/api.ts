import axios from "axios";

const API_BASE_URL = "https://b2pqh6enwj.execute-api.us-west-2.amazonaws.com";

export const getAccounts = () => axios.get(`${API_BASE_URL}/accounts`);
export const getTransactions = () => axios.get(`${API_BASE_URL}/transactions`);
export const getEntries = () => axios.get(`${API_BASE_URL}/entries`);
export const getBalance = (accountId: number) =>
  axios.post(`${API_BASE_URL}/getBalance`, { accountId });
export const validateLedger = () => axios.get(`${API_BASE_URL}/validateLedger`);
