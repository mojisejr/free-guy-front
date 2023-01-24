import Title from "./title";
import { motion } from "framer-motion";
import { fBanner } from "../framer/banner.framer";

const { animate, initial, transition } = fBanner;

export default function Body() {
  return (
    <div>
      <Banner />
      <Title />
      <Banner />
    </div>
  );
}

function Banner() {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      style={{ position: "relative", zIndex: -1 }}
    >
      <img
        style={{ marginTop: "5px", marginBottom: "10px" }}
        src="freeguybanner.png"
        width="100%"
      ></img>
    </motion.div>
  );
}
