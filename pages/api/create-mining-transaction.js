import {
  AppWallet,
  Transaction,
  KoiosProvider,
  largestFirst,
  resolvePaymentKeyHash,
} from "@meshsdk/core";

// import plutus from "../../scripts/free_guy_freemint.json";
import { createNewMetadata, getAllUnmintedTokens } from "./get-token-meta";
import { getToBeMintedToken } from "./utils/ipfs.helper";

export default async function handler(req, res) {
  const recipientAddress = req.body.recipientAddress;
  const utxos = req.body.utxos;
  const recipientKeyHash = resolvePaymentKeyHash(recipientAddress);

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

  const script = {
    // code: plutus.cborHex,
    code: "88",
    version: "V2",
  };

  const tokens = await getAllUnmintedTokens();
  const { asset, tokenId } = await getToBeMintedToken(tokens, recipientAddress);

  const redeemer = {
    tag: "MINT",
    data: {
      alternative: 0,
      fields: [tokenId, { alternative: 0, fields: [recipientKeyHash] }],
    },
  };

  const appWalletAddress = appWallet.getPaymentAddress();
  const tx = new Transaction({ initiator: appWallet });
  //50ADA
  const cost = "50000000";
  const selectdUtxo = largestFirst(cost, utxos, true);

  tx.setTxInputs(selectdUtxo);
  tx.sendLovelace(process.env.BANKADDRESS, cost);
  tx.mintAsset(script, asset, redeemer);
  tx.setChangeAddress(recipientAddress);
  tx.setCollateral(selectdUtxo);
  tx.setRequiredSigners([recipientAddress, appWalletAddress]);

  const unsignedTx = await tx.build();
  const originalMetadata = Transaction.readMetadata(unsignedTx);
  const maskedTx = Transaction.maskMetadata(unsignedTx);

  const result = await createNewMetadata(
    tokenId,
    recipientAddress,
    originalMetadata,
    maskedTx
  );

  res.status(200).json({ maskedTx, originalMetadata });
}
