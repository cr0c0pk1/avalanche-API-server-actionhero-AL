import { Action } from "actionhero";

import * as cChainMethods from './../modules/c-chain';
import * as pChainMethods from './../modules/p-chain';
import * as xChainMethods from './../modules/x-chain';

const X_CHAIN = 'X';
const P_CHAIN = 'P';
const C_CHAIN = '0x';


export class GetTransactionByHash extends Action {
  constructor() {
    super();
    this.name = "GetTransactionByHash";
    this.description = "I return information about Avalanche Transaction";
    this.outputExample = {};
    this.inputs = {
      hash: { required: true }
    };
  }

  async run({ params }) {
    let xChainTransaction;
    let cChainTransaction;
    let pChainTransaction;
    let returnData;

    xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(params.hash);
    cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(params.hash);
    pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(params.hash);

    if (xChainTransaction == 1 && cChainTransaction[0] == 1 && pChainTransaction == 1) {
      return { result: "connection refused to avalanche client or api call rejected" };
    } else if (xChainTransaction != 1) {
      returnData = xChainTransaction;

      return { returnData };
    } else if (cChainTransaction[0] != 1) {
      returnData = cChainTransaction[1];

      return { returnData };
    } else if (pChainTransaction != 1) {
      returnData = pChainTransaction;
      
      return { returnData };
    }
  }
}
