import Connectwallet from "./connectwallet";
import styles from "../styles/header.module.css";
import { motion } from "framer-motion";
import { fHead } from "../framer/header.framer";
import { useAppContext } from "../contexts";

const { logo, connectBtn } = fHead;

export default function Header({ props }) {
  const { info } = useAppContext();
  return (
    <motion.div className={styles.container}>
      <motion.div
        initial={logo.initial}
        animate={logo.animate}
        transition={logo.transition}
        className={styles.logoWrapper}
      >
        <img src="logo.png" className={styles.logo}></img>
      </motion.div>
      <motion.div
        initial={connectBtn.initial}
        animate={connectBtn.animate}
        transition={connectBtn.transition}
        whileHover={connectBtn.hover}
        className={styles.connectwallet}
      >
        {props.pause ? null : <Connectwallet />}
      </motion.div>
    </motion.div>
  );
}
