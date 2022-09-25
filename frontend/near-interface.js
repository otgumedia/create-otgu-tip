/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
import { utils } from "near-api-js";

export class Tip {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getTippers() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_tippers",
    });
  }

  async getTotalTips() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_total_tips",
    });
  }

  async sendTip(amount) {
    let deposit = utils.format.parseNearAmount(amount.toString());
    let response = await this.wallet.callMethod({
      contractId: this.contractId,
      method: "send_tip",
      deposit,
    });
    return response;
  }
}
