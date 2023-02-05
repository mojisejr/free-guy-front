import { KoiosProvider, AppWallet } from "@meshsdk/core";

export function getAppWallet() {
  const blockchainProvider = new KoiosProvider("preprod");

  const appWallet = new AppWallet({
    networkId: 0,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: "cli",
      payment: process.env.APPKEY,
    },
  });

  return appWallet;
}
