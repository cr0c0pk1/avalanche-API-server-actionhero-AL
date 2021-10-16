//import * as axios from 'axios';
import axios  from 'axios';
import * as dotenv from 'dotenv';
import * as web3 from 'web3-utils';

dotenv.config();

export async function getBlockByHashFromCChain(hash: string) {
    let result;

    await axios.post(process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBlockByHash',
        params: [`${hash}`, true]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }).then(response => {
        result = [0, response.data];
    }).catch(error => {
        if(!error.response) {
            console.log("connection refused to avalanche client");
            result = [1, JSON.parse('{"result":"connection refused to avalanche client"}')];
        } else {
            console.log(error.response.data);
            result = [1, error.response.data];
        }
    });
    
    return result;
}

export async function getBlockByNumberFromCChain(number: string) {
    let hexNumber;
    
    if (number == "latest") {
        hexNumber = number;
    } else {
        hexNumber = "0x" + parseInt(number).toString(16);
    }
    
    let result;

    await axios.post(process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBlockByNumber',
        params: [`${hexNumber}`, true]
    }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
    }).then(response => {
        result = [response.data, response.data.result.hash];
    }).catch(error => {
        if(!error.response) {
            result = [1, JSON.parse('{"result":"connection refused to avalanche client"}')];
        } else {
            console.log(error.response.data);
            result = [1, error.response.data];
        }
    });
    
    return result;
}

