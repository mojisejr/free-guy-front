import axios from "axios";
import { CID } from "multiformats/cid";

export async function getToBeMintedToken(tokens = [], recipient, count = 1) {
  if (tokens.length <= 0) {
    console.log("getToBeMintedToken: error tokens is empty");
    return;
  }

  let assets = [];
  let tokenIds = [];
  for (let i = 0; i < count; i++) {
    let selected = false;
    let index = 0;
    while (!selected && tokenIds.length < count) {
      let rand =
        tokens.length <= 0
          ? 0
          : // : Math.floor((Math.random() * 998832) % tokens.length);
            Math.floor(Math.random() * 234321) % 20;
      if (tokenIds.length <= 0) {
        index = rand;
        selected = true;
      } else if (!tokenIds.includes(rand)) {
        index = rand;
        selected = true;
      } else if (tokenIds.length == count) {
        selected = true;
      }
    }

    const selectedToken = tokens[index];
    const parsedMetadataUrl = `https://nftstorage.link/ipfs/${
      selectedToken.ipfs.split("ipfs://")[1]
    }`;

    const { data } = await axios.get(parsedMetadataUrl);
    const v1 = CID.parse(data.image.split("ipfs://")[1].split("/")[0]);
    const v0 = v1.toV0().toString();
    const imageUrl = `ipfs://${v0}/${selectedToken.token_id}.png`;

    const asset = {
      assetName: `free-guy#${selectedToken.token_id}`,
      assetQuantity: "1",
      metadata: {
        ...data,
        description: "1,111 pixel art profile pictures on Cardano",
        dna: data.dna.slice(10),
        image: imageUrl,
      },
      label: "721",
      recipient: {
        address: recipient,
      },
    };
    //push to the array
    assets.push(asset);
    tokenIds.push(selectedToken.token_id);
  }

  console.log("seleted tokens: ", tokenIds);

  return [assets, tokenIds];
}
