import axios  from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export async function getTransactionByIdFromPChain(txId: string) {
    let response;

    try {
        response = await axios.get(`${process.env.ORTELIUS_API_ENDPOINT + `transactions/${txId}`}`);
    } catch (error) {
        return 1;
    }
    
    return response.data;
}