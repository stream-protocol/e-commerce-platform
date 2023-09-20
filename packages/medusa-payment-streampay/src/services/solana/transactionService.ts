// Import necessary dependencies
import axios from 'axios';

// Define a service to fetch Solana transaction details
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

export default fetchTransactionDetails;
