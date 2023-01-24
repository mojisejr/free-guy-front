import styles from "../styles/footer.module.css";

const msgData = [
  {
    title: "how much supply",
    img: "mainCropped.png",
    msg: "1,111",
  },
  {
    title: "When !?",
    img: "mainCropped.png",
    msg: "on Feb xx, 2023",
  },
  {
    title: "Price",
    img: "mainCropped.png",
    msg: "50₳",
  },
  {
    title: "Policy Id",
    img: "mainCropped.png",
    msg: "0234dfgr1345Sl3kbd",
  },
];

export default function Footer() {
  return (
    <div className={styles.container}>
      <FooterTitle />
      <MsgLeft data={msgData[0]} showImg={true} />
      <MsgRight data={msgData[1]} showImg={true} />
      <MsgLeft data={msgData[2]} showImg={true} />
      <MsgRight data={msgData[3]} showImg={false} />
    </div>
  );
}

function FooterTitle() {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.msg1}>FREQUENTLY</div>
      <div className={styles.msg2}>ASKED</div>
      <div className={styles.msg3}>QUESTIONS</div>
    </div>
  );
}

function MsgRight({ data, showImg }) {
  const { title, img, msg } = data;
  return (
    <div className={styles.msgWrapper}>
      {showImg ? <img src={img} width={150}></img> : null}
      <div className={`nes-balloon from-left`} style={{ display: "flex" }}>
        <p>
          <span style={{ fontWeight: "bold" }}>{title} </span>
          <span style={{ color: "orangered" }}>{msg}</span>
        </p>
      </div>
    </div>
  );
}

function MsgLeft({ data, showImg }) {
  const { title, img, msg } = data;
  return (
    <div className={styles.msgWrapper}>
      <div className={`nes-balloon from-right`} style={{ display: "flex" }}>
        <p>
          <span style={{ fontWeight: "bold" }}>{title} </span>{" "}
          <span style={{ color: "orangered" }}>{msg}</span>
        </p>
      </div>
      {showImg ? (
        <img className={styles.flip} src={img} width={150}></img>
      ) : null}
    </div>
  );
}
