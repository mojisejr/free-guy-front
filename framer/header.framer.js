export const fHead = {
  logo: {
    initial: {
      opacity: 0,
    },
    animate: {
      x: [null, 20, 0],
      opacity: 1,
    },
    transition: {
      delay: 0.5,
      ease: "easeOut",
      duration: 1,
    },
  },
  connectBtn: {
    initial: {
      opacity: 0,
    },
    animate: {
      x: [null, -20, 0],
      opacity: 1,
    },
    transition: {
      delay: 0.5,
      ease: "easeOut",
      duration: 1,
    },
    hover: {},
  },
};
