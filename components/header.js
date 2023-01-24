import Connectwallet from "./connectwallet";
import styles from "../styles/header.module.css";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className={styles.container}>
      <motion.div
        animate={{ x: [null, 20, 0] }}
        transition={{ ease: "easeOut", duration: 1 }}
        className={styles.logoWrapper}
      >
        <img src="logo.png" width="" className={styles.logo}></img>
      </motion.div>
      <motion.div
        animate={{ x: [null, -20, 0] }}
        transition={{ ease: "easeOut", duration: 1 }}
        className={styles.connectwallet}
      >
        <Connectwallet />
      </motion.div>
    </div>
  );
}
