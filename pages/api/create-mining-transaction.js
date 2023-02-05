import {
  Transaction,
  largestFirst,
  resolvePaymentKeyHash,
} from "@meshsdk/core";

import { createNewMetadata, getAllUnmintedTokens } from "./get-token-meta";
import { getToBeMintedToken } from "./utils/ipfs-helper";
import { buildMultiMintTx } from "./utils/multi-mint-builder";
import { buildRedeemer } from "./utils/redeemer-builder";
import { getAppWallet } from "./utils/app-wallet";

export default async function handler(req, res) {
  const recipientAddress = req.body.recipientAddress;
  const utxos = req.body.utxos;
  const amount = req.body.amount;

  const recipientKeyHash = resolvePaymentKeyHash(recipientAddress);
  const price = 1000000;
  const totalPrice = (price * amount).toString();
  const appWallet = getAppWallet();
  const appWalletAddress = appWallet.getPaymentAddress();
  const selectdUtxo = largestFirst(totalPrice, utxos, true);

  const tokens = await getAllUnmintedTokens();
  const [assets, tokenIds] = await getToBeMintedToken(
    tokens,
    recipientAddress,
    amount
  );

  const tx = new Transaction({ initiator: appWallet });
  const redeemer = buildRedeemer(tokenIds, totalPrice, recipientKeyHash);

  tx.setTxInputs(selectdUtxo);
  buildMultiMintTx(assets, tx, redeemer);
  tx.sendLovelace(process.env.BANKADDRESS, totalPrice);
  tx.setChangeAddress(recipientAddress);
  tx.setCollateral(selectdUtxo);
  tx.setRequiredSigners([recipientAddress, appWalletAddress]);

  const unsignedTx = await tx.build();
  const originalMetadata = Transaction.readMetadata(unsignedTx);
  const maskedTx = Transaction.maskMetadata(unsignedTx);

  const { insertedId } = await createNewMetadata(
    tokenIds,
    recipientAddress,
    originalMetadata,
    maskedTx
  ).catch((e) => {
    console.log("createNewMetadata : error cannot create new metadata");
    return;
  });

  res.status(200).json({
    oid: insertedId["$oid"],
    maskedTx,
    tokenIds,
  });
}
