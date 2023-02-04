import { script } from "../utils/plutus-script";
export function buildMultiMintTx(assets = [], tx, redeemer) {
  if (assets.length <= 0) {
    console.log("error empty assets");
    return;
  }
  assets.forEach((asset) => {
    tx.mintAsset(script, asset, redeemer);
  });
}
