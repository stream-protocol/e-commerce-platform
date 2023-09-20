To retrieve transaction details from the Solana Explorer, you can use Solana's API. Here's a TypeScript code snippet that demonstrates how to fetch transaction details using the Solana RPC API:

```typescript
import axios from 'axios';

async function fetchTransactionDetails(transactionId: string) {
  try {
    // Replace this URL with the Solana RPC endpoint you want to use
    const solanaRpcUrl = 'https://api.mainnet-beta.solana.com';

    // Fetch transaction details
    const response = await axios.post(solanaRpcUrl, {
      jsonrpc: '2.0',
      id: 1,
      method: 'getTransaction',
      params: [transactionId, { encoding: 'jsonParsed' }],
    });

    // Check if the response contains transaction details
    if (response.data && response.data.result) {
      const transactionDetails = response.data.result;
      console.log('Transaction Details:', transactionDetails);
      return transactionDetails;
    } else {
      console.error('Transaction not found or error in response');
    }
  } catch (error) {
    console.error('Error fetching transaction details:', error.message);
  }
}

// Usage: Replace 'your_transaction_id' with the actual transaction ID
fetchTransactionDetails('your_transaction_id');
```

In this code:

1. Import the Axios library to make HTTP requests.

2. Define the `fetchTransactionDetails` function, which takes a Solana transaction ID as an argument.

3. Set the Solana RPC URL to the desired Solana network (mainnet-beta in this case).

4. Use Axios to send a POST request to the Solana RPC API's `getTransaction` method with the transaction ID and encoding options.

5. Check if the response contains transaction details, and if so, log them to the console.

6. Handle errors and log any encountered errors.

Replace `'your_transaction_id'` with the actual Solana transaction ID you want to fetch details for. When you run this code, it will make an API request to Solana's RPC endpoint and retrieve the transaction details.

Make sure you have Axios installed in your project (`npm install axios`) and adjust the Solana RPC URL if you're working on a different Solana network.
