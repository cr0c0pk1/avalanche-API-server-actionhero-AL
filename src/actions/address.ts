import { Action } from "actionhero";

import * as cChainMethods from "./../modules/c-chain";
import * as pChainMethods from "./../modules/p-chain";
import * as xChainMethods from "./../modules/x-chain";

const X_CHAIN = "X";
const P_CHAIN = "P";
const C_CHAIN = "0x";

export class GetAddressInfoByHash extends Action {
  constructor() {
    super();
    this.name = "GetAddressInfoByHash";
    this.description = "I return information about Avalanche Address";
    this.outputExample = {};
    this.inputs = {
      hash: { required: true },
    };
  }

  async run({ params }) {
    let addressInfoFromXChain;
    let addressInfoFromCChain;
    let addressInfoFromPChain;
    let returnData;

    if (params.hash.charAt(0) == X_CHAIN) {
      addressInfoFromXChain =
        await xChainMethods.getAddressInfoByHashFromXChain(params.hash);

      if (addressInfoFromXChain[0] == 1) {
        returnData = addressInfoFromXChain[1];

        return { returnData };
      } else {
        returnData = addressInfoFromXChain;

        return { returnData };
      }
    } else if (params.hash.charAt(0) == P_CHAIN) {
      addressInfoFromPChain = await pChainMethods.getAddressInfoFromPChain(
        params.hash
      );

      if (addressInfoFromPChain[0] == 1) {
        returnData = addressInfoFromPChain[1];

        return { returnData };
      } else {
        returnData = addressInfoFromPChain[1];

        return { returnData };
      }
    } else if (params.hash.slice(0, 2) == C_CHAIN) {
      addressInfoFromCChain = await cChainMethods.getAddressInfoFromCChain(
        params.hash
      );

      if (addressInfoFromCChain[0] == 1) {
        returnData = addressInfoFromCChain[1];

        return { returnData };
      } else {
        returnData = addressInfoFromCChain;

        return { returnData };
      }
    } else {
      return { result: "wrong input" };
    }
  }
}
