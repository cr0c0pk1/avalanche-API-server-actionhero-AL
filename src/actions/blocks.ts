import { Action } from "actionhero";
import * as cChainMethods from "./../modules/c-chain";

export class GetBlockByHash extends Action {
  constructor() {
    super();
    this.name = "GetBlockByHash";
    this.description = "I return information about Avalanche Block";
    this.outputExample = {};
    this.inputs = {
      hash: { required: true },
    };
  }

  async run({ params }) {
    const blockFromCChain = await cChainMethods.getBlockByHashFromCChain(
      params.hash
    );

    const returnData = blockFromCChain[1];

    return { returnData };
  }
}

export class GetBlockByNumber extends Action {
  constructor() {
    super();
    this.name = "GetBlockByNumber";
    this.description = "I return information about Avalanche Block";
    this.outputExample = {};
    this.inputs = {
      blocknumber: { required: true },
    };
  }

  async run({ params }) {
    const cChainNumber = await cChainMethods.getBlockByNumberFromCChain(
      params.blocknumber
    );

    let returnData;

    if (cChainNumber[0] == 1) {
      returnData = cChainNumber[1];

      return { returnData };
    } else {
      returnData = cChainNumber[0];

      return { returnData };
    }
  }
}

export class GetXBlocksFromNthFromCChain extends Action {
  constructor() {
    super();
    this.name = "GetXBlocksFromNthFromCChain";
    this.description = "I return information about Avalanche Block";
    this.outputExample = {};
    this.inputs = {
      blocknumber: { required: true },
      count: { required: true },
    };
  }

  async run({ params }) {
    const cChainArray = [];
    let returnData;
    let k = 0;

    const blockNumber = params.blocknumber;
    const count = params.count;

    for (let i = blockNumber - count; i < blockNumber; ++i) {
      let hashValue = await cChainMethods.getBlockByNumberFromCChain(
        i.toString()
      );

      if (hashValue[0] == 1) {
        returnData = hashValue[1];
        return { returnData };
      } else {
        cChainArray[k] = hashValue[1];
        k++;
      }
    }

    return { cChainArray };
  }
}
