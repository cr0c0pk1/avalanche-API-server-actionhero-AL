import { Action } from "actionhero";
import * as cChainMethods from './../modules/c-chain';

export class GetBlockByHash extends Action {
  constructor() {
    super();
    this.name = "GetBlockByHash";
    this.description = "I return information about Avalanche Block";
    this.outputExample = {};
    this.inputs = {
      hash: { required: true }
    };
  }

  async run({ params }) {
    const blockFromCChain = await cChainMethods.getBlockByHashFromCChain(params.hash);

    const returnData = blockFromCChain[1];

    return { returnData };
  }
}

