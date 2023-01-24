import { AppWallet, Transaction, KoiosProvider } from "@meshsdk/core";
import { getMetadataOf } from "./get-token-meta";

export default async function handler(req, res) {
  const tokenId = req.body.tokenId;
  const signedTx = req.body.signedTx;

  const blockchainProvider = new KoiosProvider("api");

  const appWallet = new AppWallet({
    networkId: 1,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: "cli",
      payment: process.env.APPKEY,
    },
  });

  const metadata = await getMetadataOf(tokenId);

  const signedOriginalTx = Transaction.writeMetadata(
    signedTx,
    metadata.og_meta,
    "SHELLEY"
  );

  const appWalletSignedTx = await appWallet.signTx(signedOriginalTx, true);

  res.status(200).json({ appWalletSignedTx });
}
