import styles from "../styles/minter.module.css";
import { useState } from "react";
import { useWallet } from "@meshsdk/react";
import {
  createTransaction,
  signTransaction,
  markUsedPass,
  markAsMinted,
} from "../backend";
import { useAppContext } from "../contexts";
import CountdownTimer from "./countdown";

export default function MintingForm({ props }) {
  const { wallet } = useWallet();
  const { availablePasses, setPasses } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [canMint, setCanMint] = useState(false);

  async function handlePublicMinting(e) {
    e.preventDefault();
    const inputValue = e.target[0].value;
    if (inputValue <= 0 || inputValue > props.max_mint_per_tx) {
      alert("invalid amount to mint !");
      return;
    } else {
      await mint(inputValue);
    }
  }

  async function handleWhitelistMinting(e) {
    e.preventDefault();
    const fingerprint = e.target[0].value;
    const inputValue = e.target[1].value;
    if (inputValue <= 0 || inputValue > props.wl_limit || !fingerprint) {
      alert(
        `invalid amount to mint ! or invalid pass and available per pass is ${props.wl_limit}`
      );
      return;
    } else {
      await wlMint(inputValue, fingerprint);
    }
  }

  async function wlMint(amount, fingerprint) {
    setLoading(true);
    const recipientAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();

    try {
      const { oid, maskedTx, tokenIds } = await createTransaction(
        recipientAddress,
        utxos,
        amount
      );

      const signedTx = await wallet.signTx(maskedTx, true);

      const { appWalletSignedTx } = await signTransaction(oid, signedTx);

      const txHash = await wallet.submitTx(appWalletSignedTx);
      if (txHash) {
        //marked pass as redeemed
        const { marked } = await markUsedPass(fingerprint, recipientAddress);
        //marked token as minted
        const { minted } = await markAsMinted(
          tokenIds,
          txHash,
          recipientAddress
        );
        const newAvailablePasses = availablePasses.filter(
          (pass) => pass.fingerprint != fingerprint
        );

        setPasses(newAvailablePasses);
        if (marked && minted) setLoading(false);
        alert(txHash);
      }
    } catch (e) {
      setLoading(false);
      console.log(e.message);
      alert("error : something went wrong!");
    }
  }

  async function mint(amount) {
    setLoading(true);
    const recipientAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();

    try {
      const { oid, maskedTx, tokenIds } = await createTransaction(
        recipientAddress,
        utxos,
        amount
      );

      const signedTx = await wallet.signTx(maskedTx, true);

      const { appWalletSignedTx } = await signTransaction(oid, signedTx);

      const txHash = await wallet.submitTx(appWalletSignedTx);
      if (txHash) {
        const { minted } = await markAsMinted(
          tokenIds,
          txHash,
          recipientAddress
        );
        if (minted) setLoading(false);
        alert(txHash);
      }
    } catch (e) {
      setLoading(false);
      console.log(e.message);
      alert("error : something went wrong!");
    }
  }

  return (
    <div>
      {!canMint ? (
        <CountdownTimer
          endtimeMs={props.start_timestamp}
          setCanSettle={setCanMint}
        />
      ) : (
        <div className={`${styles.container}`}>
          {loading ? (
            <MintingLoading />
          ) : (
            <>
              {props.presale && canMint ? (
                <WlMintingForm
                  handleMinting={handleWhitelistMinting}
                  availablePasses={availablePasses}
                />
              ) : (
                <PublicMintingForm handleMinting={handlePublicMinting} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function WlMintingForm({ availablePasses, handleMinting }) {
  return (
    <form
      className={`${styles.form} nes-container is-rounded`}
      onSubmit={(e) => handleMinting(e)}
    >
      <label for="default_select">WL - Mint</label>
      {!availablePasses ? (
        <div>loading..</div>
      ) : (
        <div class="nes-select">
          <select required id="default_select">
            <option value="" disabled selected hidden>
              Select...
            </option>
            {availablePasses.map((pass) => (
              <option key={pass.assetName} value={pass.fingerprint}>
                {pass.assetName}
              </option>
            ))}
          </select>
        </div>
      )}
      <input
        id="toMint"
        className={`nes-input`}
        placeholder="amount to mint"
        type="number"
      ></input>
      <button className={`nes-btn is-primary`}>Mint</button>
    </form>
  );
}

function PublicMintingForm({ handleMinting }) {
  return (
    <form
      className={`${styles.form} nes-container is-rounded`}
      onSubmit={(e) => handleMinting(e)}
    >
      <label htmlFor="toMint">Mint</label>
      <input
        id="toMint"
        className={`nes-input`}
        placeholder="amount to mint"
        type="number"
      ></input>
      <button className={`nes-btn is-primary`}>Mint</button>
    </form>
  );
}

function MintingLoading() {
  return (
    <div style={{ padding: "50px" }} className="nes-balloon from-left">
      <h1>Minting...</h1>
    </div>
  );
}
