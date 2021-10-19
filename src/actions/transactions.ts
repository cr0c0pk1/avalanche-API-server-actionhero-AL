import { Action } from "actionhero";

import * as cChainMethods from "./../modules/c-chain";
import * as pChainMethods from "./../modules/p-chain";
import * as xChainMethods from "./../modules/x-chain";

const X_CHAIN = "X";
const P_CHAIN = "P";
const C_CHAIN = "0x";

export class GetTransactionByHash extends Action {
  constructor() {
    super();
    this.name = "GetTransactionByHash";
    this.description = "I return information about Avalanche Transaction";
    this.outputExample = {};
    this.inputs = {
      hash: { required: true },
    };
  }

  async run({ params }) {
    let xChainTransaction;
    let cChainTransaction;
    let pChainTransaction;
    let returnData;

    xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(
      params.hash
    );
    cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(
      params.hash
    );
    pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(
      params.hash
    );

    if (
      xChainTransaction == 1 &&
      cChainTransaction[0] == 1 &&
      pChainTransaction == 1
    ) {
      return {
        result: "connection refused to avalanche client or api call rejected",
      };
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

export class GetXTransactionsAfterNthFromAddress extends Action {
  constructor() {
    super();
    this.name = "GetXTransactionsAfterNthFromAddress";
    this.description =
      "I return information about Avalanche transactions from address";
    this.outputExample = {};
    this.inputs = {
      address: { required: true },
      n: { required: true },
      x: { required: true },
    };
  }

  async run({ params }) {
    let xChainTransactions;
    let pChainTransactions;
    let cChainTransactions;
    let returnData;

    if (params.address.charAt(0) == X_CHAIN) {
      xChainTransactions =
        await xChainMethods.getXTransactionsAfterNthFromAddressFromXChain(
          params.address,
          params.n,
          params.x
        );

      if (xChainTransactions[0] == 1) {
        returnData = xChainTransactions[1];

        return { returnData };
      } else {
        returnData = xChainTransactions[1];

        return { returnData };
      }
    } else if (params.address.charAt(0) == P_CHAIN) {
      pChainTransactions =
        await pChainMethods.getXTransactionsAfterNthFromAddressFromPChain(
          params.address,
          params.n,
          params.x
        );

      if (pChainTransactions == 1) {
        return { result: "api call rejected or not enough transactions" };
      } else {
        returnData = pChainTransactions;

        return { returnData };
      }
    } else if (params.address.slice(0, 2) == C_CHAIN) {
      cChainTransactions =
        await cChainMethods.getXTransactionsAfterNthFromAddressFromCChain(
          params.address,
          params.n,
          params.x
        );

      if (cChainTransactions == 1) {
        return { result: "api call rejected or not enough transactions" };
      } else {
        returnData = cChainTransactions;

        return { returnData };
      }
    } else {
      return { result: "wrong chain" };
    }
  }
}

export class GetXPendingTransactionsAfterNth extends Action {
  constructor() {
    super();
    this.name = "GetXPendingTransactionsAfterNth";
    this.description =
      "I return information about Avalanche pending transactions";
    this.outputExample = {};
    this.inputs = {
      n: { required: true },
      x: { required: true },
    };
  }

  async run({ params }) {
    let cChainTransactions;
    let returnData;

    if (params.n > 0 && params.x > 0) {
      cChainTransactions =
        await cChainMethods.getXPendingTransactionsAfterNthFromCChain(
          params.n,
          params.x
        );

      if (cChainTransactions[0] == 1) {
        returnData = cChainTransactions[1];

        return { returnData };
      } else {
        returnData = cChainTransactions[1];

        return { returnData };
      }
    } else {
      return { result: "n and x < 0" };
    }
  }
}

export class GetRecentTransactionsFromXChain extends Action {
  constructor() {
    super();
    this.name = "GetRecentTransactionsFromXChain";
    this.description =
      "I return information about Avalanche recent transactions from X-chain";
    this.outputExample = {};
  }

  async run() {
    let xChainTransactions;
    let returnData;

    xChainTransactions = await xChainMethods.getRecentTransactions();

    returnData = xChainTransactions[1];

    return { returnData };
  }
}

export class GetRecentTransactionsFromPChain extends Action {
  constructor() {
    super();
    this.name = "GetRecentTransactionsFromPChain";
    this.description =
      "I return information about Avalanche recent transactions from P-chain";
    this.outputExample = {};
  }

  async run() {
    let pChainTransactions;
    let returnData;

    pChainTransactions = await pChainMethods.getRecentTransactions();

    returnData = pChainTransactions[1];

    return { returnData };
  }
}
