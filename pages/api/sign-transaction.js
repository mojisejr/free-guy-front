import { Transaction } from "@meshsdk/core";
import { getMetadataOf, markAsCompleted } from "./get-token-meta";
import { getAppWallet } from "./utils/app-wallet";

export default async function handler(req, res) {
  const _oid = req.body._oid;
  const signedTx = req.body.signedTx;

  const appWallet = getAppWallet();

  const metadata = await getMetadataOf(_oid);

  const signedOriginalTx = Transaction.writeMetadata(
    signedTx,
    metadata.og_meta,
    //need it when make a multi-sig transaction
    "SHELLEY"
  );

  await markAsCompleted(_oid, signedTx);

  const appWalletSignedTx = await appWallet.signTx(signedOriginalTx, true);

  res.status(200).json({ appWalletSignedTx });
}
