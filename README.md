# Ledger Hackathon Project

## Overview

This project introduces a centralized double-entry immutable ledger system as a microservice. Developed during a hackathon, this project aims to provide an accurate and transparent financial transaction recording system.

## Features

- **Double-Entry Bookkeeping**: Ensures every financial transaction is recorded with corresponding credit and debit entries.
- **Immutable Transactions**: Guarantees data integrity and traceability.
- **API-Driven**: Facilitates seamless integration with existing services through robust APIs.
- **Real-Time Validation**: Provides real-time balance validation and error detection.

## Project Structure

- **UI**: A React-based dashboard to visualize accounts, transactions, and ledger validation status.
- **API**: A set of API endpoints for creating and retrieving transactions, accounts, and entries.
- **Database**: Uses PostgreSQL for storing accounts, transactions, and entries with double-entry principles.

## Key Components

### Dashboard

- Visualizes accounts, transactions, and ledger validation status.
- Allows users to filter transactions by account.
- Displays the overall balance status of the ledger.

### API Endpoints

- **GET /accounts**: Retrieves all accounts.
- **GET /transactions**: Retrieves all transactions.
- **GET /entries**: Retrieves all ledger entries.
- **POST /accounts/create**: Creates a new account.
- **POST /transactions/create**: Creates a new transaction with corresponding ledger entries.
- **POST /getBalance**: Retrieves the balance of a specific account.
- **GET /validateLedger**: Validates the overall balance of the ledger.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/ledger-microservice.git
   cd ledger-microservice
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DATABASE_URL=your_database_url
   DATABASE_NAME=ledgerdb
   CLUSTER_ARN=your_cluster_arn
   SECRET_ARN=your_secret_arn
   ```

4. **Run Migrations**

   ```bash
   npm run migrate
   ```

5. **Start the Application**

   ```bash
   npm start
   ```

## Usage

### UI

Access the dashboard at `http://localhost:3000` to visualize accounts, transactions, and the ledger validation status. Use the refresh button to fetch the latest data.

### API

Interact with the API endpoints using tools like `curl`, `Postman`, or any HTTP client.

Example of creating a transaction:

```bash
curl -X POST http://localhost:3000/transactions/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10000,
    "sourceAccountId": 1,
    "destinationAccountId": 2,
    "date": "2024-01-01T12:00:00Z",
    "description": "Service Payment"
  }'
```

## Validation

Run the following command to validate the overall balance of the ledger:

```bash
curl http://localhost:3000/validateLedger
```

## Future Enhancements

- **Enhanced UI/UX**: Improve the dashboard with detailed reporting and analytics tools.
- **Comprehensive Testing**: Conduct thorough testing including edge cases and performance testing.
- **Additional Features**: Implement automated reconciliation, discrepancy alerts, and integration with external accounting tools.
- **Pilot Program**: Gather feedback from users and make necessary adjustments before full-scale launch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This project was developed as a 2-day hackathon project to demonstrate the potential of a centralized double-entry immutable ledger system as a microservice.
