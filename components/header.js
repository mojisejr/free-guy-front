import Connectwallet from "./connectwallet";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img src="logo.png" width="" className={styles.logo}></img>
      </div>
      <div className={styles.connectwallet}>
        <Connectwallet />
      </div>
    </div>
  );
}
