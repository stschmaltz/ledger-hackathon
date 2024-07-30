#!/bin/bash

API_ENDPOINT="https://b2pqh6enwj.execute-api.us-west-2.amazonaws.com"

# Create accounts
echo "Creating accounts..."
accounts=(
  '{"id": 34, "name": "Shane'\''s Snacks Service", "type": "Business"}'
  '{"id": 1, "name": "Shania Twain", "type": "Client"}'
  '{"id": 2, "name": "Willie Nelson", "type": "Client"}'
  '{"id": 3, "name": "Dolly Parton", "type": "Client"}'
)

for account in "${accounts[@]}"; do
  curl -X POST "$API_ENDPOINT/accounts/create" \
  -H "Content-Type: application/json" \
  -d "$account"
  echo ""
done

# Create realistic transactions
echo "Creating transactions..."
transactions=(
  '{"transactionId": 1, "amount": 10000, "sourceAccountId": 1, "destinationAccountId": 34, "date": "2024-01-01T12:00:00Z", "description": "January snacks delivery"}'
  '{"transactionId": 2, "amount": 15000, "sourceAccountId": 2, "destinationAccountId": 34, "date": "2024-01-01T14:00:00Z", "description": "January catering service"}'
  '{"transactionId": 3, "amount": 20000, "sourceAccountId": 3, "destinationAccountId": 34, "date": "2024-01-15T16:00:00Z", "description": "January snacks and drinks"}'
  '{"transactionId": 4, "amount": 12000, "sourceAccountId": 1, "destinationAccountId": 34, "date": "2024-02-01T12:00:00Z", "description": "February snacks delivery"}'
  '{"transactionId": 5, "amount": 17500, "sourceAccountId": 2, "destinationAccountId": 34, "date": "2024-02-01T14:00:00Z", "description": "February catering service"}'
  '{"transactionId": 6, "amount": 22000, "sourceAccountId": 3, "destinationAccountId": 34, "date": "2024-02-15T16:00:00Z", "description": "February snacks and drinks"}'
  '{"transactionId": 7, "amount": 14000, "sourceAccountId": 1, "destinationAccountId": 34, "date": "2024-03-01T12:00:00Z", "description": "March snacks delivery"}'
  '{"transactionId": 8, "amount": 16000, "sourceAccountId": 2, "destinationAccountId": 34, "date": "2024-03-01T14:00:00Z", "description": "March catering service"}'
  '{"transactionId": 9, "amount": 21000, "sourceAccountId": 3, "destinationAccountId": 34, "date": "2024-03-15T16:00:00Z", "description": "March snacks and drinks"}'
  '{"transactionId": 10, "amount": 13000, "sourceAccountId": 1, "destinationAccountId": 34, "date": "2024-04-01T12:00:00Z", "description": "April snacks delivery"}'
  '{"transactionId": 11, "amount": 17000, "sourceAccountId": 2, "destinationAccountId": 34, "date": "2024-04-01T14:00:00Z", "description": "April catering service"}'
  '{"transactionId": 12, "amount": 23000, "sourceAccountId": 3, "destinationAccountId": 34, "date": "2024-04-15T16:00:00Z", "description": "April snacks and drinks"}'
  '{"transactionId": 13, "amount": 12500, "sourceAccountId": 1, "destinationAccountId": 34, "date": "2024-05-01T12:00:00Z", "description": "May snacks delivery"}'
  '{"transactionId": 14, "amount": 16500, "sourceAccountId": 2, "destinationAccountId": 34, "date": "2024-05-01T14:00:00Z", "description": "May catering service"}'
  '{"transactionId": 15, "amount": 21500, "sourceAccountId": 3, "destinationAccountId": 34, "date": "2024-05-15T16:00:00Z", "description": "May snacks and drinks"}'
  '{"transactionId": 16, "amount": 13500, "sourceAccountId": 1, "destinationAccountId": 34, "date": "2024-06-01T12:00:00Z", "description": "June snacks delivery"}'
  '{"transactionId": 17, "amount": 15500, "sourceAccountId": 2, "destinationAccountId": 34, "date": "2024-06-01T14:00:00Z", "description": "June catering service"}'
  '{"transactionId": 18, "amount": 22500, "sourceAccountId": 3, "destinationAccountId": 34, "date": "2024-06-15T16:00:00Z", "description": "June snacks and drinks"}'
  '{"transactionId": 19, "amount": 14500, "sourceAccountId": 1, "destinationAccountId": 34, "date": "2024-07-01T12:00:00Z", "description": "July snacks delivery"}'
  '{"transactionId": 20, "amount": 18500, "sourceAccountId": 2, "destinationAccountId": 34, "date": "2024-07-01T14:00:00Z", "description": "July catering service"}'
)

for transaction in "${transactions[@]}"; do
  curl -X POST "$API_ENDPOINT/transactions/create" \
  -H "Content-Type: application/json" \
  -d "$transaction"
  echo ""
done

echo "Bootstrap script completed."
