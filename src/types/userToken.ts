import { BigNumber } from "ethers";
import { Market } from "../const/market.const";

export type UserToken = {
  tokenName: string;
  tokenSymbol: string;
  holdAmount: BigNumber;
  totalAmount: BigNumber;
  market: Market;
  creatorName: string;
};
