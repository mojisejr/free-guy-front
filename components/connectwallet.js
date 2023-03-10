"use client";
import { useLovelace, useWallet, useWalletList } from "@meshsdk/react";
import { useAppContext } from "../contexts";
import { useEffect, useState } from "react";
import styles from "../styles/connectwallet.module.css";

export default function Connectwallet() {
  const wallets = useWalletList();
  const { connected, connect, disconnect, wallet } = useWallet();
  const { setAvailablePasses } = useAppContext();
  const lovelace = useLovelace();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (connected) {
      getAvailablePass();
    }
  }, [connected]);

  function parseLovelace() {
    const parsed = parseInt(lovelace == undefined ? 0 : lovelace) / 1000000;
    return parsed.toFixed(2);
  }

  async function getAvailablePass() {
    const assets = await wallet.getAssets();
    const filtered = assets.filter(
      (asset) => asset.policyId == process.env.NEXT_PUBLIC_PassPolicyId
    );
    console.log(filtered);
    setAvailablePasses(filtered);
  }

  async function connectWallet(walletName) {
    if (!connected) {
      await connect(walletName);
    } else {
      disconnect();
    }
  }

  return (
    <div>
      <div
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        {!connected ? (
          <div className={`nes-btn is-success ${styles.nesBtn}`}>
            Connect Wallet
          </div>
        ) : (
          <div className={styles.adaWrapper}>
            <span className={styles.ada}> ₳ {parseLovelace()}</span>
          </div>
        )}
        {showMenu ? (
          <div className={styles.menuWrapper}>
            {!connected ? (
              wallets.map((w, i) => {
                return (
                  <button
                    className={`nes-btn is-primary`}
                    key={i}
                    onClick={() => connectWallet(w.name)}
                  >
                    {w.name}
                  </button>
                );
              })
            ) : (
              <button
                className={`nes-btn is-warning`}
                onClick={() => connectWallet("")}
              >
                disconnect
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
