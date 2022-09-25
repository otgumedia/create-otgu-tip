import { NearBindgen, near, call, view, initialize } from "near-sdk-js";

@NearBindgen({})
export default class Tip {
  tipReceiver: string = "n8thegr8.testnet";
  tippers: string[] = [];
  totalTips: number = 0;

  @initialize({})
  init({ receiver }: { receiver: string }): void {
    this.tipReceiver = receiver;
  }

  @view({})
  get_tippers(): string[] {
    return this.tippers;
  }

  @view({})
  get_total_tips(): number {
    return this.totalTips / 1000000000000000000000000;
  }

  @call({ payableFunction: true })
  send_tip(): void {
    const sender = near.predecessorAccountId();
    const amount = near.attachedDeposit();

    near.log(`Thank you for tipping ${amount} Near ${sender}!`);

    const promise = near.promiseBatchCreate(this.tipReceiver);
    near.promiseBatchActionTransfer(promise, amount);

    if (!this.tippers.includes(near.predecessorAccountId())) {
      this.tippers.push(near.predecessorAccountId());
    }
    this.totalTips += Number(amount);
  }

  @call({ privateFunction: true })
  change_tip_receiver({ receiver }: { receiver: string }): void {
    this.tipReceiver = receiver;
  }
}
