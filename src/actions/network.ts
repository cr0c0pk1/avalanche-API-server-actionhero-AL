import { Action } from "actionhero";

import * as network from './../modules/network';

export class GetNetWorkActivity extends Action {
  constructor() {
    super();
    this.name = "GetNetWorkActivity";
    this.description = "I return information about Avalanche Network";
    this.outputExample = {};
  }

  async run() {
    let returnData = await network.getNetWorkActivity();
    return { returnData };
  }
}
