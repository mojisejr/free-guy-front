import style from "../styles/title.module.css";
import MintingForm from "../components/minter";
import { useWallet } from "@meshsdk/react";

export default function Title() {
  const { connected } = useWallet();
  return (
    <div>
      <div className={style.container}>
        <div className={style.imagecontainner}>
          <img src="main.png" width="100%" className={style.image}></img>
        </div>
        <MainDialogBox />
      </div>
      <MainDialogContent />
    </div>
  );
}

function MainDialogBox() {
  return (
    <div className={`${style.mainDialogContainer}`}>
      <div className={`nes-balloon from-left`}>
        <p>
          1,111 coolest unique pixel art profile pictures on Adaverse. NFT that
          are{" "}
          <span style={{ color: "orangered" }}>
            minted by smart contract !{" "}
          </span>{" "}
          Not just native minting script !
        </p>
      </div>
    </div>
  );
}

function MainDialogContent() {
  return (
    <div
      className={`${style.textcontainer} nes-container with-title is-centered`}
    >
      <p className="title">The Free Guy !</p>
      <p>
        Hi! This is our first time on Ada blockchain, and this is also our first
        prpject too! We are curious to know that how cool NFTs made by custom
        minting script are As mentioned earier, this is our first time, so we
        want to learn how we continue and develop this project on Ada! Let be a
        part of us, let be Free Guy!
      </p>
    </div>
  );
}

{
  /* <div
className={`${style.textcontainer} nes-container with-title is-centered`}
>
<p className="title">The Free Guy !</p>
<p>
  Hi! This is our first time on Ada blockchain, and this is also our
  first prpject too! We are curious to know that how cool NFTs made by
  custom minting script are As mentioned earier, this is our first time,
  so we want to learn how we continue and develop this project on Ada!
  Let be a part of us, let be Free Guy!
</p>
</div> */
}
