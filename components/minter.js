import styles from "../styles/minter.module.css";
import { useWallet } from "@meshsdk/react";
import { createTransaction, signTransaction } from "../backend";

export default function MintingForm() {
  const { wallet } = useWallet();
  async function handleMinting(e) {
    e.preventDefault();
    const inputValue = e.target[0].value;
    if (inputValue <= 0) {
      alert("invalid amount to mint !");
      return;
    } else {
      await mint(inputValue);
    }
  }

  async function mint(amount) {
    const recipientAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();

    try {
      const { tokenId, maskedTx } = await createTransaction(
        recipientAddress,
        utxos
      );

      const signedTx = await wallet.signTx(maskedTx, true);

      const { appWalletSignedTx } = await signTransaction(tokenId, signedTx);

      const txHash = await wallet.submitTx(appWalletSignedTx);

      alert(txHash);
    } catch (e) {
      alert("error : something went wrong!");
    }
  }

  return (
    <div>
      <div className={`${styles.container}`}>
        <form className={`${styles.form}`} onSubmit={(e) => handleMinting(e)}>
          <input
            id="toMint"
            className={`nes-input`}
            placeholder="amount to mint"
            type="number"
          ></input>
          <button className={`nes-btn is-primary`}>Mint</button>
        </form>
      </div>
    </div>
  );
}
